import GameObject from "./gameobject.js"; // Importing the GameObject class

export default class Circle extends GameObject {
    constructor(scene, {x, y, r}) {
        super(scene, {x, y}); // Call the parent class constructor
        this.type = "circle";
        this.r = r; // Radius of the circle
        this.color = '#aaa';
        this.colliderType = "circle"; // Type of collider for the circle
    }

    update(deltaTime) {
        super.update(deltaTime); // Call the parent class update method
    }

    render(ctx) {
        ctx.fillStyle = this.color; // Set fill color to blue
        ctx.beginPath(); // Start a new path
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2); // Draw the circle 
        ctx.fill(); // Fill the circle with the current fill color
        ctx.closePath(); // Close the path
    }
}