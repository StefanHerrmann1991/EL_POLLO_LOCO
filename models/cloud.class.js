class Cloud extends MovableObject {

    constructor() {
        super().loadImage('img/5.Fondo/Capas/4.nubes/1.png');
        this.x = 150 + Math.random() * 50 // Zahl zwischen 0 und 500 Math ramdom generiert eine zufällige Zahl zwischen 0 und 1
        this.y = 25 + Math.random() * 50; // Zahl zwischen 0 und 500 Math ramdom generiert eine zufällige Zahl zwischen 0 und 1
        this.height = 350;
        this.width = 600;
        this.animateClouds();

    }
    animateClouds() {
        setInterval(() => {
            this.x -= 0.5;
        }, 1000/60);
    }




}




/*     this.cloudsChanging();   
 cloudsChanging() {
        while (this.x > 0)
        this.x = 150 - 1;
        setTimeout(cloudsChanging(), 4000); 
    } */