var score = 0;

var scoreBoard = function () {

	// Increase number by 1
	score++;
    // if the number is less than 500, run it again
       document.getElementById("scoreBoard").innerHTML="scoreBoard: " + score; {
		window.requestAnimationFrame(scoreBoard);
	}

};
scoreBoard();
