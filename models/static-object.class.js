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






