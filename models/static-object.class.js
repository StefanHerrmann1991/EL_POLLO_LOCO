class StaticObject extends MovableObject {
 
  height = 480;
  width = 720;
  img;

  constructor(imagePath, x) {
    super().loadImage(imagePath);
    this.x = x;
    this.y = 480 - this.height;
  }
}