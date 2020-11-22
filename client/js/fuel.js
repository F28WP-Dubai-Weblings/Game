class Fuel {
  constructor({x,y}) {
    this.horizontalPos = x;
    this.verticalPos = y;
  }

  updatePos(x,y){
      this.horizontalPos = x;
      this.verticalPos = y;
      this.draw(ctx);
  }

  draw(ctx) {
  ctx.beginPath();
  const img = new Image();
  img.src = "https://f28wp-dubai-weblings.github.io/Game/client/media/icons/fuel.png";
  this.width=img.width;
  this.height = img.height;
  ctx.drawImage(img, this.horizontalPos, this.verticalPos, this.width, this.height);
  }

  
}
module.exports = Fuel;