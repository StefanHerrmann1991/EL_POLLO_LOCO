class MovableObject {
    x = 120;
    y = 190;
    img;
    height = 250;
    width = 150;
    imageCache = {};

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
            this.imageCache[path] = path;
        });
    }


    moveRight() {
        console.log('Moving right');
    }

    moveLeft() {

    }

}