class Statusbar extends DrawableObject {
    IMAGES_LIFEBAR = [
        'img/7.Marcadores/Barra/Marcador vida/azul/0_.png',
        'img/7.Marcadores/Barra/Marcador vida/azul/20_.png',
        'img/7.Marcadores/Barra/Marcador vida/azul/40_.png',
        'img/7.Marcadores/Barra/Marcador vida/azul/60_.png',
        'img/7.Marcadores/Barra/Marcador vida/azul/80_.png',
        'img/7.Marcadores/Barra/Marcador vida/azul/100_.png']

    IMAGES_LIFEBAR_ENDBOSS = [
        'img/7.Marcadores/live_endboss/0_.png  ',
        'img/7.Marcadores/live_endboss/20_.png ',
        'img/7.Marcadores/live_endboss/40_.png ',
        'img/7.Marcadores/live_endboss/60_.png ',
        'img/7.Marcadores/live_endboss/80_.png ',
        'img/7.Marcadores/live_endboss/100_.png']


    percentage = 100;

    constructor() {
        super();
        this.loadImages(this.IMAGES_LIFEBAR);
        this.loadImages(this.IMAGES_LIFEBAR_ENDBOSS);
        this.x = 0;
        this.y = 0;
        this.height = 50;
        this.width = 150;
        this.setPercentage(100);
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_LIFEBAR[this.whichStatus()];
        this.img = this.imageCache[path];
    }

    /*     setPercentageEndboss(percentage) {
            this.percentage = percentage;
            let path = this.IMAGES_LIFEBAR_ENDBOSS[this.whichStatus()];
            this.img = this.imageCache[path];
        }
     */

    whichStatus() {
        if (this.percentage == 100) { return 5; }
        else if (this.percentage > 80) { return 4; }
        else if (this.percentage > 60) { return 3; }
        else if (this.percentage > 40) { return 2; }
        else if (this.percentage > 20) { return 1; }
        else { return 0; }
    }
}



/* 
    lifebar() {
        switch (this.percentage) {
            case 0:
                return 5;
                break;
            case 20:
                return 4;
                break;
            case 40:
                return 3;
                break;
            case 60:
                return 2;
                break;
            case 80:
                return 1;
                break;
            case 100:
                return 0;
                break;
        }
    } */