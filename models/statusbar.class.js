class Statusbar extends MovableObject {
    IMAGES_LIFEBAR = [
        'img/7.Marcadores/Barra/Marcador vida/0_.png',
        'img/7.Marcadores/Barra/Marcador vida/20_.png',
        'img/7.Marcadores/Barra/Marcador vida/40_.png',
        'img/7.Marcadores/Barra/Marcador vida/60_.png',
        'img/7.Marcadores/Barra/Marcador vida/80_.png',
        'img/7.Marcadores/Barra/Marcador vida/100_.png',
        'img/7.Marcadores/Barra/Marcador vida/120_.png',
        'img/7.Marcadores/Barra/Marcador vida/140_.png',
        'img/7.Marcadores/Barra/Marcador vida/160_.png',
        'img/7.Marcadores/Barra/Marcador vida/180_.png',
        'img/7.Marcadores/Barra/Marcador vida/200_.png',
        'img/7.Marcadores/Barra/Marcador vida/220_.png',
        'img/7.Marcadores/Barra/Marcador vida/240_.png',
        'img/7.Marcadores/Barra/Marcador vida/260_.png',
        'img/7.Marcadores/Barra/Marcador vida/280_.png',
        'img/7.Marcadores/Barra/Marcador vida/300_.png']


    percentage = 100;

    constructor() {
        super();
        this.loadImage('img/7.Marcadores/Barra/Marcador vida/100_.png');
        this.loadImages(this.IMAGES_LIFEBAR);
        this.x = 0;
        this.y = 55;
        this.height = 50;
        this.width = 150;     
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_LIFEBAR[this.whichStatus()];
        this.img = this.imageCache[path];
    }

    /**
     * The function checks the energy of the character and sets it lifebar depending on the characters energy .
     * @returns true if the energy of the player reaches certain levels.
     */

    whichStatus() {
        if (this.percentage >= 260) { return 15; }
        else if (this.percentage >= 260) { return 14; }
        else if (this.percentage >= 260) { return 13; }
        else if (this.percentage >= 240) { return 12; }
        else if (this.percentage >= 220) { return 11; }
        else if (this.percentage >= 200) { return 10; }
        else if (this.percentage >= 180) { return 9; }
        else if (this.percentage >= 160) { return 8; }
        else if (this.percentage >= 140) { return 7; }
        else if (this.percentage >= 120) { return 6; }
        else if (this.percentage >= 100) { return 5; }
        else if (this.percentage >= 80) { return 4; }
        else if (this.percentage >= 60) { return 3; }
        else if (this.percentage >= 40) { return 2; }
        else if (this.percentage >= 20) { return 1; }
        else { return 0; }
    }
}


