class MovableObject extends DrawableObject {

    speed = 0.15;
    sprintSpeed = 1.5;
    otherDirection = false;
    currentImage = 0;
    speedY = 0;
    acceleration = 2.0;
    energy;
    lastHit = 0;
    lastMove = 0;

    /**
     * The function enables the falling of obejects on the map like the character when it jumps or thrown bottles.
     * 
     */

    applyGravity() {
        let gravityInterval = setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 60);

        allIntervals.push(gravityInterval);
    }

    /**
     * The function checks if an object is in the air.
     * @returns 
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        }
        else { return this.y < 180; }
    }

    /**loadImage('img/test.png')
     * The function loads images from the img folder 
     * @param path the relative path of the img
     * img is only defined in JS not in HTML*/




    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    sprintLeft() {
        this.x -= this.speed * this.sprintSpeed;
    }

    sprintRight() {
        this.x += this.speed * this.sprintSpeed;
    }



    /**The function increments through images. When the last image in an array is loaded it starts from the beginning. */

    playAnimation(images) {
        let i = this.currentImage % images.length;
        // let i = 0 % (Modu) 6; => 1, Rest 0 (Modu ist mathematischer Rest)
        // 0 / 6 = 0 Rest 0; 1 / 6 = 0 Rest 1 (Rest, was übrig bleibt von der Zahl) 7 / 6 = 1 Rest 1 Modu hebt immer nur den Rest auf. Deswegen fängt er hier wieder bei 1 an
        // Modu zählt 0 ,1 ,2 ,3 ,4 ,5 ,0 ....
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * @param {number} this.speedY represents the jumping height.
     */

    jump() {
        this.speedY = 1000;
    }


    /**
     * The function checks, if the Object is colliding with another object.
     * @param {*} movableObject 
     * @param {*} characterCorX 
     * @param {*} characterCorY 
     * @param {*} corWidth 
     * @param {*} corHeight 
     * @returns 
     */

    isColliding(movableObject) {
        return this.x + 20 + this.width - 55 > movableObject.x
            && this.y + 90 + this.height - 100 > movableObject.y
            && this.x + 20 < movableObject.x + movableObject.width
            && this.y + 90 < movableObject.y + movableObject.height
    }

    objectIsColliding(movableObject) {
        return this.x + this.width > movableObject.x
            && this.y + this.height > movableObject.y
            && this.x < movableObject.x + movableObject.width
            && this.y < movableObject.y + movableObject.height
    }

    objectIsColliding2(movableObject, movableObject2) {
        return movableObject.x + movableObject.width > movableObject2.x
            && movableObject.y + movableObject.height > movableObject2.y
            && movableObject.x < movableObject2.x + movableObject2.width
            && movableObject.y < movableObject2.y + movableObject2.height
    }

    checkArea(movableObject) {
        return this.x + this.width > movableObject.x
            && this.y + this.height > movableObject.y
            && this.x < movableObject.x + movableObject.width + 500
            && this.y < movableObject.y + movableObject.height
    }


    hit(energyLost) {
        this.energy -= energyLost;
        if (this.energy <= 0) { this.energy = 0 }
        else {
            this.lastHit = new Date().getTime(); // measures time since 1970 in ms
        }
    }

    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit; // difference in ms
        timePassed = timePassed / 1000; // difference in s
        return timePassed < 0.8;
    }

    isWaiting() {}

    isDead() {
        return this.energy == 0;
    }



}