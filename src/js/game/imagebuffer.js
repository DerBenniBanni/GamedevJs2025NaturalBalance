export default class ImageBuffer {
    constructor() {
        this.imgs = {}; // Object to hold image-array
    }

    preRender(spritestackobject, width, height) {
        this.imgs[spritestackobject.type] = [];
        this.renderAsync(spritestackobject, width, height, 0);
        /*
        for(let angle = 0; angle < 360; angle ++) {
            let stackcanvas = document.createElement("canvas");
            //document.body.appendChild(stackcanvas); // Append the canvas to the body (for debugging purposes)
            stackcanvas.width = width;
            stackcanvas.height = height;
            let stackctx = stackcanvas.getContext("2d");
            spritestackobject.rotation = angle * Math.PI / 180; // Set the rotation of the sprite
            spritestackobject.x = width / 2; // Set the x position of the sprite
            spritestackobject.y = height / 2; // Set the y position of the sprite
            spritestackobject.render(stackctx); // Render the sprite on the canvas
            this.imgs[spritestackobject.type][angle] = stackcanvas; // Store the canvas in the image array
        }
        */
    }

    renderAsync(spritestackobject, width, height, angle) {
        let stackcanvas = document.createElement("canvas");
        stackcanvas.width = width;
        stackcanvas.height = height;
        let stackctx = stackcanvas.getContext("2d");
        spritestackobject.rotation = angle * Math.PI / 180; // Set the rotation of the sprite
        spritestackobject.x = width / 2; // Set the x position of the sprite
        spritestackobject.y = height / 2; // Set the y position of the sprite
        spritestackobject.render(stackctx); // Render the sprite on the canvas
        this.imgs[spritestackobject.type][angle] = stackcanvas; // Store the canvas in the image array
        if(angle < 359) {
            let self = this;
            setTimeout(()=>self.renderAsync(spritestackobject, width, height, angle+1), 1)
        }
    }
}