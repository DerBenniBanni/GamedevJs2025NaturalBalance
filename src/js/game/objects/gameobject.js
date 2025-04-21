import Particle from "./particles/particle.js";

export default class GameObject {  

    constructor(scene, {x, y}) {
        this.type = "gameobject";
        this.scene = scene; // Reference to the scene instance
        this.game = scene.game; // Reference to the game instance
        this.x = x; // X position of the game object
        this.y = y; // Y position of the game object
        this.ttl = Infinity; // Time to live for the object
        this.colliderType = "none"; // Type of collider for the object
        
        this.rotation = 0; // Rotation of the object in radians
        this.speed = 0; // Change in position
        this.dRot = 0; // Change in rotation
        this.yDelta = 0; // Y delta for the object
        this.sortY = 0; // Y delta for the sorting

        this.fallen = false; // Flag to indicate if the object has fallen
        this.grounded = true; // Flag to check if the player is grounded
        this.fallingOffset = 0; // Offset for falling animation
        this.fallingSpeed = 0; // Speed of falling animation

        this.ripplesCreated = false;
    }

    getSortY()  {
        return this.y - this.sortY; // Return the Y position for sorting
    }

    checkGrounded() {
        this.grounded = this.scene.getObjectsByTypes('terrain')
            .some((terrain) => this.checkTerrainCollision(terrain));
    }

    checkTerrainCollision(terrain) {
        // Check for collision with terrain using rectangle collision detection
        return this.x + this.terrainColliderWidth / 2 > terrain.x - terrain.colliderWidth / 2 &&
               this.x - this.terrainColliderWidth / 2 < terrain.x + terrain.colliderWidth / 2 &&
               this.y + this.terrainColliderHeight / 2 > terrain.y - terrain.colliderHeight / 2 &&
               this.y - this.terrainColliderHeight / 2 < terrain.y + terrain.colliderHeight / 2;
    }

    checkPointTerrainCollision(x, y) {
        // Check for collision with terrain using rectangle collision detection
        return this.scene.getObjectsByTypes('terrain')
            .some((terrain) => x + 2 > terrain.x - terrain.colliderWidth / 2 &&
                x - 2 / 2 < terrain.x + terrain.colliderWidth / 2 &&
                y + 2 / 2 > terrain.y - terrain.colliderHeight / 2 &&
                y - 2 / 2 < terrain.y + terrain.colliderHeight / 2);
    }


    handleFall(deltaTime) {
        this.sortY=15;
            if(this.fallingSpeed == 0) {
                this.fallingSpeed = 100;
            }
            this.fallingSpeed += 300 * deltaTime; // Increment falling speed if not grounded
            this.fallingOffset += this.fallingSpeed * deltaTime; // Increment falling offset if not grounded
            if(this.fallingOffset > 80) {
                this.fallen = true; // Mark the object as fallen
                if(this.fallingOffset < 200) {
                    this.scene.addObject(new Particle(this.scene, {
                        x: this.x + Math.random() * 40 - 20, 
                        y: this.y + Math.random()* 30 - 15, 
                        color: '#aaf5', 
                        ttl: 2, 
                        dx: Math.random() * 200 - 100, 
                        dy: Math.random() * 100 - 300, 
                        size: 15, dsize: -4, 
                        gravity: 300,
                        sortY: 15
                    })); // Add a particle effect when falling
                }
                if(!this.ripplesCreated) {
                    this.ripplesCreated= true;
                    for(let i = 20; i < 100; i+=20) {
                        this.scene.addObject(new Particle(this.scene, {
                            particle: "ripple",
                            x: this.x, 
                            y: this.y + this.fallingOffset / 2, 
                            color: '#aaf3', 
                            ttl: 3, 
                            dx: 0, 
                            dy: 0, 
                            size: 3, dsize: i, 
                            gravity: 0,
                            sortY: 1000
                        })); // Add a particle effect when falling
                    }
                }
            }
    }

    update(deltaTime) {
        this.ttl -= deltaTime; // Decrease time to live
        if(this.speed != 0) {
            this.x += Math.cos(this.rotation) * this.speed * deltaTime; // Update x position based on speed and rotation
            this.y += Math.sin(this.rotation) * this.speed * deltaTime; // Update y position based on speed and rotation
        }
        if(this.dRot != 0) {
            this.rotation += this.dRot * deltaTime; // Update rotation based on change in rotation
        }
    }

    render(ctx) {
        // Render logic for the game object can be implemented here
    }

    renderShadow(radius, ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.scale(1, 0.5);
        ctx.fillStyle = '#0002';
        ctx.beginPath();
        ctx.arc(0, 0, radius * 1.2, 0, Math.PI * 2);
        ctx.arc(0, 0, radius * 1.1, 0, Math.PI * 2);
        ctx.arc(0, 0, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
        ctx.restore();}

    lookAt(x, y) {
        // Calculate the angle to look at the specified coordinates
        this.rotation = Math.atan2(y - this.y, x - this.x);
    }
}