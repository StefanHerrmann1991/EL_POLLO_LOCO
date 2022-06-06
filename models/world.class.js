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
    }

    setWorld() {
        this.character.world = this;
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
            this.ctx.save();
            this.ctx.translate(movableObject.width, 0);
            this.ctx.scale(-1, 1);
            movableObject.x = movableObject.x * -1;
        }
        this.ctx.drawImage(movableObject.img, movableObject.x, movableObject.y, movableObject.width, movableObject.height)
        this.ctx.beginPath();
        this.ctx.lineWidth = '5';
        this.ctx.strokeStyle  = 'blue';
        this.ctx.rect(movableObject.x, movableObject.y, movableObject.width, movableObject.height)
        this.ctx.stroke();


        if (movableObject.otherDirection) {
            movableObject.x = movableObject.x * -1;
            this.ctx.restore();
        }
    }
}
