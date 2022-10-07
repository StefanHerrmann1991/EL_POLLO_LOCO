class DrawableObject {
    x = 120;
    y = 190;
    img;
    height = 250;
    width = 150;
    imageCache = {};

    /**
     * The function loads a picture depending on its path.
     * @param {string} path Folder where the image is located.
     */

    loadImage(path) {
        this.img = new Image(); // this.img = document.getElementById('image') <img id="image" src>
        this.img.src = path;
    }

    /**
 * The function loads images depending on its path.
 * @param {array} arr Array with the relative path of images.
 */

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
     * The function draws a rectangle around the character at a  certain position and moves with the character.
     * @param {*} ctx 
     */

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);       
    }

  

    drawFrame(ctx) {
        if (this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x + 40, this.y  + 110, this.width - 40, this.height - 180)
            ctx.stroke();
        }

        if (this instanceof Character) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'red';
            ctx.rect(this.x + 20, this.y  + 120, this.width - 55, this.height - 130)
            ctx.stroke();
        }
    } 
}