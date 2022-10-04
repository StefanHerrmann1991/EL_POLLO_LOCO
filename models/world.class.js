class World {

    character = new Character();
    statusbar = new Statusbar();
    statusbarEndboss = new StatusbarEndboss();
    endscreen = [];
    endscreenOn = false;
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    bottleCount = 0;
    coinCount = 0;
    throwableObject = [];
    lastThrow = 0;
    endbossActive = false;
    cameraOffsetX = 0;



    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.start();
        this.checkWorld();
    }


    start() {
        this.character.animate();
        this.level.enemies.forEach(enemy => enemy.animate());
        this.level.clouds.forEach(cloud => cloud.animate(this.level.level_end_x));
        this.level.coins.forEach(coin => coin.animate())
    }


    setWorld() {
        this.character.world = this;
    }

    checkWorld() {
        setStoppableInterval(() => {
            this.checkCollisions();
            this.throwObject();
            this.checkDeath();
            this.checkBottleCount();
            this.checkCoinCount();
        }, 1000 / 60);
    }


    checkDeath() {
        if (this.gameWasLost())
            this.showEndScreen();
    }

    gameWasLost() { return this.character.isDead() && !this.endscreenOn }
    showEndScreen() {
        this.endscreenOn = true;
        setTimeout(() => {
            let end = new Endscreen(this.character.x, this.character.y, 'lost');
            this.endscreen.push(end);
            stopGame();
        }, 3000);
    }


    checkBottleCount() {
        if (!this.character.isDead()) {
            document.getElementById('bottleCounter').innerHTML = `
                <img class="bottle-stat" src="img/7.Marcadores/Icono/Botella.png"> 
                <div>= ${this.bottleCount}<div>`
        }
        else { setTimeout(() => { document.getElementById('bottleCounter').innerHTML = ""; }, 2000); }
    }

    checkCoinCount() {
        if (!this.character.isDead()) {
            document.getElementById('coinCounter').innerHTML = `
                <img class="bottle-stat" src="img/7.Marcadores/Icono/Monedas.png"> 
                <div>= ${this.coinCount}<div>`

        } else { setTimeout(() => { document.getElementById('coinCounter').innerHTML = ""; }, 2000); }

    }


    checkCollisions() {

        this.level.enemies.forEach((enemy) => {
            if (this.characterGotHitBy(enemy)) {
                this.character.hit(5);
                this.statusbar.setPercentage(this.character.energy);
            }


            if (this.jumpKill(enemy)) {
                this.removeAn(enemy);           
                this.character.speedY = 3; 
            }

            if (!enemy.isDead() && enemy instanceof Endboss) {
                if (this.character.isInArea(enemy) && !this.endbossActive) {
                    enemy.hadFirstContact = true;
                    this.endbossActive = true;
                }
                if (!enemy.hadFirstContact && this.endbossActive && !enemy.isHurt()) {
                    enemy.walking = true;
                    enemy.attack = false;
                    enemy.moveToPosition(this.character);
                    if (this.character.isClose(enemy)) {
                        enemy.walking = false;
                        enemy.attack = true;                       
                        enemy.moveToPosition(this.character);
                    }
                    
                    if (this.character.isCollidingEndboss(enemy instanceof Endboss)) {
                        this.character.hit(20);
                    }
                }
            }

            if (enemy.isDead() && enemy instanceof Endboss && !this.endscreenOn) {
                this.endscreenOn = true;
                setTimeout(() => {
                    let end = new Endscreen(this.character.x, this.character.y, 'won');
                    this.endscreen.push(end);
                    this.endscreen[0].won = true;                   
                    stopGame();
                }, 3000);
            }



            this.throwableObject.forEach((thrownObject, bottle) => {
                if (this.bottleHit(enemy, bottle)) {
                    thrownObject.collision = true;
                    thrownObject.speedX = 0;
                    thrownObject.speedY = 0;
                    thrownObject.acceleration = 0;
                    setTimeout(() => {
                        this.throwableObject.splice(bottle, 1);
                    }, 100);
                    enemy.hit(100);
                    if (enemy instanceof Endboss) {
                        this.statusbarEndboss.setPercentage(enemy.energy);
                    }
                    if (!(enemy instanceof Endboss) && enemy.isDead()) {
                        setTimeout(() => {
                            let index = this.level.enemies.indexOf(enemy)
                            this.level.enemies.splice(index, 1);
                        }, 1000);
                    }
                }
            })
        });
        this.level.bottles.forEach((bottle, i) => {
            if (this.canTake(bottle)) {
                this.level.bottles.splice(i, 1);
                this.bottleCount++;
            }
        });
        this.level.coins.forEach((coin, i) => {
            if (this.canTake(coin)) {
                this.level.coins.splice(i, 1);
                this.statusbar.percentage += 1;
                this.character.energy += 1;
                this.coinCount++;
            }
        });
    }


    removeAn(enemy) {
        enemy.energy = 0;
        setTimeout(() => {
            let index = this.level.enemies.indexOf(enemy)
            this.level.enemies.splice(index, 1);
        }, 1000);
    }

    throwObject() {
        if (this.canThrow()) {
            let timePassed = new Date().getTime() - this.lastThrow;
            if (timePassed > 500) {
                this.bottleCount--;
                let thrownBottle = new ThrowableObject(this.character.x, this.character.y, this.character.otherDirection);
                this.throwableObject.push(thrownBottle);
                this.lastThrow = new Date().getTime();
            }
        }
    }


    canThrow() { return this.keyboard.THROW && !this.character.isDead() && this.bottleCount > 0 }
    bottleHit(enemy, bottle) { return this.throwableObject[bottle].objectIsColliding(enemy) && !enemy.isHurt() && !enemy.isDead() && !this.character.isHurt() }
    canTake(loot) { return this.character.isColliding(loot) }
    characterGotHitBy(enemy) { return this.character.isColliding(enemy) && !this.character.isAboveGround() && !enemy.isDead() && !this.character.isHurt(); }
    jumpKill(enemy) { return !(enemy instanceof Endboss) && this.character.isAboveGround() && this.character.speedY < 0 && this.character.isColliding(enemy) && !enemy.isDead() }


    /**
     * Check if camera target is inside Boundaries to allow camera movement
     * @param {number} leftBoundary - minium distance for target to achieve for camera to move.
     * @param {number} rightBoundary - maximum distance for target to achieve for camera to move.
     * @param {number} distanceFromCamera - how far is the camera's offset from target
     * @returns {boolean}
     */
    canMoveCamera(leftBoundary, rightBoundary, distanceFromCamera) {
        return distanceFromCamera > leftBoundary &&
            distanceFromCamera < rightBoundary;
    }




    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgrounds);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.throwableObject);
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusbar);
        this.addToMap(this.statusbarEndboss);
        this.ctx.translate(this.camera_x, 0);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusbar);
        this.addToMap(this.statusbarEndboss);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.endscreen);
        this.ctx.translate(-this.camera_x, 0);
        let self = this;
        requestAnimationFrame(function () { self.draw() });
    }

    /* adds more than one object to the map*/

    addObjectsToMap(objects) {
        objects.forEach(o => { this.addToMap(o); });
    }
    /* adds one object to the map*/

    addToMap(movableObject) {
        if (movableObject.otherDirection) {
            this.flipImage(movableObject)
        }
        movableObject.draw(this.ctx);
        /*  movableObject.drawFrame(this.ctx);  */
        if (movableObject.otherDirection) {
            this.flipImageBack(movableObject);
        }
    }

    flipImage(movableObject) {
        this.ctx.save();
        this.ctx.translate(movableObject.width, 0);
        this.ctx.scale(-1, 1);
        movableObject.x = movableObject.x * -1;
    }
    flipImageBack(movableObject) {
        movableObject.x = movableObject.x * -1;
        this.ctx.restore();
    }
}
