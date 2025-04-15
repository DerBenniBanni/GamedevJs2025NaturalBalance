import Vec2d from "./vec2d.js";

export default class GameObject {  

    constructor(scene, {x, y}) {
        this.type = "gameobject";
        this.scene = scene; // Reference to the scene instance
        this.game = scene.game; // Reference to the game instance
        this.x = x; // X position of the game object
        this.y = y; // Y position of the game object
        this.ttl = Infinity; // Time to live for the object
        this.colliderType = "none"; // Type of collider for the object
        
        this.rotation = 0; // Rotation of the object in radians
        this.speed = 0; // Change in position
        this.dRot = 0; // Change in rotation
    }

    update(deltaTime) {
        this.ttl -= deltaTime; // Decrease time to live
        if(this.speed != 0) {
            this.x += Math.cos(this.rotation) * this.speed * deltaTime; // Update x position based on speed and rotation
            this.y += Math.sin(this.rotation) * this.speed * deltaTime; // Update y position based on speed and rotation
        }
        if(this.dRot != 0) {
            this.rotation += this.dRot * deltaTime; // Update rotation based on change in rotation
        }
    }

    render(ctx) {
        // Render logic for the game object can be implemented here
    }

    renderShadow(radius, ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.scale(1, 0.5);
        ctx.fillStyle = '#0002';
        ctx.beginPath();
        ctx.arc(0, 0, radius * 1.2, 0, Math.PI * 2);
        ctx.arc(0, 0, radius * 1.1, 0, Math.PI * 2);
        ctx.arc(0, 0, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
        ctx.restore();}

    lookAt(x, y) {
        // Calculate the angle to look at the specified coordinates
        this.rotation = Math.atan2(y - this.y, x - this.x);
    }
}