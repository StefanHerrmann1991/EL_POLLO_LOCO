class Endscreen extends DrawableObject {

    





    /**
     * The function loads the endscreen depending on the characters position.
     * @param {number} x The postion on the x-axes where the Character is located with a correcture factor.
     * @param {number} y The postion on the y-axes where the Character is located with a correcture factor.
     */

    constructor(x, y, status) {      
        super();
        if(status == 'lost')
        {this.loadImage('img/9.Intro _ Outro Image/_Game over_ screen/1.you lost.png');}
        if(status == 'won')        
        {this.loadImage('img/0.Own_Pictures/background-story-end.png');}        
        this.height = 480;
        this.width = 720;
        this.x = x;
        this.y = y - 190 ;
    }
}