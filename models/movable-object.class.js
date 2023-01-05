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
    collisionX = this.x;
    collisionY = this.y;
    collisionWidth = this.width;
    collisionHeight = this.height;
    volume = 1;
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
     * The function checks if an object is in the air depending of the object.
     * @returns 
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) return true
        if (this instanceof Endboss) return this.y < 50;      
        if (this instanceof smallChicken) return this.y < 370
        else return this.y < 180; 
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


    /**
     * The function is mainly an attacking pattern for the endboss.
     * @param {Object} movableObject - Any movable object on the map dispite the character.
     */

    moveToPosition(movableObject) {

        if (this.x >= movableObject.x - 800 && !this.returnToPosition) {
            this.moveLeft();
            this.otherDirection = false;
            if (this.x <= movableObject.x - 700) {
                this.returnToPosition = true;
            }
        }
        if (this.returnToPosition && this.x <= movableObject.x + 800) {
            this.moveRight();
            this.otherDirection = true;
            if (this.x >= movableObject.x + 700) {
                this.returnToPosition = false;
            }
        }
    }

    /**The function increments through images. When the last image in an array is loaded, it starts from the beginning. */

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
   * @param {number} speedY represents the jumping height.
   */

    jump() {
        this.speedY = 30;
    }



    /**
     * The function checks the collision of the character with it's surroundings.
     * @param {Object} movableObject - The colliding object like enemies or bottles in the world.
     * @returns true if a collision is detected.
     */

    isColliding(movableObject) {
        if (this.world.keyboard.DODGE) {
                return this.x + 20 + this.width - 55 > movableObject.x
                && this.y + 190 + this.height - 200 > movableObject.y
                && this.x + 20 < movableObject.x + movableObject.width
                && this.y + 190 < movableObject.y + movableObject.height
        }
        else {           
            return this.x + 20 + this.width - 55 > movableObject.x
                && this.y + 90 + this.height - 100 > movableObject.y
                && this.x + 20 < movableObject.x + movableObject.width
                && this.y + 90 < movableObject.y + movableObject.height
        }

    }

/**
 * The function checks the collision of an object dispite the character with it's surroundings.
 * @param {*} movableObject - The colliding object like enemies or bottles in the world.
 * @returns true if two different objects are colliding.
 */

    objectIsColliding(movableObject) {
        return this.x + this.width > movableObject.x
            && this.y + this.height > movableObject.y
            && this.x < movableObject.x + movableObject.width
            && this.y < movableObject.y + movableObject.height
    }


    /**
     * The function checks the collision of the character with the endboss.
     * @param {object} movableObject - The colliding object like enemies or bottles in the world.
     * @returns true if a collision is detected.
     */


    isCollidingEndboss(movableObject) {
        
        if (this.world.keyboard.DODGE) {
            return this.x + 20 + this.width - 55 > movableObject.x + 40
                && this.y + 190 + this.height - 200 > movableObject.y + 110
                && this.x + 20 < movableObject.x + 40 + movableObject.width - 40
                && this.y + 190 < movableObject.y + 110 + movableObject.height - 180
        }
        else {           
            return this.x + 20 + this.width - 55 > movableObject.x + 40
                && this.y + 120 + this.height - 130 > movableObject.y + 110
                && this.x + 20 < movableObject.x + 40 + movableObject.width - 40
                && this.y + 120 < movableObject.y + 110 + movableObject.height - 180
        }
    }


    /**
     * The functon is used by enemies to determine wether the player is in the area or not.
     * @param {Object} movableObject The player
     * @returns true if the player is in the area.
     */


    isInArea(movableObject) {
        return this.x + this.width > movableObject.x - 400
            && this.y + this.height > movableObject.y
            && this.x < movableObject.x - 400 + movableObject.width + 800
            && this.y < movableObject.y - 400 + movableObject.height + 200
    }

   /**
     * The functon is used by enemies to determine wether the player is very close to an enemy or not.
     * @param {Object} movableObject The player
     * @returns true if the player is really close to the enemy.
     */


    isClose(movableObject) {
        return this.x + this.width + 70 > movableObject.x
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

/**
 * The function uses a JSON in the following format:
 * CHICKEN_SOUND = {
        'audios': [],
        'soundIsPlayedOnce': false,
        'timeoutId' : '', 
        'randomSound' : '',
    }    
 * The audios in the first Line will be played once and will be attached randomly to 
 * an object. If only one audio is in the array it will be played.   
 * @param {JSON} mp3JSON The name of the audio file.
 * @param {Number} mp3JSON.randomSound is the random sound number which will be played.
 * @param {Number} soundDuration is the length in seconds of the mp3 file.
 * @param {Number} timeoutId is the id of the timeout which can later be cleared. 
 *
*/

playAudioOnce(mp3JSON, soundVolume) {

    if (!mp3JSON.soundIsPlayedOnce) {
       
            mp3JSON.randomSound = (Math.floor(Math.random() * mp3JSON.audios.length));
            let randomSoundPosition = mp3JSON.randomSound
            let soundDuration = mp3JSON.audios[randomSoundPosition].duration;
            mp3JSON.soundIsPlayedOnce = true;
            mp3JSON.audios[randomSoundPosition].volume = soundVolume;
            mp3JSON.audios[randomSoundPosition].play();
            let timeoutId = setTimeout(() => {
                mp3JSON.audios[randomSoundPosition].pause();
            }, 1000 * soundDuration);
            allTimeouts.push(timeoutId);
            mp3JSON['timeoutId'] = timeoutId;
    }
}
}