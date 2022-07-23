class ThrowableObject extends MovableObject {
    speedX = 20;
    speedY = 30;

    IMAGES_BOTTLE_THROWING = [
        'img/6.botella/Rotación/Mesa de trabajo 1 copia 3.png',
        'img/6.botella/Rotación/Mesa de trabajo 1 copia 4.png',
        'img/6.botella/Rotación/Mesa de trabajo 1 copia 5.png',
        'img/6.botella/Rotación/Mesa de trabajo 1 copia 6.png'];
    IMAGES_BOTTLE_EXPLODING = [
        'img/6.botella/Rotación/Splash de salsa/Mesa de trabajo 1 copia 7.png',
        'img/6.botella/Rotación/Splash de salsa/Mesa de trabajo 1 copia 8.png',
        'img/6.botella/Rotación/Splash de salsa/Mesa de trabajo 1 copia 9.png',
        'img/6.botella/Rotación/Splash de salsa/Mesa de trabajo 1 copia 10.png',
        'img/6.botella/Rotación/Splash de salsa/Mesa de trabajo 1 copia 11.png',
        'img/6.botella/Rotación/Splash de salsa/Mesa de trabajo 1 copia 12.png'];
    IMAGES_BOTTLE_STANDING = [
        'img/6.botella/2.Botella_enterrada1.png',
        'img/6.botella/2.Botella_enterrada2.png'];

    constructor() {

        super().loadImage('img/6.botella/2.Botella_enterrada1.png');
        this.loadImages(this.IMAGES_BOTTLE_STANDING);
        this.loadImages(this.IMAGES_BOTTLE_THROWING);
        this.loadImages(this.IMAGES_BOTTLE_EXPLODING);
     /*    this.applyGravity(); */
        this.y = 330;
        this.x = 200 + Math.random() * 2000;
        this.height = 100;
        this.width = 100;
    }


 /*    takeBottle() {
        if(ThrowableObject.isColliding()){}
    } */

    animateThrowableObject() {

    }


}