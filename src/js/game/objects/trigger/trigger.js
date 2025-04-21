import Rectangle from "../rectangle.js";

export default class Trigger extends Rectangle {
    constructor(scene, {x, y, width, height}) {
        super(scene, {x, y, width, height});
        this.type = 'trigger';
        this.isActive = true;
        this.listeners = {
            enter: [],
            exit: [],
        };
        this.contacts = new Set(); // Store contacts with other objects
        this.colliderType = 'rectangle'; // Type of collider for the trigger

        this.color = '#f003';
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
        this.scene.getObjectsByType('player').forEach(player => {
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
        return this.x < other.x + other.width &&
               this.x + this.width > other.x &&
               this.y < other.y + other.height &&
               this.y + this.height > other.y;
    }

    render(ctx) {
        super.render(ctx); // Call the parent class render method
    }
}