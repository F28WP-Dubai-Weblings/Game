class Fuel {
  constructor({x,y}) {
    this.horizontalPos = x;
    this.verticalPos = y;
    this.width = 70;
    this.height = 40;
  }

  updatePos(x,y){
      this.horizontalPos = x;
      this.verticalPos = y;
      this.draw(ctx);
  }

  draw(ctx) {
  ctx.beginPath();
  const img = new Image();
  img.src = "../media/icons/fuelupsizsed.png";
  //this.width = img.width;
  //this.height = img.height;
  //console.log("the fuels width is " + this.width + " " + this.height);

  ctx.drawImage(img, this.horizontalPos, this.verticalPos, img.width, 150);
  }

  
}
module.exports = Fuel;