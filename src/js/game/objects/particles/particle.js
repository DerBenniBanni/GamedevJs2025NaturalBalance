import GameObject from "../gameobject.js";

export default class Particle {
    constructor(scene, {x, y, color, size, ttl, dx, dy, dsize, gravity, sortY, particle}) {
        this.type = "gameobject";
        this.particle = particle || "particle"; // Reference to the particle instance
        this.scene = scene; // Reference to the scene instance
        this.game = scene.game; // Reference to the game instance
        this.x = x; // X position of the game object
        this.y = y; // Y position of the game object
        this.type = "particle"; // Type of the object
        this.color = color || '#aaa'; // Color of the particle
        this.size = size || 5; // Size of the particle
        this.dsize = dsize || 0; // Size of the particle
        this.ttl = ttl || 1; // Time to live for the particle
        this.dx = dx || 0; // Change in x position
        this.dy = dy || 0; // Change in y position
        this.gravity = gravity || 0; // Gravity effect on the particle
        this.sortY = sortY || 0; // Y delta for the sorting
    }
    

    getSortY()  {
        return this.y - this.sortY; // Return the Y position for sorting
    }

    update(deltaTime) {
        this.ttl -= deltaTime; // Decrease time to live
        this.x += this.dx * deltaTime; // Update x position based on change in x position
        this.y += this.dy * deltaTime; // Update y position based on change in y position
        this.rotation += this.dRot * deltaTime; // Update rotation based on change in rotation
        this.dy += this.gravity * deltaTime; // Update y position based on speed and gravity
        this.size += this.dsize * deltaTime; // Update size based on change in size
    }
    
    render(ctx) {
        switch(this.particle) {
            case "ripple":
                ctx.fillStyle = this.color; // Set fill color to the particle color
                ctx.beginPath(); // Begin a new path for the ripple
                ctx.ellipse(this.x, this.y, this.size, this.size/2, 0, 0, Math.PI * 2); // Draw a circle for the ripple
                ctx.fill(); // Fill the circle with the specified color
                ctx.closePath(); // Close the path for the ripple
                break;
            default:
                ctx.fillStyle = this.color; // Set fill color to the particle color
                ctx.beginPath(); // Begin a new path for the particle
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); // Draw a circle for the particle
                ctx.fill(); // Fill the circle with the specified color
                ctx.closePath(); // Close the path for the particle
                break;
        }
        
    }
}
