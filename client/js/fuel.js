class Fuel {
  constructor({x,y, id}) {
    this.id = id;
    this.horizontalPos = x;
    this.verticalPos = y;
    this.width = 80;
    this.height= 100;
  }

  updatePos(x,y){
      this.horizontalPos = x;
      this.verticalPos = y;
  }

  draw(ctx) {
  ctx.beginPath();
  const img = new Image();
  img.src = "../media/icons/final fuel.png";
  img.width = this.width;
  img.height = this.height;
  ctx.drawImage(img, this.horizontalPos, this.verticalPos, img.width, img.height);

}

  
}
module.exports = Fuel;