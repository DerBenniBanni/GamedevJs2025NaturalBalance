import SpritestackObject from "../spritestackobject.js";
import stackDefWolf from "../spritestacks/wolf.js";

export default class Wolf extends SpritestackObject{
    constructor(scene, {x, y}) {
        super(scene, {x, y, stackdef: stackDefWolf}); 
        this.type = "wolf";
    }
    
    update(deltaTime) {
        super.update(deltaTime);
        let player = this.scene.getObjectByType("player");
        if(player) {
            this.lookAt(player.x, player.y); // Look at the first player
        } else {
            this.lookAt(this.game.mousePos.x, this.game.mousePos.y);
        }
    }
    /*
    render(ctx) {
        this.renderer.render(ctx, this.x, this.y, this.rotation); 
    }
    */
}