
class Liveplayers{

    constructor({id, num}){
        this.id = id;
        this.num = num;
        if (this.num === 1){
            this.horizontalPos = 57;
            this.verticalPos = 600;
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
        this.height = 200;
        this.width = 130;
        
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
            if (!this.crash) {
          
                if (this.num === 1){
                    img.src = "https://f28wp-dubai-weblings.github.io/Game/client/media/icons/car1.PNG";
                }
                if (this.num===2){
                    img.src = "https://f28wp-dubai-weblings.github.io/Game/client/media/icons/car2.PNG";
                }
                if (this.num===3){
                    img.src = "https://f28wp-dubai-weblings.github.io/Game/client/media/icons/car3.PNG";
                }

                img.width = this.width;
                img.height = this.height;
        
                ctx.drawImage(img, this.horizontalPos, this.verticalPos, img.width, img.height);
          
            }
            
    }

    move(){
        if (this.keyEvents.ArrowUp && this.verticalPos>0) {   //move up when ArrowUp is pressed & don't let the car move above 70px (height)
            this.verticalPos -= this.speed;
        }
        if (this.keyEvents.ArrowLeft && this.horizontalPos>0) {   //move left when ArrowLeft is pressed & set minimum horizontal position as 35px (width)
            this.horizontalPos -= this.speed;
        }

        if (this.keyEvents.ArrowDown && this.verticalPos <680) {  //move down when ArrowDown is pressed & don't let the car move beyond 1000px (height)
            this.verticalPos += this.speed;
        }
        if (this.keyEvents.ArrowRight && this.horizontalPos <620) {    //move right when the ArrowRight is press & don't let the car move beyond 1020px (width)
            this.horizontalPos += this.speed;
        }
        this.draw(ctx);
    }
    
}