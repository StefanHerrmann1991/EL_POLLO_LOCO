class ThrowableObject extends MovableObject {

    speedY = 7;
    speedX = 35;
    acceleration = 0.8
    lastThrow = 0;
    volume = 0.2;
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

    THROWING_SOUND = {
        'audios': [new Audio('audio/throwingBottle.mp3')],
        'soundIsPlayedOnce': false,
        'timeoutId': '',
        'randomSound': '',
    }
    HITTING_SOUND = {
        'audios': [new Audio('audio/bottleHits2.mp3')],
        'soundIsPlayedOnce': false,
        'timeoutId': '',
        'randomSound': '',
    }


    constructor(x, y, otherDirection) {

        super().loadImage('img/6.botella/Rotación/Mesa de trabajo 1.png');
        this.loadImages(this.IMAGES_BOTTLE_THROWING);
        this.loadImages(this.IMAGES_BOTTLE_EXPLODING);
        this.height = 80;
        this.width = 80;
        if (!otherDirection) {
            this.x = x + 100;
            this.y = y + 30;
        }
        else {
            this.x = x;
            this.y = y + 30;
        }
        this.throw(otherDirection);
    }


    throw(otherDirection) {
        this.applyGravity();
        setStoppableInterval(() => {
            if (!otherDirection)  this.x += this.speedX; 
            else this.x -= this.speedX;            
        }, 60);


        setStoppableInterval(() => {
            if (!this.collision) {
                this.playAnimation(this.IMAGES_BOTTLE_THROWING);
                this.playAudioOnce(this.THROWING_SOUND, this.volume);
            }
            else {
                this.playAnimation(this.IMAGES_BOTTLE_EXPLODING);
                this.playAudioOnce(this.HITTING_SOUND, this.volume);
            }
        }, 40);
    }
}

