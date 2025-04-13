export default class GameObject {  

    constructor(scene, {x, y}) {
        this.type = "gameobject";
        this.scene = scene; // Reference to the scene instance
        this.game = scene.game; // Reference to the game instance
        this.x = x; // X position of the game object
        this.y = y; // Y position of the game object
        this.ttl = Infinity; // Time to live for the object
        this.colliderType = "none"; // Type of collider for the object
    }

    update(deltaTime) {
        this.ttl -= deltaTime; // Decrease time to live
        // Update logic for the game object can be implemented here
    }

    render() {
        // Render logic for the game object can be implemented here
    }
}