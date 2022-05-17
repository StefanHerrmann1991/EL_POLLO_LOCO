class MovableObject {
    x = 120;
    y = 190;
    img;
    height = 250;
    width = 150;
    /**loadImage('img/test.png')
     * The function is loading images from the img folder 
     * @param path the relative path of the img
     * img is only defined in JS not in HTML*/

    loadImage(path) {
        this.img = new Image(); // this.img = document.getElementById('image') <img id="image" src>
        this.img.src = path;
    }

    moveRight() {
        console.log('Moving right');
    }

    moveLeft() {

    }

}