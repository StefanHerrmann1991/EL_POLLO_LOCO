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
    throwableObject = [];
    lastThrow = 0;
    IMAGES_GAME_OVER = ['img/9.Intro _ Outro Image/_Game over_ screen/1.you lost.png'];

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
        setInterval(() => {
            this.checkCollisions();
            this.throwObject();
            this.checkBottleCount();
            this.checkDeath();
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

    checkBottleCount() {

        if (!this.character.isDead()) {

            document.getElementById('bottleCounter').innerHTML = `
                <img class="bottle-stat" src="img/0.Own_Pictures/bottleThrowing/bottle_throwing6.png"> 
                <div>= ${this.bottleCount}<div>`

        } else { setTimeout(() => { document.getElementById('bottleCounter').innerHTML = ""; }, 2000); }

    }

    checkCollisions() {

        this.level.enemies.forEach((enemy, i) => {
            if (this.charGotHitBy(enemy)) {
                this.character.hit(5);
                this.statusbar.setPercentage(this.character.energy);
            }
            if (this.jumpKill(enemy)) {
                enemy.energy = 0;
                setTimeout(() => {
                    this.level.enemies.splice(i, 1);
                }, 2000);
            }
            if (this.bottleHit(enemy)) {
                
                this.throwableObject.forEach((thrownBottle, i) => {
                    enemy.energy -= 100;
                    console.log(thrownBottle);
                    world.throwableObject[i].playAnimation(thrownBottle.IMAGES_BOTTLE_EXPLODING);
                   /*  this.world.throwableObject.splice(i, 1); */
                })

            }
        });
        this.level.bottles.forEach((bottle, i) => {
            if (this.take(bottle)) {
                this.level.bottles.splice(i, 1);
                this.bottleCount++;
            }
        });
    }

    take(bottle) { return this.character.isColliding(bottle) }
    charGotHitBy(enemy) { return this.character.isColliding(enemy) && !this.character.isAboveGround() && !enemy.isDead() && !this.character.isHurt(); }
    jumpKill(enemy) { return this.character.isAboveGround() && this.character.isColliding(enemy) && !enemy.isDead() }
    bottleHit(enemy) { return this.throwableObject.length > 0 && this.throwableObject[0].objectIsColliding(enemy) && !enemy.isDead() }


    throwObject() {
        if (this.keyboard.THROW && this.bottleCount > 0) {
            let timePassed = new Date().getTime() - this.lastThrow;
            if (timePassed > 500) {
                let thrownBottle = new ThrowableObject(this.character.x, this.character.y);
                this.throwableObject.push(thrownBottle);
                this.bottleCount--;
                this.lastThrow = new Date().getTime();
                console.log(this.lastThrow);
            }
        }
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgrounds);
        this.addObjectsToMap(this.level.bottles);
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
