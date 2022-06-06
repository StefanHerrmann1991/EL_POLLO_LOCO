class StaticObject extends MovableObject {

  height = 480;
  width = 720;
  img;



  /* Die Parameter hinter dem Constructor sind die Parameter, die man in das neue Objekt übergeben kann */

  constructor(imagePath, x) {
    super().loadImage(imagePath);
    this.x = x;
    this.y = 480 - this.height;
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


