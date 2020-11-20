

class Liveplayers{
    constructor({id, num}){
        this.id = id;
        this.num = num;
        this.horizontalPos = 10;
        this.verticalPos = 10;
        this.score = 0;
        this.keyEvents = {  //set the default values of all relevant key events to false
            ArrowUp:   false,
            ArrowDown:  false,
            ArrowRight: false,
            ArrowLeft: false
        }; 
        this.speed = 10;
    }
    
    draw(ctx){
        ctx.beginPath();
        const img = new Image();
        if (this.num === 1){
            img.src = "https://f28wp-dubai-weblings.github.io/Game/client/media/racecar1.png";
        }
        if (this.num===2){

        }
        ctx.drawImage(img, this.horizontalPos, this.verticalPos, img.width, 150);
    }

    move(){
        if (this.keyEvents.ArrowUp) {   //move up when ArrowUp is pressed & don't let the car move above 70px (height)
            this.verticalPos -= this.speed;
        }
        if (this.keyEvents.ArrowLeft) {   //move left when ArrowLeft is pressed & set minimum horizontal position as 35px (width)
            this.horizontalPos -= this.speed;
        }

        if (this.keyEvents.ArrowDown) {  //move down when ArrowDown is pressed & don't let the car move beyond 1000px (height)
            this.verticalPos += this.speed;
        }
        if (this.keyEvents.ArrowRight) {    //move right when the ArrowRight is press & don't let the car move beyond 1020px (width)
            this.horizontalPos += this.speed;
        }
        this.draw(ctx);
    }
}

module.exports = Liveplayers;