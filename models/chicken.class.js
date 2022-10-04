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
    CHICKEN_SOUND = [
        new Audio('audio/chickenSound0.mp3'),
        new Audio('audio/chickenSound1.mp3'),
        new Audio('audio/chickenSound2.mp3'),
        new Audio('audio/chickenSound3.mp3'),
        new Audio('audio/chickenSound4.mp3')];

    CHICKEN_SOUND_DEATH = new Audio('audio/chickenDeath.mp3');

    soundIsPlayedOnce = false;


    constructor(x) {
        super().loadImage('img/3.Secuencias_Enemy_básico/Versión_Gallinita (estas salen por orden de la gallina gigantona)/1.Ga_paso_derecho.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DYING);
        this.x = x; // Zahl zwischen 0 und 500 Math ramdom generiert eine zufällige Zahl zwischen 0 und 1
        this.speed = 0.25 + Math.random() * 0.7;
    }

    playAudioOnce(audio) {
        if (!this.soundIsPlayedOnce) {
            this.soundIsPlayedOnce = true;
            let soundDuration = audio.duration;
            audio.play();
            setTimeout(() => {
                audio.pause();
            }, 1000 * soundDuration);          
        }
    }



    animate() {

        /* Hühner bewegen sich nach links */




        setStoppableInterval(() => {
            let soundPosition = (Math.floor(Math.random() * 4));
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DYING);
                this.playAudioOnce(this.CHICKEN_SOUND_DEATH);
                this.CHICKEN_SOUND[soundPosition].pause();
            }

            else {
                this.moveLeft();                
                if (this.sawCharacter && !this.soundIsPlayedOnce) {
                    this.playAudioOnce(this.CHICKEN_SOUND[soundPosition])                  
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

