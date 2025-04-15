import SpritestackObject from "../spritestackobject.js";
import stackDefCarrotBullet from "../spritestacks/carrotbullet.js";

export default class Bullet extends SpritestackObject{
    constructor(scene, {x, y, r}) {
        super(scene, {x, y, stackdef: stackDefCarrotBullet}); 
        this.type = "bullet";
        this.speed = 0;
        this.ttl = 1;
        this.initTtl = this.ttl;
        this.height = 15;
        this.rotation = r || 0
    }
    /*
    update(deltaTime) {
        super.update(deltaTime); 
    }
    */
    render(ctx) {
        this.renderShadow(10, ctx);
        let height = this.height * (this.ttl / this.initTtl);
        this.renderer.render(ctx, this.x, this.y - height, this.rotation); 
    }
}