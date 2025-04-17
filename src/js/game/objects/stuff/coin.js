import SpritestackObject from "../spritestackobject.js";
import stackDefCoin from "../spritestacks/coin.js";

export default class Coin extends SpritestackObject {
    constructor(scene, {x, y}) {
        super(scene, {x, y, stackdef: stackDefCoin}); 
        this.type = "coin";
        this.rotSped = Math.PI / 2; // Rotation speed
    }
    
    update(deltaTime) {
        super.update(deltaTime);
        let player = this.scene.getObjectByType("player");
        this.rotation += this.rotSped * deltaTime; // Update rotation

    }

    /*
    render(ctx) {
        this.renderer.render(ctx, this.x, this.y, this.rotation); 
    }
    */
}