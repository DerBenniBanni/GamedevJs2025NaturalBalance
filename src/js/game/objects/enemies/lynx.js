import Predator from "./predator.js";
import stackDefLynx from "../spritestacks/lynx.js";

export default class Lynx extends Predator{
    constructor(scene, {x, y}) {
        super(scene, {x, y, stackdef: stackDefLynx}); 
        this.type = "lynx";
    }

}