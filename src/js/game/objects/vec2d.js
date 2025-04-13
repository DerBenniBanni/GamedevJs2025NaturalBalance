export default class Vec2d{
    constructor(x,y) {
        this.x = x;
        this.y = y;
    }

    clone() {
        return new Vec2d(this.x, this.y); // Return a new Vec2d object with the same coordinates
    }
    add(vec) {
        return new Vec2d(this.x + vec.x, this.y + vec.y); // Add another Vec2d object to this one
    }
    subtract(vec) {
        return new Vec2d(this.x - vec.x, this.y - vec.y); // Subtract another Vec2d object from this one
    }
    multiply(scalar) {
        return new Vec2d(this.x * scalar, this.y * scalar); // Multiply this Vec2d object by a scalar
    }
    divide(scalar) {
        return new Vec2d(this.x / scalar, this.y / scalar); // Divide this Vec2d object by a scalar
    }
    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y); // Calculate the length of this Vec2d object
    }
    normalize() {
        const length = this.length(); // Get the length of this Vec2d object
        if (length === 0) {
            return new Vec2d(0, 0); // Return a zero vector if the length is zero
        }
        return new Vec2d(this.x / length, this.y / length); // Normalize this Vec2d object
    }
    dot(vec) {
        return this.x * vec.x + this.y * vec.y; // Calculate the dot product with another Vec2d object
    }
    cross(vec) {
        return this.x * vec.y - this.y * vec.x; // Calculate the cross product with another Vec2d object
    }
    distance(vec) {
        return Math.sqrt((this.x - vec.x) * (this.x - vec.x) + (this.y - vec.y) * (this.y - vec.y)); // Calculate the distance to another Vec2d object
    }
    distanceSquared(vec) {
        return (this.x - vec.x) * (this.x - vec.x) + (this.y - vec.y) * (this.y - vec.y); // Calculate the squared distance to another Vec2d object
    }
    angle(vec) {
        const dotProduct = this.dot(vec); // Calculate the dot product with another Vec2d object
        const lengths = this.length() * vec.length(); // Calculate the product of the lengths of both Vec2d objects
        return Math.acos(dotProduct / lengths); // Calculate the angle between this Vec2d object and another Vec2d object
    }
    angleDeg(vec) {
        return this.angle(vec) * (180 / Math.PI); // Calculate the angle in degrees between this Vec2d object and another Vec2d object
    }
    angleRad(vec) {
        return this.angle(vec); // Calculate the angle in radians between this Vec2d object and another Vec2d object
    }
    toArray() {
        return [this.x, this.y]; // Return an array representation of this Vec2d object
    }
    fromArray(arr) {
        this.x = arr[0]; // Set the x coordinate from an array
        this.y = arr[1]; // Set the y coordinate from an array
        return this; // Return this Vec2d object
    }
}