class Character extends MovableObject {

    y = 80;
    speed = 15;
    jump = false;
    energy = 100;
    dodgeAnimation = 0;
    dodge = false;

    /* constructor führt sobald der Charakter geladen wird, die Funktionen innerhalb des Constructors aus. */
    IMAGES_WALKING = [
        'img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-21.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-22.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-23.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-24.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-25.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-26.png'
    ];
    IMAGES_JUMPING = [
        'img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-33.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-34.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-35.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-36.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-37.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-38.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-39.png'
    ];

    IMAGES_DODGING = [
        'img/2.Secuencias_Personaje-Pepe-corrección/6.Dodging/dodge0.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/6.Dodging/dodge1.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/6.Dodging/dodge2.png']

    IMAGES_DYING = [
        'img/2.Secuencias_Personaje-Pepe-corrección/5.Muerte/D-51.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/5.Muerte/D-52.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/5.Muerte/D-53.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/5.Muerte/D-54.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/5.Muerte/D-55.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/5.Muerte/D-56.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/5.Muerte/D-57.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/5.Muerte/D-58.png']
   
    IMAGES_HURTING = [
        'img/2.Secuencias_Personaje-Pepe-corrección/4.Herido/H-41.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/4.Herido/H-42.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/4.Herido/H-43.png']

    IMAGES_IDLE = [
        'img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/IDLE/I-1.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/IDLE/I-2.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/IDLE/I-3.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/IDLE/I-4.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/IDLE/I-5.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/IDLE/I-6.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/IDLE/I-7.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/IDLE/I-8.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/IDLE/I-9.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/IDLE/I-10.png']

    IMAGES_IDLE_LONG = [
        'img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/LONG_IDLE/I-11.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/LONG_IDLE/I-12.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/LONG_IDLE/I-13.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/LONG_IDLE/I-14.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/LONG_IDLE/I-15.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/LONG_IDLE/I-16.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/LONG_IDLE/I-17.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/LONG_IDLE/I-18.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/LONG_IDLE/I-19.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/LONG_IDLE/I-20.png'
    ]


    world;
    walking_sound = new Audio('audio/walking.mp3');

    constructor() {
        super().loadImage('img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-21.png');
        this.loadImages(this.IMAGES_IDLE_LONG);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURTING);
        this.loadImages(this.IMAGES_DYING);
        this.loadImages(this.IMAGES_DODGING);
        this.applyGravity(0);
        this.characterAnimate();
    }

    /**
     * Depending on the key entered the walking animation of the character is enabled.
     * It also tests and shows character status like jump die or hurt.
     */


    characterAnimate() {

        setStoppableInterval(() => {
            this.walking_sound.pause();
            if (!this.world.keyboard.DODGE && !this.isDead() && this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.moveRight();
                this.walking_sound.play();
                this.otherDirection = false;
            }
            if (!this.world.keyboard.DODGE && !this.isDead() && this.world.keyboard.LEFT && this.x > 0) {
                this.moveLeft();
                this.walking_sound.play();
                this.otherDirection = true;
            }
            if (!this.isDead() && this.world.keyboard.SPACE && !this.isAboveGround()) {
                this.speedY = 35;
            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);

        setStoppableInterval(() => {
            // walk animation  
            if (this.isDead() && !this.death) {
                this.playAnimation(this.IMAGES_DYING);
                this.death = true;
                setTimeout(() => {
                    this.loadImage('img/2.Secuencias_Personaje-Pepe-corrección/5.Muerte/D-58.png');
                }, 400);
            }

            if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURTING);
            }

            if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            }

            if (this.canWalk() ) {
                this.playAnimation(this.IMAGES_WALKING);
            }
            
            else if (!this.isDead() && !this.isHurt() && !this.isAboveGround()) {
                this.playAnimation(this.IMAGES_IDLE);
            }
            
            if (this.world.keyboard.DODGE && !this.isDead() && !this.isHurt() && !this.isAboveGround()) {
                if (this.dodgeAnimation < 1) {
                    this.playAnimation(this.IMAGES_DODGING);
                }
                else { this.loadImage(this.IMAGES_DODGING[2]); }
                this.dodgeAnimation++;
            }

            if (!this.world.keyboard.DODGE) 
            { this.dodgeAnimation = 0; }

        }, 120);

    }
    standIdle() { return !this.isDead() && !this.isHurt() && !this.isAboveGround() }
    canWalk() { return !this.world.keyboard.SPACE && !this.world.keyboard.DODGE && !this.isDead() && (this.world.keyboard.RIGHT ||  this.world.keyboard.LEFT) }

}