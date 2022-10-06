class Chicken extends MovableObject {
    energy = 100;
    y = 375;
    sawCharacter = false;
    /* 
      y = 320; */
    height = 60;
    width = 60;
    IMAGES_WALKING = [
        'img/3.Secuencias_Enemy_básico/Versión_Gallinita (estas salen por orden de la gallina gigantona)/1.Ga_paso_derecho.png',
        'img/3.Secuencias_Enemy_básico/Versión_Gallinita (estas salen por orden de la gallina gigantona)/2-Ga_centro.png',
        'img/3.Secuencias_Enemy_básico/Versión_Gallinita (estas salen por orden de la gallina gigantona)/3.Ga_paso izquierdo.png'
    ];
    IMAGES_DYING = [
        'img/3.Secuencias_Enemy_básico/Versión_Gallinita (estas salen por orden de la gallina gigantona)/4.G_muerte.png'
    ];

    CHICKEN_SOUND = {
        'audios': [
            new Audio('audio/chickenSound0.mp3'),
            new Audio('audio/chickenSound1.mp3'),
            new Audio('audio/chickenSound2.mp3'),
            new Audio('audio/chickenSound3.mp3'),
            new Audio('audio/chickenSound4.mp3')],
        'soundIsPlayedOnce': false,
        'timeoutId' : '', 
        'randomSound' : '',
    }



    CHICKEN_SOUND_DEATH = {
        'audios': [new Audio('audio/chickenDeath.mp3')],
        'soundIsPlayedOnce': false,
        'timeoutId' : '',
        'randomSound' : '',
    }

    constructor(x) {
        super().loadImage('img/3.Secuencias_Enemy_básico/Versión_Gallinita (estas salen por orden de la gallina gigantona)/1.Ga_paso_derecho.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DYING);
        this.x = x; // Zahl zwischen 0 und 500 Math ramdom generiert eine zufällige Zahl zwischen 0 und 1
        this.speed = 0.25 + Math.random() * 0.7;
    }



    animate() {

        setStoppableInterval(() => {

            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DYING);
                stopTimeout(this.CHICKEN_SOUND);   
                playAudioOnce(this.CHICKEN_SOUND_DEATH);              
            } 

            else {
                this.moveLeft();
                if (this.sawCharacter) {
                    playAudioOnce(this.CHICKEN_SOUND)
                }
            }

        }, 1000 / 60);

        /* Hühner laufen (nur Animation und Ton) */

        setStoppableInterval(() => {
            if (!this.isDead()) {
                this.playAnimation(this.IMAGES_WALKING)
            };
        }, 200);
    }
}

