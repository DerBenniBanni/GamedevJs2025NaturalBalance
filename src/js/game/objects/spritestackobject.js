import StackedSprite from "./renderer/stackedsprite.js";
import GameObject from "./gameobject.js";

export default class SpritestackObject extends GameObject {
    constructor(scene, {x, y, stackdef, type}) {
        super(scene, {x, y}); 
        this.type = type || "spritestackobject"; 
        if(stackdef) {
            this.renderer = new StackedSprite(stackdef);
        } else if(this.createStackDef) {
            this.renderer = new StackedSprite(this.createStackDef()); 
        } else {
            this.renderer = new StackedSprite({def: []});
        }
        this.rotation = 0;
        this.colliderType = "circle";
        this.imagebufferType = "rotation"; 
    }
    update(deltaTime) {
        super.update(deltaTime); 
        //this.rotation += deltaTime * Math.PI / 4; // remove me...
    }
    render(ctx, forceRender = false) {
        if(forceRender) {
            this.renderer.render(ctx, this.x, this.y+ this.yDelta, this.rotation); // Render the sprite on the canvas
        } else if(this.imagebufferType === "rotation") {
            let rotationDeg = Math.floor((this.rotation * 180 / Math.PI) % 360); // Convert rotation to degrees
            if(rotationDeg < 0) rotationDeg += 360; // Ensure rotation is positive
            if(imagebuffer.imgs[this.type] && imagebuffer.imgs[this.type][rotationDeg]) {
                let imgCanvas = imagebuffer.imgs[this.type][rotationDeg]; // Get the image canvas for the current rotation
                ctx.drawImage(imgCanvas, this.x - imgCanvas.width / 2, this.y - imgCanvas.height / 2); // Draw the image at the specified position
            }
        } else if(this.imagebufferType === "variation") {
            if(imagebuffer.imgs[this.type][this.variation]) {
                let imgCanvas = imagebuffer.imgs[this.type][this.variation]; // Get the image canvas for the current variation
                ctx.drawImage(imgCanvas, this.x - imgCanvas.width / 2, this.y - imgCanvas.height / 2); // Draw the image at the specified position
            }
        } else {
            this.renderer.render(ctx, this.x, this.y+ this.yDelta, this.rotation); 
        }
    }
}