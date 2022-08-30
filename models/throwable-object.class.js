class ThrowableObject extends MovableObject {

    speedY = 50;
    speedX = 40;
    lastThrow = 0;
    collision = false;
    IMAGES_BOTTLE_THROWING = [
        'img/6.botella/Rotación/Mesa de trabajo 1.png',
        'img/6.botella/Rotación/Mesa de trabajo 2.png',
        'img/6.botella/Rotación/Mesa de trabajo 3.png',
        'img/6.botella/Rotación/Mesa de trabajo 4.png',
        'img/6.botella/Rotación/Mesa de trabajo 5.png',
        'img/6.botella/Rotación/Mesa de trabajo 6.png',
        'img/6.botella/Rotación/Mesa de trabajo 7.png',
        'img/6.botella/Rotación/Mesa de trabajo 8.png'
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

        super().loadImage('img/6.botella/Rotación/Mesa de trabajo 1.png');
        this.loadImages(this.IMAGES_BOTTLE_THROWING);
        this.loadImages(this.IMAGES_BOTTLE_EXPLODING);
        this.height = 80;
        this.width = 80;
        this.x = x + 100;
        this.y = y + 30;
        this.throw();
    }



    /*     throwTime() { this.lastThrow = new Date().getTime(); }
    
        isThrown() {
            let timePassed = new Date().getTime() - this.lastThrow; // difference in ms
            timePassed = timePassed / 1000; // difference in s
            return timePassed < 0.8;
        } */

    throw() {

        this.speedY = 20;
        this.applyGravity();
        setStoppableInterval(() => { this.x += this.speedX; }, 60);
        setStoppableInterval(() => {
            if (!this.collision) {
                this.playAnimation(this.IMAGES_BOTTLE_THROWING);
            }
            else { this.playAnimation(this.IMAGES_BOTTLE_EXPLODING); }
        }, 20);
    }
}

