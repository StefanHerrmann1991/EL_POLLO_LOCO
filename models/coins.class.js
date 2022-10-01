class Coin extends LootableObject {

    IMAGES_COIN = [
        'img/8.Coin/Moneda1.png',
        'img/8.Coin/Moneda2.png']



        
    /**
     * The constructor for lootable objects in the map like coins and bottles.
     */

    constructor(x, y) {
        super().loadImage('img/8.Coin/Moneda1.png');
        this.loadImages(this.IMAGES_COIN);
        this.y = y;
        this.x = x;
        this.height = 100;
        this.width = 100;
        this.animate();
   }



    animate() {
        setStoppableInterval(() => {
            this.playAnimation(this.IMAGES_COIN);
        }, 160);
    }

}
