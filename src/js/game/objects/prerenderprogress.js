import registerGamepadEvents from "../input/gamepad.js";
import registerKeys from "../input/keyboard.js";
import registerPointerEvents from "../input/pointer.js";
import GameObject from "./gameobject.js";

const RENDERING = 1;
const FINISHED = 2;

export default class PrerenderProgress extends GameObject {
    constructor(scene, {x, y, finishedCallback}) {
        super(scene, {x, y});
        this.type = "prerenderprogress";
        this.color = '#ff0'; // Green color for the progress bar
        this.state = RENDERING; // Initial state of the progress bar
        this.fontSizeBase = 40; // Font size for the text
        this.fontSize = this.fontSizeBase;
        this.fontSizeTime = 0; // Time variable for font size animation
        this.finishedCallback = finishedCallback; // Callback function when finished
        this.waitForFireAction = true; // Keep alive flag
    }
    update(deltaTime) {
        document.getElementById("mainCanvas").focus()
        super.update(deltaTime); // Call the parent class update method
        if(imagebuffer.allDone()) { // Check if all images are prerendered
            this.state = FINISHED; // Change state to finished
            let game = this.game
            game.canvas.focus();
            registerKeys(game); // Register actions with the game
            registerPointerEvents(game, game.canvas); // Register mouse events
        }
        if(this.state == FINISHED) {
            if(!this.waitForFireAction) {
                this.ttl = 0;
                if(this.finishedCallback) {
                    this.finishedCallback(); // Call the finished callback function
                }
            } else if(this.game.actionActive('fire')) {
                if(this.finishedCallback) {
                    this.ttl = 0;
                    this.finishedCallback(); // Call the finished callback function
                }
            }
        }
        if(this.state == RENDERING) {
            this.fontSizeTime += deltaTime; // Increase the time variable for font size animation
            this.fontSize = this.fontSizeBase + Math.sin(this.fontSizeTime) * 3; // Change font size based on sine wave
        }
    }
    
    render(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y); // Translate the context to the object's position
        ctx.fillStyle = this.color;
        ctx.font = this.fontSize + "px sanserif";
        ctx.textAlign = "center";
        let text = "PRE RENDERING GRAPHICS...";
        if(this.state == FINISHED) {
            text = "Press Space or Mouse or Gamepad to start the game!";
        }
        ctx.fillText(text, 0, 0);
        ctx.restore();
    }
}