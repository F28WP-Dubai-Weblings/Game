class Fuel {
    constructor({x,y}) {
      this.x = x;
      this.y = y;
      this.width = 70;
      this.height = 40;
    }
  
    draw(ctx) {
      ctx.beginPath();
      const img = new Image();
      img.src = "https://f28wp-dubai-weblings.github.io/Game/client/media/icons/fuel.png";
      ctx.drawImage(img, this.x, this.y, img.width, 150);
    }
}
module.exports = Fuel;