class MovableObject extends DrawableObject {

    speed = 0.15;
    sprintSpeed = 1.5;
    otherDirection = false;
    currentImage = 0;
    currentImage2 = 0;
    speedY = 0;
    acceleration = 2.5;
    energy;
    lastHit = 0;
    lastMove = 0;
    death = false;
    returnToPosition = false;


    /**
     * The function enables the falling of obejects on the map like the character when it jumps or thrown bottles.
     * 
     */

    applyGravity(yPosition) {
        setStoppableInterval(() => {
            if (this.isAboveGround() || this.speedY > yPosition) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 60);
    }

    /**
     * The function checks if an object is in the air.
     * @returns 
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        }
        if(this instanceof Endboss) {
       
            return this.y < -30;
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



    moveToPosition(movableObject) {

        if (this.x >= movableObject.x - 800 && !this.returnToPosition) {
            this.moveLeft();
            this.otherDirection = false;
            if (this.x <= movableObject.x - 700) {
                this.returnToPosition = true;
            }
        }
        if (this.returnToPosition && this.x <= movableObject.x + 600) {
            this.moveRight();
            this.otherDirection = true;
            if (this.x >= movableObject.x + 500) {
                this.returnToPosition = false;
            }
        }
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
        this.speedY = 30;
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



    drawCollisionBox(ctx) {
        ctx.beginPath();
        ctx.lineWidth = '5';
        ctx.strokeStyle = 'red';
        ctx.rect(this.x - 400, this.y, this.width + 800, this.height + 20)
        ctx.stroke();
    }

    isInArea(movableObject) {
        return this.x + this.width > movableObject.x - 400
            && this.y + this.height > movableObject.y
            && this.x < movableObject.x - 400 + movableObject.width + 800
            && this.y < movableObject.y - 400 + movableObject.height + 200
    }

    isClose(movableObject) {
        return this.x + this.width > movableObject.x
            && this.y + this.height > movableObject.y
            && this.x < movableObject.x + movableObject.width
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

    isDead() {
        return this.energy == 0;
    }



}