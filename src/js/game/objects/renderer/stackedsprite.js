export default class StackedSprite {
    constructor(stackDef) {
        this.layers = this.initLayers(stackDef); // bottom to top

        this.layerThickness = 1; // thickness of each layer

        this.fillStyle = "#fff";
        this.strokeStyle = "#fff";
        this.yDelta = 0;
    }

    initLayers(stackDef) {
        let layers = [];
        let maxHeight = stackDef.def.reduce((max, def) => {
            let topHeight = 0;
            switch(def[0]) {
                case "B":
                    topHeight = def[1]+def[2];
                    break;
                default: // ignore
            }
            return topHeight > max ? topHeight : max;
        }, 0);
        
        for(let currentHeight = 0; currentHeight <= maxHeight; currentHeight++) {
            let layer = [];
            stackDef.def.forEach(def => {
                if(this.defIntersectsHeight(def, currentHeight)) {
                    switch(def[0]) {
                        case "B":
                            let [type, baseHeight, height, x, z, width, depth, fill, stroke] = def;
                            if(currentHeight == baseHeight || currentHeight == baseHeight+height) {
                                if(stroke) {
                                    layer.push(["#", stroke]);
                                    layer.push([
                                        "R", x, z, width, depth
                                    ]);
                                }
                                layer.push(["#", fill]);
                                layer.push([
                                    "R", x+1, z+1, width-2, depth-2
                                ]);
                            } else {
                                layer.push(["#", fill]);
                                layer.push([
                                    "R", x, z, width, depth
                                ]);
                                if(stroke) {
                                    layer.push(["#", stroke]);
                                    layer.push(["R", x, z, 1, 1]);
                                    layer.push(["R", x, z+depth-1, 1, 1]);
                                    layer.push(["R", x+width-1, z, 1, 1]);
                                    layer.push(["R", x+width-1, z+depth-1, 1, 1]);
                                }
                            }
                            break;
                        default: // ignore
                    }
                }
            });
            layers.push(layer);
        }
        return layers;
    }

    defIntersectsHeight(def, height) {
        return height >= def[1] && height <= def[1]+def[2];
    }

    render(ctx, x, y, rotation) {
        this.yDelta = 0;
        this.fillStyle = "#fff";
        this.layers.forEach(layer => {
            if(layer[0] === "l") {
                this.layerThickness = layer[1];
                return;
            }
            for(let i = 0; i < this.layerThickness; i++) {
                ctx.save();
                ctx.translate(x, y - this.yDelta);
                ctx.scale(1, 0.5);
                ctx.rotate(rotation);
                ctx.fillStyle = this.fillStyle;
                layer.forEach(layerPart => {
                    this.renderLayer(ctx, layerPart, x, y, rotation);
                });
                ctx.restore();
                this.yDelta++;  
            }
        });
    }

    renderLayer(ctx, layer, x, y, rotation) {
        if (layer[0] === "#") {
            this.fillStyle = "#" + layer[1];
            ctx.fillStyle = this.fillStyle;
        } else if (layer[0] === "#S") {
            this.strokeStyle = "#" + layer[1];
            ctx.strokeStyle = this.fillStyle;
        } else {
            if (layer[0] === "R") {
                let x = Math.cos(-rotation + Math.PI * 0.5) * 40;
                let y = Math.sin(-rotation + Math.PI * 0.5) * 40;
                let gradient = ctx.createRadialGradient(x, y, 3, x, y, 120);
                // Add three color stops
                gradient.addColorStop(0, this.fillStyle);
                gradient.addColorStop(1, "#000");
                ctx.fillStyle = gradient;
                ctx.fillRect(layer[1], layer[2], layer[3], layer[4]);
                //ctx.fillStyle = '#ff0';
                //ctx.fillRect(x,y,3,3);
                ctx.fillStyle = this.fillStyle;
            }
        }
    }
}