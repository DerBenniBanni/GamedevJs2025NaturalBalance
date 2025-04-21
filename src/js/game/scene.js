export default class Scene {
    constructor(name, game) {
        this.name = name; // Name of the scene
        this.game = game; // Reference to the game instance
        this.objects = []; // Array to hold scene objects
        this.setupFunction = ()=>{};
    }

    addObject(object) {
        this.objects.push(object); // Add object to the scene
        return object; // Return the added object
    }
    getObjectsByTypes(...types) {
        return this.objects.filter(object => types.includes(object.type)); // Get objects of specific types
    }
    // get the first object of a specific type
    getFirstObjectByType(type) {
        let objects = this.getObjectsByTypes(type); // Get objects of a specific type
        if(objects.length > 0) {
            return objects[0]; // Return the first object of the specified type
        } else {
            return null; // Return null if no objects of the specified type are found
        }
    }

    setup(setupFunction) {
        this.setupFunction = setupFunction;
    }

    initialize() {
        this.objects = [];
        this.setupFunction(this);
    }

    update(deltaTime) {
        this.objects = this.objects.filter(object => object.ttl > 0); // Remove objects that have expired
        this.objects.sort((a, b) => {
            return a.getSortY() - b.getSortY(); // Sort objects by their y position
        }); // Sort objects by their y position
        for (const object of this.objects) {
            object.update(deltaTime); // Update each object in the scene
        }
    }

    preRender(ctx) {
        ctx.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height); // Clear the canvas
    }

    render(ctx) {
        for (const object of this.objects) {
            object.render(ctx); // Render each object in the scene
        }
    }

    postRender(ctx) {
        // Additional rendering logic can be implemented here
    }
}