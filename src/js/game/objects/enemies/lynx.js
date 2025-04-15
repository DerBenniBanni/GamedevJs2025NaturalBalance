import SpritestackObject from "../spritestackobject.js";
import stackDefLynx from "../spritestacks/lynx.js";

export default class Lynx extends SpritestackObject{
    constructor(scene, {x, y}) {
        super(scene, {x, y, stackdef: stackDefLynx}); 
        this.type = "lynx";
    }
    
    update(deltaTime) {
        super.update(deltaTime);
        this.lookAt(this.game.mousePos.x, this.game.mousePos.y);
    }
    /*
    render(ctx) {
        this.renderer.render(ctx, this.x, this.y, this.rotation); 
    }
    */
}