class Cloud extends MovableObject {
    CLOUD_IMAGES = ["img/5.Fondo/Capas/4.nubes/1.png",
                    "img/5.Fondo/Capas/4.nubes/2.png"]

                    /* TODO*/
    constructor(x, y) {
        super().loadImage('img/5.Fondo/Capas/4.nubes/1.png');
        this.x = x // Zahl zwischen 0 und 500 Math ramdom generiert eine zufällige Zahl zwischen 0 und 1
        this.y = y // Zahl zwischen 0 und 500 Math ramdom generiert eine zufällige Zahl zwischen 0 und 1
        this.height = 350;
        this.width = 600;
        this.animateClouds();
    }
    animateClouds() {
        this.moveLeft();
    }
    moveLeft() {
       let cloudInterval = setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
        
        allIntervals.push(cloudInterval);
    }
}

