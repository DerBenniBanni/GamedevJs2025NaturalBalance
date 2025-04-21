import Predator from "./predator.js";
import stackDefWolf from "../spritestacks/wolf.js";

export default class Wolf extends Predator{
    constructor(scene, {x, y}) {
        super(scene, {x, y, stackdef: stackDefWolf}); 
        this.type = "wolf";
    }

}