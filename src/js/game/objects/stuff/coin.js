import Particle from "../particles/particle.js";
import SpritestackObject from "../spritestackobject.js";
import stackDefCoin from "../spritestacks/coin.js";

export default class Coin extends SpritestackObject {
    constructor(scene, {x, y, nextLevel}) {
        super(scene, {x, y, stackdef: stackDefCoin}); 
        this.type = "coin";
        this.rotSped = Math.PI / 2; // Rotation speed
        this.nextLevel = nextLevel; // Next level to load

        this.noMorePredators = false; // Set the coin to be active
    }
    
    update(deltaTime) {
        super.update(deltaTime);

        this.noMorePredators = this.scene.getObjectsByTypes('fox', 'wolf', 'lynx', 'zombie').length === 0 ? true : false; // Check if there are no more predators in the scene
        if(this.noMorePredators) {
            let player = this.scene.getFirstObjectByType("player");
            this.rotation += this.rotSped * deltaTime; // Update rotation
            if(player) {
                if(player.checkPredatorHit(this)) { // Check for collision with player
                    this.ttl = 0; // Remove the coin from the scene
                    this.game.sfxPlayer.playAudio("coin");
                    for(let i = 0; i < 30; i++) {
                        this.scene.addObject(new Particle(this.scene, {
                                                x: this.x + Math.random() * 10 - 5, 
                                                y: this.y + Math.random()* 10 - 5, 
                                                color: '#ffff00', 
                                                alpha: 1,
                                                ttl: 2, 
                                                dx: Math.random() * 200 - 100, 
                                                dy: Math.random() * -200 - 100, 
                                                size: 12, dsize: -6, 
                                                gravity: 200,
                                                sortY: -100
                                            }));
                    }
                    if(this.nextLevel) {
                        let game = this.game; // Reference to the game instance
                        window.setTimeout(()=>game.switchToSceneName(this.nextLevel), 2000); // Switch to the next level
                    }
                }
            }
        }
    }

    render(ctx, forceRender = false) {
        if(this.noMorePredators || forceRender) {
            super.render(ctx, forceRender); // Call the parent class render method
        }
    }


}