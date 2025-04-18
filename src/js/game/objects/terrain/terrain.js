import StackedSprite from "../renderer/stackedsprite.js";
import SpritestackObject from "../spritestackobject.js";

const rndInt = (max) => Math.round(Math.random() * max);

export default class Terrain extends SpritestackObject {
    constructor(scene, {x, y}) {
        super(scene, {x, y}); 
        this.type = "terrain";
        this.yDelta = 100;
        
        this.imagebufferType = "variation"; 
        this.variation = rndInt(9)
    }
    createVariation() {
        this.renderer = new StackedSprite(this.createStackDef());
    }

    createStackDef() {
        const rndInt = (max) => Math.round(Math.random() * max);
        let stackDef = {
            def:[]
        };
 
        for(let x = -45; x <= 45; x+=10) {
            for(let z = -45; z <= 45; z+=10) {
                let height = 18 + rndInt(10);
                let bottom = 95 - height;
                let sx = 10 + rndInt(10);
                let sz = 10 + rndInt(10);
                let color = "765"; //(rndInt(2)+ 7) + '8'+ (rndInt(2));
                let stroke = '654';
                stackDef.def.push([
                    'B', bottom, height, Math.floor(x-sx/2), Math.floor(z-sz/2), sx, sz, color, stroke,
                    sx, sx+50
                ]);
            }
        }

        for(let x = -45; x <= 45; x+=10) {
            for(let z = -45; z <= 45; z+=10) {
                let bottom = rndInt(2)+98;
                let height = 3 + rndInt(4) - 2;
                let sx = 10 + rndInt(20);
                let sz = 10 + rndInt(20);
                let color = rndInt(5) + '8'+ rndInt(5);
                stackDef.def.push([
                    'B', bottom, height, Math.floor(x-sx/2), Math.floor(z-sz/2), sx, sz, color,,
                    sx, sx+50
                ]);
            }
        }
    

        return stackDef;

    }
    update(deltaTime) {
        super.update(deltaTime);
        //this.rotation += Math.PI / 2 * deltaTime;
        /*
        if(this.game.mousePos) {
            this.lookAt(this.game.mousePos.x, this.game.mousePos.y);
        }
        */
    }
    /*
    render(ctx) {
        this.renderer.render(ctx, this.x, this.y, this.rotation); 
    }
    */
}