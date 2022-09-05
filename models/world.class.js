class World {

    character = new Character();
    statusbar = new Statusbar();
    endscreen = [];
    level = level1;
    endboss = this.level.enemies.endboss;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    bottleCount = 0;
    coinCount = 0;
    throwableObject = [];
    lastThrow = 0;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkWorld();
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
        if (this.character.isDead()) {
            setTimeout(() => {
                let end = new Endscreen(this.character.x, this.character.y);
                this.endscreen.push(end);
            }, 2000);
        }
    }
    checkEndbossDeath() {
        if (this.endboss.isDead()) {
            setTimeout(() => {
                let end = new Endscreen(this.character.x, this.character.y);
                this.endscreen.push(end);
            }, 2000);
        }
    }

    checkBottleCount() {
        if (!this.character.isDead()) {
            document.getElementById('bottleCounter').innerHTML = `
                <img class="bottle-stat" src="img/7.Marcadores/Icono/Botella.png"> 
                <div>= ${this.bottleCount}<div>`

        } else { setTimeout(() => { document.getElementById('bottleCounter').innerHTML = ""; }, 2000); }

    }

    checkCoinCount() {
        if (!this.character.isDead()) {
            document.getElementById('coinCounter').innerHTML = `
                <img class="bottle-stat" src="img/7.Marcadores/Icono/Monedas.png"> 
                <div>= ${this.coinCount}<div>`

        } else { setTimeout(() => { document.getElementById('coinCounter').innerHTML = ""; }, 2000); }

    }

    checkCharEntering() {
        console.log("enboss sees character");
    }

    checkCollisions() {

        this.level.enemies.forEach((enemy) => {
            if (this.charGotHitBy(enemy)) {
                this.character.hit(5);
                this.statusbar.setPercentage(this.character.energy);
                console.log(this.character);
            }
            if (!(enemy instanceof Endboss) && this.jumpKill(enemy)) {
                enemy.energy = 0;
                setTimeout(() => {
                    let index = this.level.enemies.indexOf(enemy)
                    this.level.enemies.splice(index, 1);
                }, 1000);
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
            if (this.take(bottle)) {
                this.level.bottles.splice(i, 1);
                this.bottleCount++;

            }
        });
        this.level.coins.forEach((coin, i) => {
            if (this.take(coin)) {
                this.level.coins.splice(i, 1);
                this.coinCount++;
            }
        });
    }


    bottleHit(enemy, bottle) { return this.throwableObject[bottle].objectIsColliding(enemy) && !enemy.isHurt() && !enemy.isDead() && !this.character.isHurt() }
    take(loot) { return this.character.isColliding(loot) }
    charGotHitBy(enemy) { return this.character.isColliding(enemy) && !this.character.isAboveGround() && !enemy.isDead() && !this.character.isHurt(); }
    jumpKill(enemy) { return this.character.isAboveGround() && this.character.isColliding(enemy) && !enemy.isDead() }


    throwObject() {
        if (this.keyboard.THROW && this.bottleCount > 0) {
            let timePassed = new Date().getTime() - this.lastThrow;
            if (timePassed > 500) {
                this.bottleCount--;
                let thrownBottle = new ThrowableObject(this.character.x, this.character.y, this.character.otherDirection);
                this.throwableObject.push(thrownBottle);
                this.lastThrow = new Date().getTime();
            }
        }
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
        this.ctx.translate(this.camera_x, 0);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.endscreen);
        this.ctx.translate(-this.camera_x, 0);
        /* draw wird immer wieder aufgerufen */
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
        movableObject.drawFrame(this.ctx);
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
