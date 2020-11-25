
class Liveplayers{

    constructor({id, num}){
        this.id = id;
        this.num = num;
        if (this.num === 1){
            this.horizontalPos = 57;
        }
        if (this.num===2){
            this.horizontalPos = 275;
        }
        if (this.num===3){
            this.horizontalPos = 506;
        }

        this.verticalPos = 680;
        this.finalScore = 0;
        this.score = 0;
        this.keyEvents = {  //set the default values of all relevant key events to false
            ArrowUp:   false,
            ArrowDown:  false,
            ArrowRight: false,
            ArrowLeft: false
        }; 
        this.speed = 10;
        this.width= undefined;
        this.height = 200;
        this.width = 150;
        
        //this.health = 100; //set default health
        this.crash = false;

        //player attack properties
        this.attack = false;
        this.bull_angle = 10; //player's default shoot angle
        this.bull_vx = 0; //set player bullet's default horizontal velocity
        this.bull_vy = 0; //set player bullet's default vertical velocity
    }
    
    draw(ctx){
       
            ctx.beginPath();
            const img = new Image();
            if (this.crash) {
                img.src = "https://f28wp-dubai-weblings.github.io/Game/client/media/icons/explosion.GIF";
            }
            else {
                if (this.num === 1){
                    img.src = "https://f28wp-dubai-weblings.github.io/Game/client/media/icons/blackCar.png";
                }
                if (this.num===2){
                    img.src = "https://f28wp-dubai-weblings.github.io/Game/client/media/icons/blueCar.png";
                }
                if (this.num===3){
                    img.src = "https://f28wp-dubai-weblings.github.io/Game/client/media/icons/redCar.png";
                }

                img.width = this.width;
                img.height = this.height;
        
                ctx.drawImage(img, this.horizontalPos, this.verticalPos, img.width, img.height);
            }
        
            
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