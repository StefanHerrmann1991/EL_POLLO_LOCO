class Statusbar extends DrawableObject {
    IMAGES_LIFEBAR = [
        'img/7.Marcadores/Barra/Marcador vida/azul/0_.png',
        'img/7.Marcadores/Barra/Marcador vida/azul/20_.png',
        'img/7.Marcadores/Barra/Marcador vida/azul/40_.png',
        'img/7.Marcadores/Barra/Marcador vida/azul/60_.png',
        'img/7.Marcadores/Barra/Marcador vida/azul/80_.png',
        'img/7.Marcadores/Barra/Marcador vida/azul/100_.png',        
        'img/7.Marcadores/Barra/Marcador vida/Naranja/20__1.png',
        'img/7.Marcadores/Barra/Marcador vida/Naranja/40_ .png',
        'img/7.Marcadores/Barra/Marcador vida/Naranja/60_ .png',
        'img/7.Marcadores/Barra/Marcador vida/Naranja/80_ .png',
        'img/7.Marcadores/Barra/Marcador vida/Naranja/100_ .png',        
        'img/7.Marcadores/Barra/Marcador vida/verde/20_.png',
        'img/7.Marcadores/Barra/Marcador vida/verde/40_.png',
        'img/7.Marcadores/Barra/Marcador vida/verde/60_.png',
        'img/7.Marcadores/Barra/Marcador vida/verde/80_.png',
        'img/7.Marcadores/Barra/Marcador vida/verde/100_.png']


    percentage = 100;

    constructor() {
        super();
        this.loadImages(this.IMAGES_LIFEBAR);
        this.x = 0;
        this.y = 55;
        this.height = 50;
        this.width = 150;
        this.setPercentage(this.percentage);
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_LIFEBAR[this.whichStatus()];
        this.img = this.imageCache[path];
    }

    whichStatus() {
        if (this.percentage >= 280) { return 16; }                 
        else if (this.percentage >= 260) { return 15; }
        else if (this.percentage >= 260) { return 14; }
        else if (this.percentage >= 260) { return 13; }
        else if (this.percentage >= 240) { return 12; }
        else if (this.percentage >= 220) { return 11; }
        else if (this.percentage >= 200) { return 10; }
        else if (this.percentage >= 180) { return 9; }
        else if (this.percentage >= 160) { return 8; }
        else if (this.percentage >= 140) { return 7; }
        else if (this.percentage >= 120) { return 6; }
        else if (this.percentage >= 100) {return 5; }
        else if (this.percentage >= 80) { return 4; }
        else if (this.percentage >= 60) { return 3; }
        else if (this.percentage >= 40) { return 2; }
        else if (this.percentage >= 20) { return 1; }
        else { return 0; }
    }
}


