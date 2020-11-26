//AUTHOR NAME: RIDA @raqp2000
let angle,vx,vy;

class Bullet {
    constructor({x,y}) {
        this.horizontalPos = x;
        this.verticalPos = y;
        this.width = 80;
        this.height= 90;
        this.angle;
        this.vx;
        this.vy;
    }
     
    update(){ //constantly updates bullet position to show the bullet moving across the track
        this.horizontalPos += vx;
        this.verticalPos += vy;
    }

    generatePos(x,y){   //generate the bullets random position and velocity
        this.horizontalPos = x;
        this.verticalPos = y;
        angle = Math.random()*360;//2 * Math.PI * Math.random();
        vx = 5 * Math.cos(angle/180*Math.PI);   //set horizontal velocity
        vy = 5 * Math.sin(angle/180*Math.PI);   //set vertical velocity
        return angle;
    }

    setup({angle}){ //function to be used to setup the bullet positions for other players(not the attacker)
        vx = 5 * Math.cos(angle/180*Math.PI);
        vy = 5 * Math.sin(angle/180*Math.PI);
    }

    draw(ctx){
        
    ctx.beginPath();
    const bulletImg = new Image();
    bulletImg.src = "https://f28wp-dubai-weblings.github.io/Game/client/media/icons/death.PNG";
    bulletImg.width = this.width;
    bulletImg.height = this.height;
    ctx.drawImage(bulletImg, this.horizontalPos, this.verticalPos, bulletImg.width, bulletImg.height);
    this.update();
          
    }
}

module.exports = Bullet;
