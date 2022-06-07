class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkCollisions();
    }

    setWorld() {
        this.character.world = this;
    }

    checkCollisions() {
        setInterval(() => {
            this.level.enemies.forEach((enemy) => {
                if (this.character.isColliding(enemy)) {
                    if (this.character.isAboveGround()) {
                        console.log('kill', enemy)
                    }
                    else {
                        console.log('is hurt')
                    }
                }
            })
        }, 200);
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgrounds);


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
        movableObject.draw(this.ctx)
        movableObject.drawFrame(this.ctx)




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
