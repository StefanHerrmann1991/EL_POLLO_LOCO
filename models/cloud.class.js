class Cloud extends MovableObject {
    y = 20;

    constructor(imagePath, x, LEVEL_END) {
        super().loadImage(imagePath);
        this.x = x;
        this.height = 350;
        this.width = 600;
        this.animate(LEVEL_END);
    }

    animate(LEVEL_END) {
        this.moveLeft(LEVEL_END);
    }

    /**
     * The function simulates the moving of the clouds. 
     * @param {number} LEVEL_END - The end of the level where the clouds will be resetted to the level end.
     */

    moveLeft(LEVEL_END) {
        setStoppableInterval(() => {
            this.x -= this.speed;
            if (this.x < 500) {
                this.x = LEVEL_END;
            }
        }, 1000 / 60);
    }
}




