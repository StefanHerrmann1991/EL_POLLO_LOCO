class Endboss extends MovableObject {

    energy = 500;
    height = 400;
    width = this.height * 4 / 5;
    y = 50;
    speed = 8;
    attack = false;
    walking = false;
    hadFirstContact = false;
    i = 0;
    acceleration = 0.8;

    IMAGES_WALKING = [
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/1.Caminata/G1.png',
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/1.Caminata/G2.png',
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/1.Caminata/G3.png',
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/1.Caminata/G4.png']

    IMAGES_PERCEIVING = [
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/1.Alerta/G5.png',
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/1.Alerta/G6.png',
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/1.Alerta/G7.png',
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/1.Alerta/G8.png',
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/1.Alerta/G9.png',
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/1.Alerta/G10.png',
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/1.Alerta/G11.png',
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/1.Alerta/G12.png'
    ];
    IMAGES_ATTACKING = [
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/2.Ataque/G13.png',
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/2.Ataque/G14.png',
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/2.Ataque/G15.png',
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/2.Ataque/G16.png',
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/2.Ataque/G17.png',
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/2.Ataque/G18.png',
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/2.Ataque/G19.png',
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/2.Ataque/G20.png'];

    IMAGES_HURTING = [
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/3.Herida/G21.png',
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/3.Herida/G22.png',
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/3.Herida/G23.png'];

    IMAGES_DYING = [
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/4.Muerte/G24.png',
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/4.Muerte/G25.png',
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/4.Muerte/G26.png'
    ];




    constructor(x) {
        super().loadImage(this.IMAGES_PERCEIVING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_PERCEIVING);
        this.loadImages(this.IMAGES_ATTACKING);
        this.loadImages(this.IMAGES_HURTING);
        this.loadImages(this.IMAGES_DYING);
        this.x = x;
        this.applyGravity(0);

    }

    /**
     * The function plays the animations for the enboss chicken. 
     */

    animate() {
        setStoppableInterval(() => {

            if (this.hadFirstContact && this.i < 10) {
                this.playAnimation(this.IMAGES_PERCEIVING);
                this.i++;
                if (this.i >= 9) {
                    this.hadFirstContact = false;
                }
            }

            if (this.isDead() && !this.death && !this.hadFirstContact) {
                this.playAnimation(this.IMAGES_DYING);
                setTimeout(() => {
                    this.death = true;
                    this.otherDirection = false;
                    this.loadImage('img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/4.Muerte/G27.png');
                }, 1500);
            }

            if (!this.isDead() && this.attack && !this.isHurt() && !this.hadFirstContact) {
                this.playAnimation(this.IMAGES_ATTACKING);
                if (!this.isDead() && !this.isAboveGround()) {
                    this.speedY = 20;                   
                }
            }

            else if (this.isHurt() && !this.isDead() && !this.attack && !this.hadFirstContact) {
                this.playAnimation(this.IMAGES_HURTING);
            }

            else if (!this.isDead() && !this.isHurt() && this.walking && !this.attack) 
            { this.playAnimation(this.IMAGES_WALKING) }

        }, 90);
    }

}
