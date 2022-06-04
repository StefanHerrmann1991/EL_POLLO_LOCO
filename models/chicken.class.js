class Chicken extends MovableObject {

    y = 375;
    height = 60;
    width = 60;
    IMAGES_WALKING = [
        'img/3.Secuencias_Enemy_básico/Versión_Gallinita (estas salen por orden de la gallina gigantona)/1.Ga_paso_derecho.png',
        'img/3.Secuencias_Enemy_básico/Versión_Gallinita (estas salen por orden de la gallina gigantona)/2-Ga_centro.png',
        'img/3.Secuencias_Enemy_básico/Versión_Gallinita (estas salen por orden de la gallina gigantona)/3.Ga_paso izquierdo.png'
    ];
    chicken_sound = new Audio('audio/chicken.mp3');

    constructor() {
        super().loadImage('img/3.Secuencias_Enemy_básico/Versión_Gallinita (estas salen por orden de la gallina gigantona)/1.Ga_paso_derecho.png');
        this.loadImages(this.IMAGES_WALKING);
        this.x = 200 + Math.random() * 500; // Zahl zwischen 0 und 500 Math ramdom generiert eine zufällige Zahl zwischen 0 und 1
        this.speed = 0.15 + Math.random() * 0.7;
        this.animate();
    }



    animate() {
        this.moveLeft();
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING)
        }, 200);
        /*    setInterval(() => {
               this.chicken_sound.play();
           }, 4000) */
    }
}

/*   moreChicken() {
       let L = 15; //curves maximum value
       let k = 0.5; //logistic growth rate
       let x0 = 1; //midpoint of the function
       let x = 4;
       let f = L/(1 + Math.exp(-k(x*x0)))
   } */