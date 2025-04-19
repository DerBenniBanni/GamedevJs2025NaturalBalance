import Bullet from "./bullets/bullet.js";
import Particle from "./particles/particle.js";
import Rectangle from "./rectangle.js";
import StackedSprite from "./renderer/stackedsprite.js";
import stackDefRabbit from "./spritestacks/rabbit.js";

export default class Player extends Rectangle {
    constructor(scene, {x, y, width, height, color}) {
        super(scene, {x, y, width, height});
        this.type = "player";
        this.color = color;
        
        this.renderer = new StackedSprite(stackDefRabbit);
        this.rotation = 0;
        this.rotSped = Math.PI /4 ; // Rotation speed

        this.hoppingSineTime = 0; // Time variable for sine wave
        this.hoppingAmplitude = 20; // Amplitude of the hopping motion
        this.hoppingSpeed = 12; // Speed of the hopping motion

        this.maxSpeed = 200; // Maximum speed of the player in pixels per second
        this.bulletSpeed = 800; // Speed of the bullets in pixels per second
        this.bulletInterval = 0.25; // Time interval between bullet shots in seconds
        this.bulletTimer = 0; // Timer for bullet shooting

        
        this.colliderType = "rectangle"; 
        this.terrainColliderWidth = 36;
        this.terrainColliderHeight = 18;

        this.grounded = false; // Flag to check if the player is grounded
        this.fallingOffset = 0; // Offset for falling animation
        this.fallingSpeed = 0; // Speed of falling animation
    }

    
    update(deltaTime) {
        super.update(deltaTime); // Call the parent class update method
        this.bulletTimer -= deltaTime; // Decrease the bullet timer

        this.grounded = false; // Initialize grounded to false
        this.scene.getObjectsByType('terrain').forEach((terrain) => {
            if(this.checkCollision(terrain)) {
                this.grounded = true; // Set grounded to true if colliding with terrain
            }
        });
        if(this.grounded) {
            this.fallingOffset = 0; // Reset falling offset if grounded
            this.fallingSpeed = 0; // Reset falling speed if grounded
        
            if(this.game.inputMode == 'keyboard') {
                // Calculate rotation to look at the mouse position
                this.lookAt(this.game.mousePos.x, this.game.mousePos.y);
            }
            if(this.game.inputMode == 'gamepad') {
                
                let dx = this.game.gamepad.axisValue('rightHorizontal');
                let dy = this.game.gamepad.axisValue('rightVertical');
                if(dx + dy != 0) { // Check if the right stick is moved
                    // Calculate rotation to look at the right stick position
                    this.lookAt(this.x + dx*100, this.y + dy*100);
                }
            }
            
            // Handle keyboard input for movement        
            let moving = false;
            if(this.game.actionActive('left')) {
                this.x -= this.maxSpeed * deltaTime; // Move left
                moving = true;
            }
            if(this.game.actionActive('right')) {
                this.x += this.maxSpeed * deltaTime; // Move right
                moving = true;
            }
            if(this.game.actionActive('up')) {
                this.y -= this.maxSpeed * deltaTime; // Move up
                moving = true;
            }
            if(this.game.actionActive('down')) {
                this.y += this.maxSpeed * deltaTime; // Move down
                moving = true;
            }
            if(!moving && this.game.inputMode == 'gamepad') {
                let dx = this.game.gamepad.axisValue('leftHorizontal');
                let dy = this.game.gamepad.axisValue('leftVertical');
                moving = Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1; // Check if the left stick is moved
                this.x += dx * this.maxSpeed * deltaTime; // Move left/right based on gamepad input
                this.y += dy * this.maxSpeed * deltaTime; // Move up/down based on gamepad input
            }

            if(this.bulletTimer <= 0 && this.game.actionActive('fire') ) {
                let bullet = this.scene.addObject(new Bullet(this.scene, {x: this.x, y: this.y-1, r:this.rotation}));
                bullet.speed = this.bulletSpeed;
                this.bulletTimer = this.bulletInterval; // Reset the bullet timer
            }
            if(!moving) {
                this.hoppingSineTime = 0; // Reset time if not moving
            } else {
                this.hoppingSineTime += deltaTime; // Increment time if moving
            }
        } else {
            this.sortY=15;
            if(this.fallingSpeed == 0) {
                this.fallingSpeed = 100;
            }
            this.fallingSpeed += 300 * deltaTime; // Increment falling speed if not grounded
            this.fallingOffset += this.fallingSpeed * deltaTime; // Increment falling offset if not grounded
            if(this.fallingOffset > 80) {
                this.fallen = true; // Mark the object as fallen
                if(this.fallingOffset < 200) {
                    this.scene.addObject(new Particle(this.scene, {
                        x: this.x + Math.random() * 40 - 20, 
                        y: this.y + Math.random()* 30 - 15, 
                        color: '#aaf5', 
                        ttl: 3, 
                        dx: Math.random() * 200 - 100, 
                        dy: Math.random() * 100 - 300, 
                        size: 15, dsize: -4, 
                        gravity: 300,
                        sortY: 15
                    })); // Add a particle effect when falling
                }
            }
            if(this.fallingOffset > 1500) {
                this.scene.initialize(); // Reset the scene if the falling offset exceeds a limit
            }
        }
        
    }

    checkCollision(terrain) {
        // Check for collision with terrain using rectangle collision detection
        return this.x + this.terrainColliderWidth / 2 > terrain.x - terrain.colliderWidth / 2 &&
               this.x - this.terrainColliderWidth / 2 < terrain.x + terrain.colliderWidth / 2 &&
               this.y + this.terrainColliderHeight / 2 > terrain.y - terrain.colliderHeight / 2 &&
               this.y - this.terrainColliderHeight / 2 < terrain.y + terrain.colliderHeight / 2;
    }

  
    render(ctx, forceRender = false) {
        if(this.fallen) {
            return; // Do not render if the object is marked as fallen
        }
        this.renderShadow(22, ctx);
        // Calculate the hopping motion using a sine wave
        const hopOffset = Math.abs(Math.sin(this.hoppingSineTime * this.hoppingSpeed) * this.hoppingAmplitude);
        this.renderer.render(ctx, this.x, this.y - hopOffset + this.fallingOffset, this.rotation);

        if(!forceRender && this.game.debug) {
            ctx.strokeStyle = '#f00';
            ctx.lineWidth = 2;
            ctx.strokeRect(this.x - this.terrainColliderWidth / 2, this.y - this.terrainColliderHeight / 2 + this.yDelta, this.terrainColliderWidth, this.terrainColliderHeight); // Draw the collider rectangle 
        }
    }
}