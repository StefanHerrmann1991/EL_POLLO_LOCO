class MovableObject {
    x = 120;
    y = 190;
    img;
    height = 250;
    width = 150;
    imageCache = {};
    speed = 0.15;
    otherDirection = false;
    currentImage = 0;
    speedY = 0;
    acceleration = 2.5;
    jump = false;

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround() { return this.y < 180; }

    /**loadImage('img/test.png')
     * The function loads images from the img folder 
     * @param path the relative path of the img
     * img is only defined in JS not in HTML*/

    loadImage(path) {
        this.img = new Image(); // this.img = document.getElementById('image') <img id="image" src>
        this.img.src = path;
    }

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }


    moveRight() {
        this.x += this.speed;
       
       
    }

    moveLeft() {
        this.x -= this.speed;
         }


    playAnimation(images) {
        let i = this.currentImage % this.IMAGES_WALKING.length;
        // let i = 0 % (Modu) 6; => 1, Rest 0 (Modu ist mathematischer Rest)
        // 0 / 6 = 0 Rest 0; 1 / 6 = 0 Rest 1 (Rest, was übrig bleibt von der Zahl) 7 / 6 = 1 Rest 1 Modu hebt immer nur den Rest auf. Deswegen fängt er hier wieder bei 1 an
        // Modu zählt 0 ,1 ,2 ,3 ,4 ,5 ,0 ....
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    jump() {
        this.speedY = 30;
    }

}