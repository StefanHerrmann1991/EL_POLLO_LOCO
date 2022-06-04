class StaticObject extends MovableObject {

  height = 480;
  width = 720;
  img;

  BACKGROUND_CHANGING = [[
    'img/5.Fondo/Capas/5.cielo_1920-1080px.png',
    'img/5.Fondo/Capas/3.Fondo3/1.png',
    'img/5.Fondo/Capas/2.Fondo2/1.png',
    'img/5.Fondo/Capas/1.suelo-fondo1/1.png'],
  [
    'img/5.Fondo/Capas/5.cielo_1920-1080px.png',
    'img/5.Fondo/Capas/3.Fondo3/2.png',
    'img/5.Fondo/Capas/2.Fondo2/2.png',
    'img/5.Fondo/Capas/1.suelo-fondo1/2.png']];


  /* Die Parameter hinter dem Constructor sind die Parameter, die man in das neue Objekt übergeben kann */

  constructor(imagePath, x) {
    super().loadImage(imagePath);
    this.x = x;
    this.y = 480 - this.height;
  }

  animateBackground() {
    for (let i = 0; i < this.BACKGROUND_CHANGING.length; i++) {
      const imagePath = this.BACKGROUND_CHANGING[i]; //muss alle 4 Bilder laden und dann die nächsten 4 jetzt wird immer eins geladen und dann verschoben.
      const x = i * 719;
      return imagePath, x;
    }
  }
}





/* also alle 719 Einheiten, muss sich ein neuer Hintergrund kommen alternierend oder alle 1438 beide Hintergründe


for (let i = 0; i < array.length; i++) {
    const element = array[i];
  
}
  }

 /*  animateBackground(x) {
    this.x = x
    if (this.x == 1438) {
    let i = this.currentImage % this.BACKGROUND_CHANGING.length;
    // let i = 0 % (Modu) 6; => 1, Rest 0 (Modu ist mathematischer Rest)
    // 0 / 6 = 0 Rest 0; 1 / 6 = 0 Rest 1 (Rest, was übrig bleibt von der Zahl) 7 / 6 = 1 Rest 1 Modu hebt immer nur den Rest auf. Deswegen fängt er hier wieder bei 1 an
    // Modu zählt 0 ,1 ,2 ,3 ,4 ,5 ,0 ....
    let path = this.BACKGROUND_CHANGING[i];
    this.img = this.imageCache[path];
    }
    this.currentImage++;}
} */


