import StackedSprite from "../renderer/stackedsprite.js";
import SpritestackObject from "../spritestackobject.js";
import stackDefFox from "../spritestacks/fox.js";

export default class Fox extends SpritestackObject {
    constructor(scene, {x, y}) {
        super(scene, {x, y, stackdef: stackDefFox}); 
        this.type = "fox";
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