class Fuel {
    constructor({x,y}) {
      this.horizontalPos = x;
      this.verticalPos = y;
      this.width = 70;
      this.height = 40;
    }
  
    draw(ctx) {
      ctx.beginPath();
      const img = new Image();
      img.src = "../media/icons/fuelupsizsed.png";
      ctx.drawImage(img, this.horizontalPos, this.verticalPos, img.width, 150);
    }
}
module.exports = Fuel;