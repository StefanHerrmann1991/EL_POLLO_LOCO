class StatusbarEndboss extends DrawableObject {

    IMAGES_LIFEBAR_ENDBOSS = [
        'img/7.Marcadores/live_endboss/0_.png  ',
        'img/7.Marcadores/live_endboss/20_.png ',
        'img/7.Marcadores/live_endboss/40_.png ',
        'img/7.Marcadores/live_endboss/60_.png ',
        'img/7.Marcadores/live_endboss/80_.png ',
        'img/7.Marcadores/live_endboss/100_.png']
        
    percentage = 500;
        
    constructor() {
        super();
        this.loadImages(this.IMAGES_LIFEBAR_ENDBOSS);
        this.x = 570;
        this.y = 10;
        this.height = 60;
        this.width = 150;
        this.setPercentage(500);
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_LIFEBAR_ENDBOSS[this.whichStatus()];
        this.img = this.imageCache[path];
    }


    
    whichStatus() {
        if (this.percentage == 500) { return 5; }
        else if (this.percentage >= 400) { return 4; }
        else if (this.percentage >= 300) { return 3; }
        else if (this.percentage >= 200) { return 2; }
        else if (this.percentage >= 100) { return 1; }
        else { return 0; }
    }
}


