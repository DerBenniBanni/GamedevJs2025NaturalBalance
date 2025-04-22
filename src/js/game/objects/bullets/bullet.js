import Particle from "../particles/particle.js";
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
    
    update(deltaTime) {
        super.update(deltaTime); 
        this.scene.getObjectsByTypes('fox', 'wolf', 'lynx').find(predator => {
            if(predator.checkBulletCollision(this)) {
                this.ttl = -1; // Mark the bullet for removal
                for(let i = 0; i < 20; i++) {
                    this.scene.addObject(new Particle(this.scene, {
                        x: this.x + Math.random() * 10 - 5, 
                        y: this.y + Math.random()* 10 - 5, 
                        color: '#ff8800', 
                        alpha: 1,
                        ttl: 0.5, 
                        dx: Math.random() * 200 - 100, 
                        dy: Math.random() * -100 , 
                        size: 5, dsize: -8, 
                        gravity: 100,
                        sortY: -100
                    }));
                }
                return true;
            }
            return false;
        });
    }

    
    render(ctx, forceRender = false) {
        this.renderShadow(10, ctx);
        let height = this.height * (this.ttl / this.initTtl);
        this.renderer.render(ctx, this.x, this.y - height, this.rotation); 

        if(!forceRender && this.game.debug) {
            ctx.strokeStyle = '#ff0';
            ctx.lineWidth = 2;
            ctx.strokeRect(this.x - 3, this.y - 3 + this.yDelta, 6, 6); // Draw the collider rectangle 
        }
    }
}