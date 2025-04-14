import Circle from "../circle.js";
import StackedSprite from "../renderer/stackedsprite.js";
import stackDefCarrotBullet from "../spritestacks/carrotbullet.js";

export default class Bullet extends Circle {
    constructor(scene, {x, y, r}) {
        super(scene, {x, y, r}); // Call the parent class constructor
        this.type = "bullet"; // Set the type of the object to "bush"
        this.color = '#008000'; // Set the color to green
        this.renderer = new StackedSprite(stackDefCarrotBullet);
        this.rotation = 0;
    }
    update(deltaTime) {
        super.update(deltaTime); // Call the parent class update method
        this.rotation += deltaTime * Math.PI / 4; // Update the rotation of the bush
    }
    render(ctx) {
        this.renderer.render(ctx, this.x, this.y, this.rotation); // Render the bush using the StackedSprite renderer
    }
}