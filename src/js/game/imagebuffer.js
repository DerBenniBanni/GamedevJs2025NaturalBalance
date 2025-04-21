export default class ImageBuffer {
    constructor() {
        this.imgs = {}; // Object to hold image-array
        this.states = []; // Array to hold prerender states
    }

    preRender(spritestackobject, width, height) {
        this.imgs[spritestackobject.type] = [];
        this.states.push({type: spritestackobject.type, done: false}); // Store the state of the sprite
        this.renderAsyncRotated(spritestackobject, width, height, 0);
    }

    renderAsyncRotated(spritestackobject, width, height, angle, maxangle = 359) {
        let stackcanvas = this.render(spritestackobject, width, height, angle); // Render the sprite on a canvas
        this.imgs[spritestackobject.type][angle] = stackcanvas; // Store the canvas in the image array
        if(angle < maxangle) {
            let self = this;
            setTimeout(()=>self.renderAsyncRotated(spritestackobject, width, height, angle + 1), 1)
        } else {
            this.markStateDone(spritestackobject.type); // Mark the state as done
        }
    }
    markStateDone(type) {
        this.states.forEach(state => {
            if(state.type === type) {
                state.done = true; // Mark the state as done
            }
        });
    }

    preRenderVariation(spritestackobject, width, height, variations) {
        this.imgs[spritestackobject.type] = [];
        this.renderAsyncVariation(spritestackobject, width, height, variations-1);
    }

    renderAsyncVariation(spritestackobject, width, height, variation) {
        spritestackobject.createVariation(); // Create a variation of the sprite
        let stackcanvas = this.render(spritestackobject, width, height, 0); // Render the sprite on a canvas
        this.imgs[spritestackobject.type].push(stackcanvas); // Store the canvas in the image array
        if(variation > 0) {
            let self = this;
            setTimeout(()=>self.renderAsyncVariation(spritestackobject, width, height, variation - 1), 1)
        } else {
            this.markStateDone(spritestackobject.type); // Mark the state as done
        }
    }

    allDone() {
        let done = true; // Flag to check if all states are done
        this.states.forEach(state => {
            if(!state.done) {
                done = false; // If any state is not done, set flag to false
            }
        });
        return done; // Return the status of all states
    }


    render(spritestackobject, width, height, angle) {
        let stackcanvas = document.createElement("canvas");
        stackcanvas.width = width;
        stackcanvas.height = height;
        let stackctx = stackcanvas.getContext("2d");
        spritestackobject.rotation = angle * Math.PI / 180; // Set the rotation of the sprite
        spritestackobject.x = width / 2; // Set the x position of the sprite
        spritestackobject.y = height / 2; // Set the y position of the sprite
        spritestackobject.render(stackctx, true); // Render the sprite on the canvas
        return stackcanvas; // Return the canvas with the rendered sprite
    }

}