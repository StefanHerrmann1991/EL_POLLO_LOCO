class LootableObject extends MovableObject { 

/**
 * The constructor for lootable objects in the map like coins and bottles.
 */
        constructor(x, y) { 
            super().loadImage('img/6.botella/2.Botella_enterrada1.png');
            this.y = y;
            this.x = x;
            this.height = 100;
            this.width = 100;
        }
       }

