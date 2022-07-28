class ThrowableObject extends MovableObject {

    speedY = 50;

    IMAGES_BOTTLE_THROWING = [
        'img/0.Own_Pictures/bottleThrowing/bottle_throwing1.png',
        'img/0.Own_Pictures/bottleThrowing/bottle_throwing2.png',
        'img/0.Own_Pictures/bottleThrowing/bottle_throwing3.png',
        'img/0.Own_Pictures/bottleThrowing/bottle_throwing4.png',
        'img/0.Own_Pictures/bottleThrowing/bottle_throwing5.png',
        'img/0.Own_Pictures/bottleThrowing/bottle_throwing6.png',
        'img/0.Own_Pictures/bottleThrowing/bottle_throwing7.png',
        'img/0.Own_Pictures/bottleThrowing/bottle_throwing8.png'     
      ];
    IMAGES_BOTTLE_EXPLODING = [
        'img/6.botella/Rotación/Splash de salsa/Mesa de trabajo 1 copia 7.png',
        'img/6.botella/Rotación/Splash de salsa/Mesa de trabajo 1 copia 8.png',
        'img/6.botella/Rotación/Splash de salsa/Mesa de trabajo 1 copia 9.png',
        'img/6.botella/Rotación/Splash de salsa/Mesa de trabajo 1 copia 10.png',
        'img/6.botella/Rotación/Splash de salsa/Mesa de trabajo 1 copia 11.png',
        'img/6.botella/Rotación/Splash de salsa/Mesa de trabajo 1 copia 12.png'];
    world;

    constructor(x, y) {

        super().loadImage('img/6.botella/Rotación/Mesa de trabajo 1 copia 3.png');
        this.loadImages(this.IMAGES_BOTTLE_THROWING);
        this.loadImages(this.IMAGES_BOTTLE_EXPLODING);
        this.height = 80;
        this.width = 80;
        this.x = x + 100 ;
        this.y = y + 20;
        this.throw();
    }

    throw() {
        this.speedY = 30;
        this.applyGravity();
        setInterval(() => {
            this.x += 60
        }, 40);
        setInterval(() => {
            this.playAnimation(this.IMAGES_BOTTLE_THROWING);
        }, 20);
    }
}

