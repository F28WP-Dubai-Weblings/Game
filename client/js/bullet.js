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
     
    update(){ 
        this.horizontalPos += vx;
        this.verticalPos += vy;
    }

    generatePos(x,y){
        console.log("in generate"); 
        this.horizontalPos = x;
        this.verticalPos = y;
        angle = Math.random()*360;//2 * Math.PI * Math.random();
        vx = 5 * Math.cos(angle/180*Math.PI);
        vy = 5 * Math.sin(angle/180*Math.PI);
        //console.log("vx in generate is"+ vx);
        //console.log("angle in gen is "+ angle);
        return angle;
    }

    setup({angle}){
        vx = 5 * Math.cos(angle/180*Math.PI);
        vy = 5 * Math.sin(angle/180*Math.PI);
    }

    draw(ctx){
        //if (this.attack){
            //console.log("in draw");
            ctx.beginPath();
            const bulletImg = new Image();
            bulletImg.src = "https://f28wp-dubai-weblings.github.io/Game/client/media/icons/death.PNG";
            bulletImg.width = this.width;
            bulletImg.height = this.height;
            ctx.drawImage(bulletImg, this.horizontalPos, this.verticalPos, bulletImg.width, bulletImg.height);
            this.update();
            //console.log("image pos is " + this.horizontalPos + " " + this.verticalPos);
        //}
    }
}

module.exports = Bullet;