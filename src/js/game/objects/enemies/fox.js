import Predator from "./predator.js";
import stackDefFox from "../spritestacks/fox.js";

export default class Fox extends Predator {
    constructor(scene, {x, y}) {
        super(scene, {x, y, stackdef: stackDefFox}); 
        this.type = "fox";
    }
    
    
}