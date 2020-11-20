class Fuel {
    constructor({horizontalPos =10,verticalPos=10}) {
      this.horizontalPos = horizontalPos;
      this.verticalPos = verticalPos;
      this.width = 70;
      this.height = 40;
    }
  
    draw(ctx) {
      ctx.beginPath();
      const img = new Image();
          img.src = "https://f28wp-dubai-weblings.github.io/Game/client/media/icons/fuel.png";
          ctx.drawImage(img, this.horizontalPos, this.verticalPos, img.width, 150);
    }
}
module.exports = Fuel;