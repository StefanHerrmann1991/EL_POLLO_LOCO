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
            this.checkDead();
        }, 1000 / 60);
    }


    checkDead() {
        if (this.character.isDead()) {
            this.world.loadImage('img/9.Intro _ Outro Image/_Game over_ screen/1.you lost.png');
        }
    }



checkBottleCount() {
    document.getElementById('bottleCounter').innerHTML = `
        <img class="bottle-stat" src="img/0.Own_Pictures/bottleThrowing/bottle_throwing6.png"> 
        <div>= ${this.bottleCount}<div>`
}

checkCollisions() {

    this.level.enemies.forEach((enemy, i) => {
        if (this.character.isColliding(enemy, 20, 90, 55, 100) && !this.character.isAboveGround() && !enemy.isDead()) {
            this.character.hit(5);
            this.statusbar.setPercentage(this.character.energy);
        }
        if (this.character.isAboveGround() && this.character.isColliding(enemy, 20, 90, 55, 100) && !enemy.isDead()) {
            enemy.hit(100);
            this.level.enemies.splice(i, 1);
        }

    });
    this.level.bottles.forEach((bottle, i) => {
        if (this.character.isColliding(bottle, 20, 90, 55, 100)) {
            this.level.bottles.splice(i, 1);
            this.bottleCount++;
        }
    });
}

throwObject() {
    if (this.keyboard.THROW && this.bottleCount > 0) {
        this.bottleCount--;
        let thrownBottle = new ThrowableObject(this.character.x, this.character.y);
        this.throwableObject.push(thrownBottle);
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
