// js code here
var raceGame;
var spwanpoint=0;
var type=0;
var raceObstacles = [];
var raceScore;


function startGame() {
    raceGame = new component(40, 70, "c1.png",200,400, "image");
    raceGame.gravity = 0.00;
    raceScore = new component("30px", "Impact", "white", 150, 40, "text");
    raceGameArea.start();
}

var raceGameArea = {
    canvas : document.getElementById("Game") ,
        start : function() {
        this.canvas.width = 420;
        this.canvas.height = 500;
		this.canvas.id="demo";
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
		 window.addEventListener('keydown', function (e) {
            raceGameArea.key = e.keyCode;
        })
        window.addEventListener('keyup', function (e) {
            raceGameArea.key = false;
        })

console.log("the client script is working") ;

function downarrow() {
    accelerate(-0.2);
  }
  
  function uparrow() {
    accelerate(0.05);
  }
          },
      clear : function() {
          this.context.clearRect(0, 0, this.canvas.Width, this.canvas.Height);
      },
      stop : function() {
          clearInterval(this.interval);
      }

}
//adding obstacles
var myGameArea = {
  canvas : document.createElement("canvas"),
  start : function() {
    this.canvas.width = 480;
    this.canvas.height = 270;
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.interval = setInterval(updateGameArea, 20);
  },
  clear : function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
  stop : function() {
    clearInterval(this.interval);
  }
}

function component(width, height, color, x, y) {
  this.width = width;
  this.height = height;
  this.speedX = 0;
  this.speedY = 0;
  this.x = x;
  this.y = y;
  this.update = function() {
    ctx = myGameArea.context;
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
  this.newPos = function() {
    this.x += this.speedX;
    this.y += this.speedY;
  }
  this.crashWith = function(otherobj) {
    var myleft = this.x;
    var myright = this.x + (this.width);
    var mytop = this.y;
    var mybottom = this.y + (this.height);
    var otherleft = otherobj.x;
    var otherright = otherobj.x + (otherobj.width);
    var othertop = otherobj.y;
    var otherbottom = otherobj.y + (otherobj.height);
    var crash = true;
    if ((mybottom < othertop) ||
    (mytop > otherbottom) ||
    (myright < otherleft) ||
    (myleft > otherright)) {
      crash = false;
    }
    return crash;
  }
}

function updateGameArea() {
  if (myGamePiece.crashWith(myObstacle)) {
    myGameArea.stop();
  } else {
    myGameArea.clear();
    myObstacle.update();
    myGamePiece.newPos();
    myGamePiece.update();
  }
}

