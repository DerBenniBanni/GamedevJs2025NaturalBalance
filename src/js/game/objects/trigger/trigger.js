import Rectangle from "../rectangle.js";

export default class Trigger extends Rectangle {
    constructor(scene, {x, y, width, height, text, triggerName}) {
        super(scene, {x, y, width, height});
        this.type = 'trigger';
        this.isActive = true;
        this.listeners = {
            enter: [],
            exit: [],
        };
        this.contacts = new Set(); // Store contacts with other objects
        this.colliderType = 'rectangle'; // Type of collider for the trigger

        this.color = '#000';
        this.bgColor = '#0003';
        
        this.text = text; // Text to display on the trigger
        this.triggerName = triggerName; // Unique identifier for the trigger
        this.sortY = -1000;
    }

    addListener(event, callback) {
        if (this.listeners[event]) {
            this.listeners[event].push(callback);
        }
    }

    update() {
        if (this.isActive) {
            this.checkCollision();
        }
    }

    checkCollision() {
        this.scene.getObjectsByTypes('player').forEach(player => {
            if (this.isColliding(player)) {
                if (!this.contacts.has(player)) {
                    this.contacts.add(player); // Add to contacts
                    this.listeners.enter.forEach(callback => callback(this, player)); // Notify enter listeners
                }
            } else {
                if (this.contacts.has(player)) {
                    this.contacts.delete(player); // Remove from contacts
                    this.listeners.exit.forEach(callback => callback(this, player)); // Notify exit listeners
                }
            }
        });
    }

    isColliding(other) {
        return this.x < other.x + other.triggerColliderWidth &&
               this.x + this.width > other.x &&
               this.y < other.y + other.triggerColliderHeight &&
               this.y + this.height > other.y;
    }

    render(ctx) {
        ctx.strokeStyle = this.color;
        ctx.fillStyle = this.bgColor;
        ctx.lineWidth = 3;
        ctx.fillRect(this.x, this.y, this.width, this.height); // Draw the trigger rectangle with background color
        ctx.strokeRect(this.x, this.y, this.width, this.height); // Draw the trigger rectangle

        ctx.fillStyle = this.color;
        ctx.font = "20px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(this.text, this.x + this.width / 2, this.y + this.height / 2); // Draw the text in the center of the trigger
    }
}