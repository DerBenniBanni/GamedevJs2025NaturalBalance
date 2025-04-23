import Bullet from "./bullets/bullet.js";
import StackedSprite from "./renderer/stackedsprite.js";
import SpritestackObject from "./spritestackobject.js";
import stackDefRabbit from "./spritestacks/rabbit.js";
import Vec2d from "./vec2d.js";

export default class Player extends SpritestackObject {
    constructor(scene, {x, y, width, height, color}) {
        super(scene, {x, y, stackdef: stackDefRabbit});
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

        this.predatorColliderWidth = 80;
        this.predatorColliderHeight = 40;

    }

    checkPredatorHit(predator) {
        if(this.hitJumping) {  
            return false; // Ignore predator collision if already hit jumping
        }
        // Check if the predator is within the player's collider area
        if(predator.x > this.x - this.predatorColliderWidth / 2 &&
           predator.x < this.x + this.predatorColliderWidth / 2 &&
           predator.y > this.y - this.predatorColliderHeight / 2  &&
           predator.y < this.y + this.predatorColliderHeight / 2 ) {
            return true; // Set hit jumping flag
        }
        return false; // Predator did not hit the player
    }

    
    update(deltaTime) {
        super.update(deltaTime); // Call the parent class update method
        this.bulletTimer -= deltaTime; // Decrease the bullet timer

        this.scene.getObjectsByTypes('fox', 'wolf', 'lynx').find(predator => {
            if(this.checkPredatorHit(predator)) {
                this.hitJumping = true; // Set hit jumping flag
                this.hitJumpDx = Math.cos(predator.rotation) * 200; // Calculate the hit jump dx based on predator rotation
                this.hitJumpDy = Math.sin(predator.rotation) * 200; // Calculate the hit jump dy based on predator rotation
                return true; // Predator hit the player
            }
            return false; // Predator did not hit the player
        });

        this.checkGrounded();
        if(this.hitJumping) {
            this.hitJumpingTime += deltaTime;
            this.x += this.hitJumpDx * deltaTime;
            this.y += this.hitJumpDy * deltaTime;
            if(this.hitJumpingTime > this.hitJumpDuration) {
                this.hitJumping = false; // Reset hit jumping after 1 second
                this.hitJumpingTime = 0;
            }
        } else if(this.grounded) {
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
            let forwardVector = new Vec2d(Math.cos(this.rotation), Math.sin(this.rotation)); // Forward vector based on rotation
            let backwardVector = new Vec2d(-forwardVector.x, -forwardVector.y); // Backward vector opposite to forward vector
            let rightVector = new Vec2d(-forwardVector.y, forwardVector.x); // Right vector perpendicular to forward vector
            let leftVector = new Vec2d(forwardVector.y, -forwardVector.x); // Left vector perpendicular to forward vector
            let moveVector = new Vec2d(0, 0); // Initialize movement vector
            if(this.game.actionActive('left')) {
                if(this.game.keyboardMode == 'Face') {
                    moveVector = leftVector.multiply(this.maxSpeed * deltaTime); // strafe left
                } else {
                    moveVector.x -= this.maxSpeed * deltaTime; // Move left
                }
                moving = true;
            }
            if(this.game.actionActive('right')) {
                if(this.game.keyboardMode == 'Face') {
                    moveVector = rightVector.multiply(this.maxSpeed * deltaTime); // strafe right
                } else {
                    moveVector.x += this.maxSpeed * deltaTime; // Move right
                }
                moving = true;
            }
            if(this.game.actionActive('up')) {
                if(this.game.keyboardMode == 'Face') {
                    moveVector = forwardVector.multiply(this.maxSpeed * deltaTime); // forward
                } else {
                    moveVector.y -= this.maxSpeed * deltaTime; // Move up
                }
                moving = true;
            }
            if(this.game.actionActive('down')) {
                if(this.game.keyboardMode == 'Face') {
                    moveVector = backwardVector.multiply(this.maxSpeed * deltaTime); // forward
                } else {
                    moveVector.y += this.maxSpeed * deltaTime; // Move down
                }
                moving = true;
            }
            if(moving) {
                this.x += moveVector.x; // Update x position based on movement vector
                this.y += moveVector.y; // Update y position based on movement vector
            } else if(this.game.inputMode == 'gamepad') {
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
                this.game.sfxPlayer.playAudio("shoot"); // Play shooting sound effect
            }
            if(!moving) {
                this.hoppingSineTime = 0; // Reset time if not moving
            } else {
                this.hoppingSineTime += deltaTime; // Increment time if moving
            }
        } else {
            this.handleFall(deltaTime);
            if(this.fallingOffset > 1500) {
                this.scene.initialize(); // Reset the scene if the falling offset exceeds a limit
            }
        }
        
    }

  
    render(ctx, forceRender = false) {
        if(this.fallen) {
            return; // Do not render if the object is marked as fallen
        }
        if(forceRender) {
            this.renderer.render(ctx, this.x, this.y+ this.yDelta, this.rotation); // Render the sprite on the canvas
        } else {
            this.renderShadow(22, ctx);
            // Calculate the hopping motion using a sine wave
            const hopOffset = Math.abs(Math.sin(this.hoppingSineTime * this.hoppingSpeed) * this.hoppingAmplitude);
            let hitJumpY = 0;
            if(this.hitJumping) {
                hitJumpY = Math.sin(Math.PI * (this.hitJumpingTime / this.hitJumpDuration)) * 30; // Calculate the hit jump Y offset based on time
            }
            //this.renderer.render(ctx, this.x, this.y - hopOffset - hitJumpY + this.fallingOffset, this.rotation);
            this.renderSpriteBuffer(this.x, this.y - hopOffset - hitJumpY + this.fallingOffset, ctx); // Render the sprite buffer
            if(!forceRender && this.game.debug) {
                ctx.strokeStyle = '#f00';
                ctx.lineWidth = 2;
                ctx.strokeRect(this.x - this.terrainColliderWidth / 2, this.y - this.terrainColliderHeight / 2 + this.yDelta, this.terrainColliderWidth, this.terrainColliderHeight); // Draw the collider rectangle 
                ctx.strokeStyle = '#0ff';
                ctx.strokeRect(this.x - this.predatorColliderWidth / 2, this.y - this.predatorColliderHeight / 2 + this.yDelta, this.predatorColliderWidth, this.predatorColliderHeight); // Draw the predator collider rectangle
            }
        }
    }
}