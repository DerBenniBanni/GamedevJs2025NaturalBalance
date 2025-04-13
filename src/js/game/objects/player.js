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
        this.rotSped = Math.PI * Math.random() /4 + 0.2; // Rotation speed
    }

    
    update(deltaTime) {
        super.update(deltaTime); // Call the parent class update method
        this.rotation += deltaTime * this.rotSped;
        /* Keyboard Input Handling 
        */
        if(this.game.actionActive('left')) {
            this.x -= 100 * deltaTime; // Move left
        }
        if(this.game.actionActive('right')) {
            this.x += 100 * deltaTime; // Move right
        }
        if(this.game.actionActive('up')) {
            this.y -= 100 * deltaTime; // Move up
        }
        if(this.game.actionActive('down')) {
            this.y += 100 * deltaTime; // Move down
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
        this.renderer.render(ctx, this.x, this.y, this.rotation);
    }
}