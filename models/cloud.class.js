class Cloud extends MovableObject {
    y = 20;

    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.height = 350;
        this.width = 600;
        this.animateClouds();

    }
    animateClouds() {
        this.moveLeft();
    }


    moveLeft() {
        setStoppableInterval(() => {
            this.x -= this.speed;
            if (this.x < 0) {

            }
        }, 1000 / 60);
    }
}




