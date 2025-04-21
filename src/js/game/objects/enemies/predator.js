import SpritestackObject from "../spritestackobject.js";

export default class Predator extends SpritestackObject {
        constructor(scene, {x, y, stackdef}) {
            super(scene, {x, y, stackdef}); 
            this.type = "predator";
    
            this.speed = 2;
            
            this.terrainColliderWidth = 36;
            this.terrainColliderHeight = 18;
            this.bulletColliderWidth = 50;
            this.bulletColliderHeight = 30;
        }

        checkBulletCollision(bullet) {
            // Check if the bullet is within the predator's collider area
            if(this._bulletHit(bullet)) {
                // Todo: change to impulse...
                this.x += Math.cos(bullet.rotation) * 10;
                this.y += Math.sin(bullet.rotation) * 10;
                return true; // Bullet hit the predator
            }
            return false; // Bullet did not hit the predator
        }

        _bulletHit(bullet) {
            return this.x - this.bulletColliderWidth / 2 < bullet.x &&
                   this.x + this.bulletColliderWidth / 2 > bullet.x &&
                   this.y - this.bulletColliderHeight / 2 < bullet.y &&
                   this.y + this.bulletColliderHeight / 2 > bullet.y
        }
        
        update(deltaTime) {
            super.update(deltaTime);
            this.checkGrounded();
            if(this.grounded) {
                let player = this.scene.getFirstObjectByType("player");
                if(player) {
                    this.lookAt(player.x, player.y); // Look at the first player
                } else {
                    this.lookAt(this.game.mousePos.x, this.game.mousePos.y);
                }
                this.x += Math.cos(this.rotation) * this.speed * deltaTime;
                this.y += Math.sin(this.rotation) * this.speed * deltaTime;
                
            } else {
                this.handleFall(deltaTime);
                if(this.fallingOffset > 1500) {
                    this.ttl = -1; 
                }
            }
        }
    
        
        render(ctx, forceRender = false) {
            if(this.fallen && !forceRender) {
                return; // Do not render if the object is marked as fallen
            }
            if(forceRender) {
                super.render(ctx, forceRender);
            } else {
                this.renderer.render(ctx, this.x, this.y + this.fallingOffset, this.rotation);
            }

            if(!forceRender && this.game.debug) {
                ctx.strokeStyle = '#ff0';
                ctx.lineWidth = 2;
                ctx.strokeRect(this.x - this.bulletColliderWidth / 2, this.y - this.bulletColliderHeight / 2 + this.yDelta, this.bulletColliderWidth, this.bulletColliderHeight); // Draw the collider rectangle 
            }
        }
        
}