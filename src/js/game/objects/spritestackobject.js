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
    render(ctx, forceRender = false) {
        let rotationDeg = Math.floor((this.rotation * 180 / Math.PI) % 360); // Convert rotation to degrees
        if(rotationDeg < 0) rotationDeg += 360; // Ensure rotation is positive
        if(!forceRender && imagebuffer.imgs[this.type] && imagebuffer.imgs[this.type][rotationDeg]) {
            let imgCanvas = imagebuffer.imgs[this.type][rotationDeg]; // Get the image canvas for the current rotation
            ctx.drawImage(imgCanvas, this.x - imgCanvas.width / 2, this.y - imgCanvas.height / 2); // Draw the image at the specified position
        } else {
           this.renderer.render(ctx, this.x, this.y, this.rotation); 
        }
    }
}