class MovableObject extends DrawableObject {

    speed = 0.15;
    otherDirection = false;
    currentImage = 0;
    speedY = 0;
    acceleration = 2.5;
    energy;
    lastHit = 0;

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround() { return this.y < 180; }

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
        this.speedY = 30;
    }



    drawFrameCollision(ctx) {
        if (this instanceof Character) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'red';
            ctx.rect(this.x , this.y, this.width, this.height)
            ctx.stroke();
        }
    }

    // character.isColliding(chicken)
    //character entspricht dann this. 
   

    isColliding(movableObject, corX, corY, corWidth, corHeight) {
        return this.x + corX + this.width - corWidth> 
        movableObject.x && this.y + corY + this.height - corHeight> 
        movableObject.y && this.x + corX <
        movableObject.x && this.y + corY <
        movableObject.y + movableObject.height
    }

 /*    (this.x + 20, this.y + 90, this.width - 55, this.height - 100) */

  

    hit() {
        this.energy -= 5;
        if (this.energy <= 0) { this.energy = 0 }
        else {
            this.lastHit = new Date().getTime(); // measures time since 1970 in ms
        }
    }

    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit; // difference in ms
        timePassed = timePassed / 1000; // difference in s
        return timePassed < 0.5;
    }

    isDead() {
        return this.energy == 0;
    }

}