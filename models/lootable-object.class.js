class LootableObject extends MovableObject { 

    IMAGES_BOTTLE_STANDING = [
        'img/6.botella/2.Botella_enterrada1.png',
        'img/6.botella/2.Botella_enterrada2.png'];

        constructor() { 
            super().loadImage('img/6.botella/2.Botella_enterrada1.png');
            this.y = 330 + Math.random() * 300;
            this.x = 200 + Math.random() * 2000;
        }
       }

