import Rectangle from "./rectangle.js";

export default class Text extends Rectangle {
    constructor(scene, {x, y, width, height, text}) {
        super(scene, {x, y, width, height});
        this.type = 'text';

        this.color = '#000';
        
        this.text = text; // Text to display on the trigger
        this.sortY = -1005;
    }


    update(deltaTime) {
        super.update(deltaTime); // Call the parent class update method
    }

    render(ctx) {
        ctx.fillStyle = this.color;
        ctx.font = "20px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(this.text, this.x + this.width / 2, this.y + this.height / 2); // Draw the text in the center of the trigger
    }
}