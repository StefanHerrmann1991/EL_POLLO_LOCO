class Character extends MovableObject {

    y = 80;
    speed = 12;
    jump = false;
    energy = 100;
    dodgeAnimation = 0;
    dodge = false;
    camera_position = 0;
    camera_position_storage = 0;
    audioJumping = false;
    changeCameraLeft = true;
    changeCameraRight = true;

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
    }

    /**
     * Depending on the key entered the walking animation of the character is enabled.
     * It also tests and shows character status like jump die or hurt.
     */


    animate() {

        setStoppableInterval(() => this.moveCharacter(), 1000 / 60);
        setStoppableInterval(() => this.playCharacterAnimation(), 120);

    }


    playCharacterAnimation() {
        if (this.canDie()) 
            this.isDying();
        
        if (this.isHurt()) 
            this.playAnimation(this.IMAGES_HURTING);
        
        if (this.isAboveGround()) 
            this.playAnimation(this.IMAGES_JUMPING);
        
        if (this.canWalk()) 
            this.playAnimation(this.IMAGES_WALKING);
        
        else if (this.canWait()) 
            this.playAnimation(this.IMAGES_IDLE);
        
        if (this.canDodge()) 
            this.isDodging();
        
        if (!this.world.keyboard.DODGE)  
            this.dodgeAnimation = 0; 
    }

    moveCharacter() {
        walking_sound.pause();
        if (this.canWalkRight()) {
            this.isWalkingRight();
        }

        if (this.canWalkLeft()) {
            this.isWalkingLeft();
        }

        if (this.canJump()) {
            this.isJumping();
        }
    }


    isJumping() {
        this.speedY = 35;
        this.playAudioOnKey(jumping_sound);
    }

    isWalkingRight() {
        this.otherDirection = false;
        this.adjustCameraRight();
        walking_sound.play();
    }

    isWalkingLeft() {
        this.otherDirection = true;
        this.adjustCameraLeft();
        walking_sound.play();
    }

    isDying() {
        this.playAnimation(this.IMAGES_DYING);
        this.death = true;
        setTimeout(() => {
            this.loadImage('img/2.Secuencias_Personaje-Pepe-corrección/5.Muerte/D-58.png');
        }, 400);
    }

    isDodging() {
        if (this.dodgeAnimation < 1) {
            this.playAnimation(this.IMAGES_DODGING);

        }
        else { this.loadImage(this.IMAGES_DODGING[2]); }
        this.dodgeAnimation++;
    }

    standIdle() { return !this.isDead() && !this.isHurt() && !this.isAboveGround() }
    canJump() { return !this.isDead() && this.world.keyboard.SPACE && !this.isAboveGround() }
    canWalk() { return !this.world.keyboard.SPACE && !this.world.keyboard.DODGE && !this.isDead() && (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) }
    canWalkRight() { return !this.world.keyboard.DODGE && !this.isDead() && this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x }
    canWalkLeft() { return !this.world.keyboard.DODGE && !this.isDead() && this.world.keyboard.LEFT && this.x > 0 }
    canWait() { return !this.isDead() && !this.isHurt() && !this.isAboveGround() }
    canDodge() { return this.world.keyboard.DODGE && !this.isDead() && !this.isHurt() && !this.isAboveGround() }
    canDie() { return this.isDead() && !this.death }

/**
 * The function uses a mp3 file to play a sound while a certain key is pressed and stops the sound, when the key isn't pressed anymore.
 * @param {object} mp3JSON - An object containing the path to the audio data.
 */

    playAudioOnKey(mp3JSON) {

        if (!this.audioJumping) {
            let soundDuration = mp3JSON.duration;
            this.audioJumping = true;
            mp3JSON.play();
            setTimeout(() => {
                this.audioJumping = false;
                mp3JSON.pause();
            }, 1000 * soundDuration);
        }
    }

    /**The funcion adjusts the camera to the right side depending on the position of the camera, when the character moves right.
     * 
     * @param {Number} rightBorder - The right border of the canvas where the camera locks in position, until the character moves left.
     * 
     */

    adjustCameraRight() {
        let rightBorder = -this.x + 100;

        if (this.changeCameraRight && rightBorder <= this.camera_position_storage) {
            this.world.camera_x -= 20;
            this.moveRight();
        }

        else {
            this.changeCameraRight = false;
            this.world.camera_x = rightBorder;
            this.moveRight();

        }
        this.changeCameraLeft = true;
        this.camera_position_storage = this.world.camera_x;
    }

  /**The funcion adjusts the camera to the left side depending on the position of the camera, when the character moves left.
     * 
     * @param {Number} leftBorder - The left border of the canvas where the camera locks in position, until the character moves right.
     * 
     */


    adjustCameraLeft() {
        let leftBorder = -this.x + 620 - this.width;

        if (this.changeCameraLeft && leftBorder >= this.camera_position_storage) {
            this.world.camera_x += 20;
            this.moveLeft();
        }

        else {
            this.changeCameraLeft = false;
            this.world.camera_x = leftBorder;
            this.moveLeft();

        }
        this.changeCameraRight = true;
        this.camera_position_storage = this.world.camera_x;
    }
}

