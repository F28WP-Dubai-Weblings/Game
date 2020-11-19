class Liveplayers{
    constructor({id}){
        this.id = id;
        this.horizontalPos = 10;
        this.verticalPos = 10;
        this.score = 0;
        this.movement = {
            ArrowUp: false,
            ArrowDown: false,
            ArrowRight: false,
            ArrowLeft: false
        };
        this.acceleration = 10;
    }
    
    draw(ctx){
        ctx.beginPath();
        ctx.fillStyle = "red";
        ctx.fillRect(this.horizontalPos, this.verticalPos, 50, 50);
    }
}

export default Liveplayers;
