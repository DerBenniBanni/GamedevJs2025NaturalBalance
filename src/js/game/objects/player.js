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
        this.hoppingAmplitude = 10; // Amplitude of the hopping motion
        this.hoppingSpeed = 12; // Speed of the hopping motion

        this.maxSpeed = 200; // Maximum speed of the player in pixels per second
    }

    
    update(deltaTime) {
        super.update(deltaTime); // Call the parent class update method
        // Calculate rotation to look at the mouse position
        const dx = this.game.mousePos.x - this.x;
        const dy = this.game.mousePos.y - this.y;
        this.rotation = Math.atan2(dy, dx);
        
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
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.scale(1, 0.5);
        ctx.fillStyle = '#0002';
        ctx.beginPath();
        ctx.arc(0, 0, 28, 0, Math.PI * 2);
        ctx.arc(0, 0, 26, 0, Math.PI * 2);
        ctx.arc(0, 0, 22, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
        ctx.restore();
        // Calculate the hopping motion using a sine wave
        const hopOffset = Math.abs(Math.sin(this.hoppingSineTime * this.hoppingSpeed) * this.hoppingAmplitude);
        this.renderer.render(ctx, this.x, this.y - hopOffset, this.rotation);
    }
}