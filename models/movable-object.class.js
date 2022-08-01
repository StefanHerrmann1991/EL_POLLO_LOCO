class MovableObject extends DrawableObject {

    speed = 0.15;
    otherDirection = false;
    currentImage = 0;
    speedY = 0;
    acceleration = 2.5;
    energy;
    lastHit = 0;

    /**
     * @property speedY
     * @property speedY
     */

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 60);
    }

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


    playAnimation(images) {
        let i = this.currentImage % images.length;
        // let i = 0 % (Modu) 6; => 1, Rest 0 (Modu ist mathematischer Rest)
        // 0 / 6 = 0 Rest 0; 1 / 6 = 0 Rest 1 (Rest, was übrig bleibt von der Zahl) 7 / 6 = 1 Rest 1 Modu hebt immer nur den Rest auf. Deswegen fängt er hier wieder bei 1 an
        // Modu zählt 0 ,1 ,2 ,3 ,4 ,5 ,0 ....
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    jump() {
        this.speedY = 10;
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

    isColliding(movableObject, characterCorX, characterCorY, corWidth, corHeight) {
        return this.x + characterCorX + this.width - corWidth > movableObject.x
            && this.y + characterCorY + this.height - corHeight > movableObject.y
            && this.x + characterCorX < movableObject.x + movableObject.width
            && this.y + characterCorY < movableObject.y + movableObject.height
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

    isDead() {
        return this.energy == 0;
    }

  

}