import Predator from "./predator.js";
import stackDefZombie from "../spritestacks/zombie.js";
import EnemyBullet from "../bullets/enemybullet.js";

export default class Zombie extends Predator{
    constructor(scene, {x, y}) {
        super(scene, {x, y, stackdef: stackDefZombie}); 
        this.type = "zombie";
        this.fireRate = 3 + Math.random() * 2; // Rate of fire in seconds
        this.fireTimer = 0; // Timer for firing bullets
        this.bulletSpeed = 300;
        this.bulletTtl = 3; // Time to live for the bullet
    }

    updateAddon(deltaTime) {
        this.fireTimer += deltaTime;
        if (this.fireTimer >= this.fireRate) {
            this.fireTimer = 0; // Reset the timer
            let bullet = this.scene.addObject(new EnemyBullet(this.scene, {
                x: this.x, y: this.y-1, 
                r:this.rotation + Math.random() * 0.2 - 0.1, // Randomize the rotation slightly
            }));
            bullet.speed = this.bulletSpeed;
            bullet.ttl = this.bulletTtl; // Set the bullet's time to live
        }
    }


}