let angle, vx,vy;

class Bullet {
    constructor({x,y}) {
        this.horizontalPos = x;
        this.verticalPos = y;
        this.width = 80;
        this.height= 90;
    }
     
    update(){
        this.horizontalPos += vx;
        this.verticalPos += vy;
    }
    generatePos(x,y){
        this.horizontalPos = x;
        this.verticalPos = y;
        angle = 2 * Math.PI * Math.random();
        vx = speed * Math.cos(angle);
        vy = speed * Math.sin(angle);
    }

    draw(ctx){
        if (this.attack){
            ctx.beginPath();
            const bulletImg = new Image();
            bulletImg.src = "https://f28wp-dubai-weblings.github.io/Game/client/media/icons/death.PNG";
            img.width = this.width;
            img.height = this.height;
            ctx.drawImage(bulletImg, this.horizontalPos, this.verticalPos, bulletImg.width, bulletImg.height);
            this.update();
        }
    }
}

module.exports = Bullet;