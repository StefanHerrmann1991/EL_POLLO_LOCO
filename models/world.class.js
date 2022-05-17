class World {
    character = new Character();

    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken(),
    ];
    clouds = [new Cloud()]
    backgrounds = [
        new StaticObject('img/5.Fondo/Capas/5.cielo_1920-1080px.png', 0),
        new StaticObject('img/5.Fondo/Capas/3.Fondo3/1.png', 0),
        new StaticObject('img/5.Fondo/Capas/2.Fondo2/1.png', 0),
        new StaticObject('img/5.Fondo/Capas/1.suelo-fondo1/1.png', 0),
    ];

    canvas;
    ctx;

    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.addObjectsToMap(this.backgrounds);
        this.addObjectsToMap(this.clouds);
        this.addToMap(this.character);
        this.addObjectsToMap(this.enemies);
        /* draw wird immer wieder aufgerufen */
        let self = this;
        requestAnimationFrame(function () { self.draw() });
    }
    /* adds more than one object to the map*/

    addObjectsToMap(objects) {
        objects.forEach(o => { this.addToMap(o); });
    }
    /* adds one object to the map*/

    addToMap(newMovableObject) {
        this.ctx.drawImage(newMovableObject.img, newMovableObject.x, newMovableObject.y, newMovableObject.width, newMovableObject.height)
    }


}