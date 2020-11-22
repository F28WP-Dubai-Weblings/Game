class Bullet {
    constructor({x,y}) {
        this.horizontalPos = x;
        this.verticalPos = y;
    }
    
    draw(ctx) {
        ctx.beginPath();
        const img = new Image();
        img.src = "https://f28wp-dubai-weblings.github.io/Game/client/media/icons/death.png";
        img.width=this.width;
        img.height = this.height;
        ctx.drawImage(img, this.horizontalPos, this.verticalPos, this.width, this.height);
    }

    /*shoot(){
        if (this.attack){
            ctx.beginPath();
            const bulletImg = new Image();
            bulletImg.src = "https://f28wp-dubai-weblings.github.io/Game/client/media/icons/bullet.PNG";
            //this.width = img.width;
            //this.height = img.height;
            this.bullet.x++;
            this.bullet.y++;
            ctx.drawImage(bulletImg, this.bullet.x, this.bullet.y, bulletImg.width, bulletImg.height);
        }
    }*/
}
