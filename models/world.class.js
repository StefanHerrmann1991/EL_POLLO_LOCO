class World {
    character = new Character();
    statusbar = new Statusbar();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    bottleCount = 0;
    throwableObject = [];

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
    /*  this.x + 20, this.y + 90, this.width - 55, this.height - 100 */

    checkWorld() {
        setInterval(() => {
            this.checkCollisions();
            this.throwObject();
        }, 60);
    }

    checkCollisions() {

        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy, 20, 90, 55, 100)) {
                this.character.hit();
                this.statusbar.setPercentage(this.character.energy)
            }
        });
        this.level.bottles.forEach((bottle, i) => {
            if (this.character.isColliding(bottle, 20, 90, 55, 100)) {
                this.level.bottles.splice(i, 1)
                this.bottleCount++;
                console.log(this.bottleCount);
            }
        });
    }

    throwObject() {
        if (this.keyboard.THROW && this.bottleCount > 0) {
            this.bottleCount--;
            let thrownBottle = new ThrowableObject(this.character.x, this.character.y);
            this.throwableObject.push(thrownBottle);
            console.log(this.bottleCount);
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
