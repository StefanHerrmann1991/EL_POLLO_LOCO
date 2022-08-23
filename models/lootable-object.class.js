class LootableObject extends MovableObject { 

/**
 * The constructor for lootable objects in the map like coins and bottles.
 */
        constructor() { 
            super().loadImage('img/6.botella/2.Botella_enterrada1.png');
            this.y = 400 - Math.random() * 220;
            this.x = 200 + Math.random() * 2600;
            this.height = 100;
            this.width = 100;
        }
       }

