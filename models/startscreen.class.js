class Startscreen extends DrawableObject {

    /**
     * The function loads the endscreen depending on the characters position.
     * @param {number} x The postion on the x-axes where the Character is located with a correcture factor.
     * @param {number} y The postion on the y-axes where the Character is located with a correcture factor.
     */

    constructor(x, y) {
        super().loadImage('img/9.Intro _ Outro Image/Start Screen/Opción2.png');
        this.height = 480;
        this.width = 720;
        this.x = x - 100;
        this.y = y - 90;
    }
}