class Cloud extends MovableObject {
    y = 20;
   
    constructor(imagePath, x, LEVEL_END) {
        super().loadImage(imagePath);
        this.x = x;
        this.height = 350;
        this.width = 600;
        this.animateClouds(LEVEL_END);

    }
    animateClouds(LEVEL_END) {
        this.moveLeft(LEVEL_END);
    }


    moveLeft(LEVEL_END) {
        setStoppableInterval(() => {
            this.x -= this.speed;
            if (this.x < 500) {
                console.log('reached');
                this.x = LEVEL_END;
            }
        }, 1000 / 60);
    }
}




