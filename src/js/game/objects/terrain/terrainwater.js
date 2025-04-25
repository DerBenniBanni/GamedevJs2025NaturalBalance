import StackedSprite from "../renderer/stackedsprite.js";
import SpritestackObject from "../spritestackobject.js";

const rndInt = (max) => Math.round(Math.random() * max);

export default class TerrainWater extends SpritestackObject {
    constructor(scene, {x, y}) {
        super(scene, {x, y}); 
        this.type = "terrainwater";
        this.yDelta = 100;
        this.sortY = 2000;
        this.colliderType = "rectangle"; 
        this.colliderWidth = 100;
        this.colliderHeight = 50;
        this.imagebufferType = "variation"; 
        this.variation = rndInt(9);
        this.variationDuration = Math.random() * 0.5 + 0.5; // Random duration 
        this.variationTime = 0; // Time since last variation
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
                let bottom = 100 - height;
                let sx = 10 + rndInt(20);
                let sz = 10 + rndInt(20);
                stackDef.def.push([
                    'B', bottom-2, 1, Math.floor(x-sx), Math.floor(z-sz), sx*2, sz*2, 'aaccff04',,
                    0, 1000
                ]);
            }
        }
    
        return stackDef;

    }
    update(deltaTime) {
        super.update(deltaTime);
        this.variationTime += deltaTime; // Increment the variation time
        if (this.variationTime >= this.variationDuration) {
            this.variationTime = 0; // Reset the variation time
            this.variation = rndInt(9); // Randomly change the variation
        }
    }
    
    render(ctx, forceRender = false) {
        super.render(ctx, forceRender); // Call the parent render method
    }

    
}