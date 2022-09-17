class Endboss extends MovableObject {

    energy = 500;
    height = 500;
    width = 400;
    y = -30;
    speed = 8;
    attack = false;
    walking = false;
    hadFirstContact = false;
    i = 0;

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
        this.animate();
        this.applyGravity(30);
    }

    /**
     * The function plays the animations for the enboss chicken. 
     */

    animate() {

        setStoppableInterval(() => {
       
            if (this.isDead() && !this.death) {
                this.playAnimation(this.IMAGES_DYING);
                this.death = true;
                setTimeout(() => {
                    this.loadImage('img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/4.Muerte/G27.png');
                }, 1500);
            }

            if (this.hadFirstContact) {                
                if (this.i < 10) {
                    this.playAnimation(this.IMAGES_PERCEIVING);
                    this.i++;
               }
               if (this.i == 10) {
                
               }              
            }
            
            if (!this.isDead() && this.attack && !this.isHurt()) {
                this.playAnimation(this.IMAGES_ATTACKING);
                if (!this.isDead() && !this.isAboveGround()) {
                    this.speedY = 35;
                }
            }

            else if (this.isHurt() && !this.isDead() && !this.attack) {
                this.playAnimation(this.IMAGES_HURTING);
            }
            else if (!this.isDead() && this.walking && !this.isHurt()) { this.playAnimation(this.IMAGES_WALKING) }
        }, 90);
    }


}
