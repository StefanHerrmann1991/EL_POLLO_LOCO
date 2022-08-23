class Coin extends LootableObject { 

/**
 * The constructor for lootable objects in the map like coins and bottles.
 */

        constructor(x, y) { 
            super().loadImage('img/8.Coin/Moneda1.png');
            this.y = y;
            this.x = x;
            this.height = 100;
            this.width = 100;
        }

        


       }
