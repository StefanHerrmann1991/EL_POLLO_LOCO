class Cloud extends MovableObject {
    CLOUD_IMAGES = ["img/5.Fondo/Capas/4.nubes/1.png",
                    "img/5.Fondo/Capas/4.nubes/2.png"]

    constructor() {
        super().loadImage('img/5.Fondo/Capas/4.nubes/1.png');
        this.x = 150 + Math.random() * 50 // Zahl zwischen 0 und 500 Math ramdom generiert eine zufällige Zahl zwischen 0 und 1
        this.y = 25 + Math.random() * 50; // Zahl zwischen 0 und 500 Math ramdom generiert eine zufällige Zahl zwischen 0 und 1
        this.height = 350;
        this.width = 600;
        this.animateClouds();
    }
    animateClouds() {
        this.moveLeft();
    }
    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
    }
}

