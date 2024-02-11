class Chicken extends MovableObject {
    energy = 100;
    volume = 0.4
    y = 375;
    sawCharacter = false;
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

    static CHICKEN_SOUNDS = [
        new Audio('audio/chickenSound0.mp3'),
        new Audio('audio/chickenSound1.mp3'),
        new Audio('audio/chickenSound2.mp3'),
        new Audio('audio/chickenSound3.mp3'),
        new Audio('audio/chickenSound4.mp3')
    ];

    static CHICKEN_SOUND_DEATH = [new Audio('audio/chickenDeath3.mp3')]

    soundIsPlayedOnce = false;
    timeoutId = '';
    randomSound = '';


    constructor(x) {
        super().loadImage('img/3.Secuencias_Enemy_básico/Versión_Gallinita (estas salen por orden de la gallina gigantona)/1.Ga_paso_derecho.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DYING);
        this.x = x; // Zahl zwischen 0 und 500 Math ramdom generiert eine zufällige Zahl zwischen 0 und 1
        this.speed = 0.25 + Math.random() * 0.7;
    }



    animate() {
        setStoppableInterval(() => {
            if (this.isDead()) this.chickenIsDying()
            else this.chickenIsAttacking()
        }, 1000 / 60);
        setStoppableInterval(() => {
            if (!this.isDead()) this.playAnimation(this.IMAGES_WALKING);
        }, 200);
    }


    playAudioOnce(soundArray, soundVolume) {
        if (!this.soundIsPlayedOnce && soundIsOn) {
            this.randomSound = Math.floor(Math.random() * soundArray.length);
            let sound = soundArray[this.randomSound];
            sound.volume = soundVolume;
            sound.play().then(() => {
                let soundDuration = sound.duration * 1000; // Convert to milliseconds
                this.timeoutId = setTimeout(() => {
                    sound.pause();
                    sound.currentTime = 0;
                }, soundDuration);
                allAudios.push(sound); // If you are tracking all audios
                this.soundIsPlayedOnce = true;
            }).catch(error => {
                console.error("Error playing sound:", error);
            });
        }
    }

    stopSound() {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }
        if (this.randomSound !== '') {
            let sound = Chicken.CHICKEN_SOUNDS[this.randomSound];
            sound.pause();
            sound.currentTime = 0;
            this.soundIsPlayedOnce = false;
        }
    }



    chickenIsAttacking() {
        this.moveLeft();
        if (this.sawCharacter) {            
            this.playAudioOnce(Chicken.CHICKEN_SOUNDS, this.volume); 
        }
    }

    chickenIsDying() {
        this.playAnimation(this.IMAGES_DYING);       
        this.playAudioOnce(Chicken.CHICKEN_SOUND_DEATH, this.volume);
    }
}

