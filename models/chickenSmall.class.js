class smallChicken extends MovableObject {
    energy = 100;
    volume = 0.4
    y = 375;
    sawCharacter = false;
    height = 60;
    width = 60;
    acceleration = 1.2
    defaultSpeed;


    IMAGES_WALKING = [
        'img/3.Secuencias_Enemy_básico/Versión_pollito/1.Paso_derecho.png',
        'img/3.Secuencias_Enemy_básico/Versión_pollito/2.Centro.png',
        'img/3.Secuencias_Enemy_básico/Versión_pollito/3.Paso_izquierdo.png'
    ];
    IMAGES_DYING = [
        'img/3.Secuencias_Enemy_básico/Versión_pollito/4.Muerte.png'
    ];

    CHICKEN_SOUND = {
        'audios': [
            new Audio('audio/chickenSound0.mp3'),
            new Audio('audio/chickenSound1.mp3'),
            new Audio('audio/chickenSound2.mp3'),
            new Audio('audio/chickenSound3.mp3'),
            new Audio('audio/chickenSound4.mp3')],
        'soundIsPlayedOnce': false,
        'timeoutId': '',
        'randomSound': '',
    }



    CHICKEN_SOUND_DEATH = {
        'audios': [new Audio('audio/chickenDeath3.mp3')],
        'soundIsPlayedOnce': false,
        'timeoutId': '',
        'randomSound': '',
    }

    constructor(x) {
        super().loadImage('img/3.Secuencias_Enemy_básico/Versión_Gallinita (estas salen por orden de la gallina gigantona)/1.Ga_paso_derecho.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DYING);
        this.x = x; // Zahl zwischen 0 und 500 Math ramdom generiert eine zufällige Zahl zwischen 0 und 1
        this.speed = 0.5 + Math.random() * 0.7;
        this.defaultSpeed = this.speed;
    }



    animate() {
        this.applyGravity(0)
        setStoppableInterval(() => {
            if (this.isDead()) this.chickenIsDying()
            else this.chickenIsAttacking()
        }, 1000 / 60);
        setStoppableInterval(() => {
            if (!this.isDead()) this.playAnimation(this.IMAGES_WALKING);
        }, 200);
    }


    chickenIsAttacking() {
        this.moveLeft();
        if (this.sawCharacter) {
            this.playAudioOnce(this.CHICKEN_SOUND, this.volume)
            if (!this.isAboveGround()) {
                this.speedY = 15;                
                this.speed = 14;
                this.sawCharacter = false; 
                setTimeout(() => {
                    this.speed = this.defaultSpeed;   
                }, 600);                          
            }
        }
    }

    chickenIsDying() {
        this.playAnimation(this.IMAGES_DYING);
        this.playAudioOnce(this.CHICKEN_SOUND_DEATH, this.volume);
        stopTimeout(this.CHICKEN_SOUND);
    }
}

