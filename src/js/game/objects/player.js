import Bullet from "./bullets/bullet.js";
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
    }

    
    update(deltaTime) {
        super.update(deltaTime); // Call the parent class update method
        this.bulletTimer -= deltaTime; // Decrease the bullet timer
        // Calculate rotation to look at the mouse position
        this.lookAt(this.game.mousePos.x, this.game.mousePos.y);
        
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

        if(this.game.actionActive('fire') && this.bulletTimer <= 0) {
            let bullet = this.scene.addObject(new Bullet(this.scene, {x: this.x, y: this.y-1, r:this.rotation}));
            bullet.speed = this.bulletSpeed;
            this.bulletTimer = this.bulletInterval; // Reset the bullet timer
        }
        if(!moving) {
            this.hoppingSineTime = 0; // Reset time if not moving
        } else {
            this.hoppingSineTime += deltaTime; // Increment time if moving
        }
        /* Scene switching logic
        if(this.x > 300) {
            let name = this.scene.name == "level1" ? "level2" : "level1";
            let scene = this.game.getScene(name);
            scene.initialize();
            this.game.switchToScene(scene);
        }
        */
        /* Mouse Input Handling 
        this.x = this.game.mousePos.x;
        this.y = this.game.mousePos.y;
        */
        /* Device Orientation Handling 
        if(this.game.orientation) {
            this.x += deltaTime * (this.game.orientation.gamma * 10); // Move left/right based on device orientation
            this.y += deltaTime * (this.game.orientation.beta * 10); // Move up/down based on device orientation
        }
        */
    }

  
    render(ctx) {
        this.renderShadow(22, ctx);
        // Calculate the hopping motion using a sine wave
        const hopOffset = Math.abs(Math.sin(this.hoppingSineTime * this.hoppingSpeed) * this.hoppingAmplitude);
        this.renderer.render(ctx, this.x, this.y - hopOffset, this.rotation);
    }
}