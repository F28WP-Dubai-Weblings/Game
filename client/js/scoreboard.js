var score = 0;

var scoreBoard = function () {

	// Increase number by 1
	score++;
    // if the number is less than 500, run it again
	if (number < 500) {
		window.requestAnimationFrame(scoreBoard);
	}

};
// Start the animation
window.requestAnimationFrame(scoreBoard);
