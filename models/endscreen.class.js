class Endscreen extends DrawableObject {


    constructor(x, y) {
        super().loadImage('img/9.Intro _ Outro Image/_Game over_ screen/1.you lost.png');
        this.height = 480;
        this.width = 720;
        this.x = x - 100;
        this.y = y - 190;
    }
}