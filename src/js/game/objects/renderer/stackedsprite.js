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

        const toLayer = ({type,x,z,width,depth,lightDist,darkDist}) => {
            if(lightDist != undefined && darkDist != undefined) {
                return [
                    type, x, z, width, depth, lightDist, darkDist
                ];
            }
            return [
                type, x, z, width, depth
            ];
        }
        
        for(let currentHeight = 0; currentHeight <= maxHeight; currentHeight++) {
            let layer = [];
            stackDef.def.forEach(def => {
                if(this.defIntersectsHeight(def, currentHeight)) {
                    switch(def[0]) {
                        case "B":
                            let [type, baseHeight, height, x, z, width, depth, fill, stroke, lightDist, darkDist] = def;
                            if(currentHeight == baseHeight || currentHeight == baseHeight+height) {
                                if(stroke) {
                                    layer.push(["#", stroke]);
                                    layer.push(toLayer({type:"R", x, z, width, depth, lightDist, darkDist}));
                                    layer.push(["#", fill]);
                                    
                                    layer.push(toLayer({type:"R", x:x+1, z:z+1, width:width-2, depth:depth-2, lightDist, darkDist}));
                                } else {
                                    layer.push(["#", fill]);
                                    layer.push(toLayer({type:"R", x, z, width, depth, lightDist, darkDist}));
                                }
                                
                            } else {
                                layer.push(["#", fill]);
                                layer.push(toLayer({type:"R", x, z, width, depth, lightDist, darkDist}));
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
                let hasLightDist = layer.length > 5 && layer[5] != undefined;
                let lightDist = layer.length > 5 && layer[5] != undefined ? layer[5] : 40;
                let darkDist = layer.length > 6 && layer[6] != undefined ? layer[6] : 120;
                let x = Math.cos(-rotation + Math.PI * 0.5) * lightDist;
                let y = Math.sin(-rotation + Math.PI * 0.5) * lightDist;
                if(hasLightDist) {
                    x = layer[1] + layer[3] / 2;
                    y = layer[2] + layer[4] / 2;
                }
                let gradient = ctx.createRadialGradient(x, y, 1, x, y, darkDist);
                // Add three color stops
                gradient.addColorStop(0, this.fillStyle);
                let dark = "#000"; // Todo: calculate dark color
                gradient.addColorStop(1, dark);
                ctx.fillStyle = gradient;
                ctx.fillRect(layer[1], layer[2], layer[3], layer[4]);
                //ctx.fillStyle = '#ff0';
                //ctx.fillRect(x,y,3,3);
                ctx.fillStyle = this.fillStyle;
            }
        }
    }
}