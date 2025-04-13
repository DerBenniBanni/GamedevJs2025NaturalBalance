import GameObject from "./gameobject.js"; // Importing the GameObject class

export default class Rectangle extends GameObject {
    constructor(scene, {x, y, width, height}) {
        super(scene, {x, y}); // Call the parent class constructor
        this.type = "rectangle";
        this.width = width; // Width of the rectangle
        this.height = height; // Height of the rectangle
        this.color = '#aaa';
        this.colliderType = "rectangle"; // Type of collider for the rectangle
    }

    update(deltaTime) {
        super.update(deltaTime); // Call the parent class update method
    }

    render(ctx) {
        ctx.fillStyle = this.color; // Set fill color to blue
        ctx.fillRect(this.x, this.y, this.width, this.height); // Draw the rectangle
    }
}