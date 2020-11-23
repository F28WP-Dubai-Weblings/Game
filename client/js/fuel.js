class Fuel {
  constructor({horizontalPos, verticalPos}) {
    this.horizontalPos = horizontalPos;
    this.verticalPos = verticalPos;
    this.width = 80;
    this.height= 100;
    this.used = false;
  }

  draw(ctx) {
  if (!this.used){
    ctx.beginPath();
    const fuelImg = new Image();
    fuelImg.src = "https://f28wp-dubai-weblings.github.io/Game/client/media/icons/fuel.png";
    fuelImg.width = this.width;
    fuelImg.height = this.height;

    ctx.drawImage(fuelImg, this.horizontalPos, this.verticalPos, fuelImg.width, fuelImg.height);}
  } 
}
module.exports = Fuel;