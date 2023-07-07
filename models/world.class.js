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
    endbossDeath = false;
    backgroundMusic = new Audio('');


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
        if (this.gameWasLost()) this.showEndscreenLost();
    }

    gameWasLost() { return this.character.isDead() && !this.endscreenOn }

    showEndscreenLost() {
        this.endscreenOn = true;
        setTimeout(() => {
            let characterPosition = -1 * (this.character.camera_position_storage);
            let end = new Endscreen(characterPosition, this.character.y, 'lost');
            this.endscreen.push(end);
            stopGame();
            stopAllTimeouts();
        }, 5000);
    }


    checkBottleCount() {
        if (!this.character.isDead() && !this.endbossDeath) {
            document.getElementById('bottleCounter').innerHTML = `
                <img class="bottle-stat" src="img/7.Marcadores/Icono/Botella.png"> 
                <div>= ${this.bottleCount}<div>`
        }
        else setTimeout(() => { document.getElementById('bottleCounter').innerHTML = ""; }, 2000);
    }

    checkCoinCount() {
        if (!this.character.isDead() && !this.endbossDeath) {
            document.getElementById('coinCounter').innerHTML = `
                <img class="bottle-stat" src="img/7.Marcadores/Icono/Monedas.png"> 
                <div>= ${this.coinCount}<div>`
        } else { setTimeout(() => { document.getElementById('coinCounter').innerHTML = ""; }, 2000); }
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isClose(enemy) && !(enemy instanceof Endboss)) { enemy.sawCharacter = true; }
            this.characterGotDamage(enemy, 5);
            this.jumpKill(enemy);
            this.repellChicken(enemy);
            this.throwBottleOn(enemy);
            this.startEndbossFight(enemy);
        });
        this.pickUpBottle();
        this.pickUpCoin();
    }


    repellChicken(enemy) {
        if (this.character.isAboveGround() && enemy.isAboveGround() && enemy instanceof smallChicken) {
            enemy.isStunned = true;
            enemy.x = enemy.x + 10
            enemy.speed = 0
            enemy.defaultSpeed = 0
        }
    }

    startEndbossFight(enemy) {
        if (!enemy.isDead() && enemy instanceof Endboss) {
            this.endbossFirstEncounter(enemy)
            if (!enemy.hadFirstContact && this.endbossActive && !enemy.isHurt()) {
                this.endbossIsWalking(enemy);
                this.endbossIsAttacking(enemy);
                this.charHitByEndboss(enemy, 15);
            }
        }
        if (this.endbossWasDefeated(enemy))
            this.showEndcreenWon();
    }

    endbossIsWalking(enemy) {
        enemy.walking = true;
        enemy.attack = false;
        enemy.moveToPosition(this.character);
    }

    endbossIsAttacking(enemy) {
        if (this.character.isClose(enemy)) {
            enemy.walking = false;
            enemy.attack = true;
            enemy.moveToPosition(this.character);
        }
    }


    endbossFirstEncounter(enemy) {
        if (this.character.isInArea(enemy) && !this.endbossActive) {
            enemy.hadFirstContact = true;
            this.endbossActive = true;
        }
    }


    jumpKill(enemy) {
        if (this.isKillableByJumping(enemy) && !(enemy instanceof smallChicken && enemy.isAboveGround())) {
            this.removeThis(enemy);
            this.character.speedY = 3;
        }
    }


    throwBottleOn(enemy) {
        this.throwableObject.forEach((thrownObject, bottle) => {
            if (this.bottleHit(enemy, bottle)) {
                this.slowDown(thrownObject);
                setTimeout(() => {
                    this.throwableObject.splice(bottle, 1);
                }, 200);
                enemy.hit(100);
                if (enemy instanceof Endboss) {
                    this.statusbarEndboss.setPercentage(enemy.energy);
                }
                if (!(enemy instanceof Endboss) && enemy.isDead()) {
                    this.removeThis(enemy)
                }
            }
        })
    }

    slowDown(thrownObject) {
        thrownObject.collision = true;
        thrownObject.speedX = 0;
        thrownObject.speedY = 0;
        thrownObject.acceleration = 0;
    }

    characterGotDamage(enemy, damage) {
        if (this.characterGotHitBy(enemy, 5)) {
            this.character.hit(damage);
            this.statusbar.setPercentage(this.character.energy);
        }
    }



    charHitByEndboss(enemy, damage) {
        if (this.character.isCollidingEndboss(enemy) && !this.character.isHurt() && enemy instanceof Endboss) {
            this.character.hit(damage);
            this.statusbar.setPercentage(this.character.energy);
        }
    }


    pickUpBottle() {
        this.level.bottles.forEach((bottle, i) => {
            if (this.canTake(bottle)) {
                this.level.bottles.splice(i, 1);
                this.bottleCount++;
            }
        });
    }

    pickUpCoin() {
        this.level.coins.forEach((coin, i) => {
            if (this.canTake(coin)) {
                coin.playAudioOnce(coin.COIN_SOUND, 0.5);
                this.level.coins.splice(i, 1);
                this.statusbar.percentage += 1;
                this.character.energy += 1;
                this.coinCount++;
            }
        });
    }


    removeThis(enemy) {
        enemy.energy = 0;
        setTimeout(() => {
            let index = this.level.enemies.indexOf(enemy)
            this.level.enemies.splice(index, 1);
        }, 1000);
    }

    throwObject() {
        if (this.canThrow()) {
            let timePassed = new Date().getTime() - this.lastThrow;
            if (timePassed > 1000) {
                this.bottleCount--;
                let thrownBottle = new ThrowableObject(this.character.x, this.character.y, this.character.otherDirection);
                this.throwableObject.push(thrownBottle);
                this.lastThrow = new Date().getTime();
            }
        }
    }

    showEndcreenWon() {
        this.endscreenOn = true;
        this.endbossDeath = true;
        setTimeout(() => {
            let characterPosition = -1 * (this.character.camera_position_storage);
            let end = new Endscreen(characterPosition, this.character.y, 'won');
            this.endscreen.push(end);
            this.endscreen[0].won = true;
            stopGame();
            stopAllTimeouts();
        }, 5000);
    }



    endbossWasDefeated(enemy) { return enemy.isDead() && enemy instanceof Endboss && !this.endscreenOn }
    canThrow() { return this.keyboard.THROW && !this.character.isDead() && this.bottleCount > 0 }
    bottleHit(enemy, bottle) { return this.throwableObject[bottle].objectIsColliding(enemy) && !enemy.isHurt() && !enemy.isDead() && !this.character.isHurt() }
    canTake(loot) { return this.character.isColliding(loot) }
    characterGotHitBy(enemy) { return !(enemy instanceof Endboss) && this.character.isColliding(enemy) && !this.character.isAboveGround() && !enemy.isDead() && !this.character.isHurt(); }
    isKillableByJumping(enemy) { return !(enemy instanceof Endboss) && this.character.isAboveGround() && this.character.speedY < 0 && this.character.isColliding(enemy) && !enemy.isDead() }



    /* The funcion draws the canvas of the world including all object instances. */

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgrounds);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.throwableObject);
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusbar);
        this.addToMap(this.statusbarEndboss);
        this.ctx.translate(this.camera_x, 0);
        this.addToMap(this.character);
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

    /* Adds more than one object instances to the map*/

    addObjectsToMap(objects) {
        objects.forEach(o => { this.addToMap(o); });
    }
    /* Adds one object instances to the map*/

    addToMap(movableObject) {
        if (movableObject.otherDirection) {
            this.flipImage(movableObject)
        }
        movableObject.draw(this.ctx);
        /*  movableObject.drawFrame(this.ctx);   */
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
