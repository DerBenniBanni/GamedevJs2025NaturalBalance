import StackedSprite from "./renderer/stackedsprite.js";
import GameObject from "./gameobject.js";

export default class SpritestackObject extends GameObject {
    constructor(scene, {x, y, stackdef, type}) {
        super(scene, {x, y}); 
        this.type = type || "spritestackobject"; 
        this.renderer = new StackedSprite(stackdef);
        this.rotation = 0;
        this.colliderType = "circle"; 
    }
    update(deltaTime) {
        super.update(deltaTime); 
        //this.rotation += deltaTime * Math.PI / 4; // remove me...
    }
    render(ctx) {
        this.renderer.render(ctx, this.x, this.y, this.rotation); 
    }
}