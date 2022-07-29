class Chicken extends MovableObject {
    energy = 100;
    y = 375;
    height = 60;
    width = 60;
    IMAGES_WALKING = [
        'img/3.Secuencias_Enemy_básico/Versión_Gallinita (estas salen por orden de la gallina gigantona)/1.Ga_paso_derecho.png',
        'img/3.Secuencias_Enemy_básico/Versión_Gallinita (estas salen por orden de la gallina gigantona)/2-Ga_centro.png',
        'img/3.Secuencias_Enemy_básico/Versión_Gallinita (estas salen por orden de la gallina gigantona)/3.Ga_paso izquierdo.png'
    ];
    IMAGES_DYING = [
        /*   'img/6.botella/Rotación/Splash de salsa/Mesa de trabajo 1 copia 7.png',
          'img/6.botella/Rotación/Splash de salsa/Mesa de trabajo 1 copia 8.png',
          'img/6.botella/Rotación/Splash de salsa/Mesa de trabajo 1 copia 9.png',
          'img/6.botella/Rotación/Splash de salsa/Mesa de trabajo 1 copia 10.png',
          'img/6.botella/Rotación/Splash de salsa/Mesa de trabajo 1 copia 11.png',
          'img/6.botella/Rotación/Splash de salsa/Mesa de trabajo 1 copia 12.png', */
        'img/3.Secuencias_Enemy_básico/Versión_Gallinita (estas salen por orden de la gallina gigantona)/4.G_muerte.png'];
    chicken_sound = new Audio('audio/chicken.mp3');

    constructor() {
        super().loadImage('img/3.Secuencias_Enemy_básico/Versión_Gallinita (estas salen por orden de la gallina gigantona)/1.Ga_paso_derecho.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DYING);
        this.x = 600 + Math.random() * 500; // Zahl zwischen 0 und 500 Math ramdom generiert eine zufällige Zahl zwischen 0 und 1
        this.speed = 0.15 + Math.random() * 0.7;
        this.animate();
    }

    animate() {
        /* Hühner bewegen sich nach links */
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        /* Hühner laufen (nur Animation und Ton) */
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);
        /*    setInterval(() => {
               this.chicken_sound.play();
           }, 4000) */
        /*       setInterval(() => {
                  if (this.level.character.isColliding(this.chicken)){this.chicken.splice) }
              }, 200)
       */
/*         setInterval(() => {
            if (this.objectIsDead(object)) {
                this.playAnimation(this.IMAGES_DYING)
                this.splice(i, 1);
            }
        }, 1000 / 60); */

        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);
    }
}
