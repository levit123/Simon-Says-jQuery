$(function() {
	var colorArray = ['red', 'green', 'blue', 'yellow'];
	var color = $('#colors div');
	var start = $('#start');
	var gameConsole = $('.console');
	var gameState = 'waiting';
	var gameSequence = new Array();
	var level = 1;
	var flashNo;
	var clickedNo;

	function lightSequence() {
		/*get a random number between 0 and 3*/
		var randomNo = Math.floor(Math.random() * 4);
		/*add the color from colorArray to the gameSequence array*/
		gameSequence[level - 1] = colorArray[randomNo];
		simonSays();
	}

	function startFlashLight(num) {
		/*assign the color string in the gameSequence array to a variable*/
		var flashColor = gameSequence[num];
		/*Use the variable to target the HTML element with the corresponding ID
		and apply the fade out effect*/
		$('#' + flashColor).fadeOut(150);
		endFlashlight(num);
	}

	function endFlashlight(num) {
		/*assign the color string in the gameSequence array to a variable*/
		var flashColor = gameSequence[num];
		/*use the variable to target the HTML element with the corresponding ID
		and apply the fade in effect*/
		$('#' + flashColor).fadeIn(150);
	}

	var simonSays = function() {
		/*if flashNo is less than level, start the flashlight sequence*/
		if (flashNo < level) {
			var on = setTimeout(function() {
				var off = setTimeout(function() {
					simonSays();
					flashNo++;
				}, 500);
				startFlashLight(flashNo);
			}, 500);
		}
		/*otherwise, change the gameState variable and switch to the users turn*/
		else {
			gameState = 'playing';
			$('body').addClass('playing');
			gameConsole.text('Your turn...');
			clearTimeout(on);
		}
	};

	color.click(function() {
		if(gameState == 'playing') {
			/*store the ID of the clicked object in selectedSquare variable*/
			var selectedSquare = $(this).attr('id');

			/*compare selectedSquare to the gameSequence array item*/
			if (gameSequence[clickedNo] == selectedSquare) {
				/*check if clickedNo matches the current level value - 1*/
				if (clickedNo == level - 1) {
					/*change the gameState to waiting*/
					gameState = 'waiting';
					/*remove the playing class from the HTML body element*/
					$('body').removeClass('playing');
					/*Hide the HTML element with the console class*/
					gameConsole.hide();
					/*show the start button*/
					$('#start').show();
					/*increase the value of level by 1*/
					level++;
					start.text('Go to level ' + level);
				}
				/*increase the value of clickedNo by 1*/
				clickedNo++;
			}
			/*if the selectedSquare and gameSequence array item do not match,
			end the game*/
			else {
				/*switch game state to waiting*/
				gameState = 'waiting';
				/*Remove the playing class from the HTML element with the console class*/
				$('body').removeClass('playing');
				/*Show the game over text in the HTML element with the console class*/
				gameConsole.text('GAME OVER');
				/*show the start button*/
				start.show();
				/*change the start button to Play Again*/
				start.text('Play Again');
				/*add the game-over class to the body element*/
				$('body').addClass('game-over');
				/*hide the HTML element with the level ID*/
				$('#level').hide();
				/*reset the gameSequence array*/
				gameSequence = new Array();
				/*reset the value of level to begin at level 1*/
				level = 1;
			}
		}
	});

	var init = function() {
		/*once the button is clicked, hide the button*/
		start.hide();
		/*show the HTML element with the console ID*/
		gameConsole.show();
		/*show the HTML element with the level ID*/
		$('#level').text('Level ' + level);
		/*set the initial values of the flashNo and clickedNo variables*/
		flashNo = 0;
		clickedNo = 0;
		/*display the "Simon Says..." text in the HTML element with
		the console ID*/
		gameConsole.text('Simon says...');
		/*This will remove the game-over class in case the user is starting over*/;
		$('body').removeClass('game-over');
		/*call the lightSequence function*/
		lightSequence();
	}
	/*calling the init function when the start button is clicked*/
	start.click(init);
});
