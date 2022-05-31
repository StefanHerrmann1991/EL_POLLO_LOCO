class Chicken extends MovableObject {

    y = 375;
    height = 60;
    width = 60;
    constructor() {
        super().loadImage('img/3.Secuencias_Enemy_básico/Versión_Gallinita (estas salen por orden de la gallina gigantona)/1.Ga_paso_derecho.png');
        this.x = 200 + Math.random() * 500; // Zahl zwischen 0 und 500 Math ramdom generiert eine zufällige Zahl zwischen 0 und 1
        this.animateChickens();
       

    }

    animateChickens() {
        setInterval(() => {
            this.x -= .1;
           
        }, 1000 / 60);
       
    }


   
}

/* img/3.Secuencias_Enemy_básico/Versión_Gallinita (estas salen por orden de la gallina gigantona)/2-Ga_centro.png 
 this.animateWalkingChickens();
 animateWalkingChickens() {
        setInterval(() => {
            if (this.x % 2 == 0 ) 
            {this.loadImage('img/3.Secuencias_Enemy_básico/Versión_Gallinita (estas salen por orden de la gallina gigantona)/2-Ga_centro.png');}
            else {
                this.loadImage('img/3.Secuencias_Enemy_básico/Versión_Gallinita (estas salen por orden de la gallina gigantona)/1.Ga_paso_derecho.png');
            }
            }, 1000 / 60); 
    }
*/