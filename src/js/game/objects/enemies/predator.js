import SpritestackObject from "../spritestackobject.js";

export default class Predator extends SpritestackObject {
        constructor(scene, {x, y, stackdef}) {
            super(scene, {x, y, stackdef}); 
            this.type = "predator";
    
            this.speed = 0;
            this.predatorSpeed =50; // Speed of the predator
            
            this.terrainColliderWidth = 36;
            this.terrainColliderHeight = 18;
            this.bulletColliderWidth = 50;
            this.bulletColliderHeight = 30;


        }

        checkBulletCollision(bullet) {
            if(this.hitJumping) {
                return false; // Ignore bullet collision if already hit jumping
            }
            // Check if the bullet is within the predator's collider area
            if(this._bulletHit(bullet)) {
                this.hitJumping = true;
                this.hitJumpDx = Math.cos(bullet.rotation) * 100; // Calculate the hit jump dx based on bullet rotation
                this.hitJumpDy = Math.sin(bullet.rotation) * 100; // Calculate the hit jump dy based on bullet rotation
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
            if(this.hitJumping) {
                this.hitJumpingTime += deltaTime;
                this.x += this.hitJumpDx * deltaTime;
                this.y += this.hitJumpDy * deltaTime;
                if(this.hitJumpingTime > this.hitJumpDuration) {
                    this.hitJumping = false; // Reset hit jumping after 1 second
                    this.hitJumpingTime = 0;
                }
            } else {
                this.checkGrounded();
                if(this.grounded) {
                    let player = this.scene.getFirstObjectByType("player");
                    if(player) {
                        this.lookAt(player.x, player.y); // Look at the first player
                    } else {
                        this.lookAt(this.game.mousePos.x, this.game.mousePos.y);
                    }
                    let nextX = this.x + Math.cos(this.rotation) * this.predatorSpeed * deltaTime;
                    let nextY = this.y + Math.sin(this.rotation) * this.predatorSpeed * deltaTime;
                    if(this.checkPointTerrainCollision(nextX, nextY)) {
                        this.x = nextX;
                        this.y = nextY;
                    } else if(this.checkPointTerrainCollision(nextX, this.y)) {
                        this.x = nextX;
                    } else if(this.checkPointTerrainCollision(this.x, nextY)) {
                        this.y = nextY;
                    }
                } else {
                    this.handleFall(deltaTime);
                    if(this.fallingOffset > 1500) {
                        this.ttl = -1; 
                    }
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
                let hitJumpY = 0;
                if(this.hitJumping) {
                    hitJumpY = -Math.sin(Math.PI * (this.hitJumpingTime / this.hitJumpDuration)) * 30; // Calculate the hit jump Y offset based on time
                }
                this.renderSpriteBuffer(this.x, this.y + hitJumpY + this.fallingOffset, ctx); // Render the sprite buffer
            }

            if(!forceRender && this.game.debug) {
                ctx.strokeStyle = '#ff0';
                ctx.lineWidth = 2;
                ctx.strokeRect(this.x - this.bulletColliderWidth / 2, this.y - this.bulletColliderHeight / 2 + this.yDelta, this.bulletColliderWidth, this.bulletColliderHeight); // Draw the collider rectangle 
            }
        }
        
}