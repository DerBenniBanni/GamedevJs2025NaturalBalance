import Predator from "./predator.js";
import stackDefZombie from "../spritestacks/zombie.js";

export default class Zombie extends Predator{
    constructor(scene, {x, y}) {
        super(scene, {x, y, stackdef: stackDefZombie}); 
        this.type = "zombie";
    }

}