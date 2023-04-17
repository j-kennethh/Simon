var gamePattern = []; 
var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var gameStarted = false;
var level = 0;


$("body").keydown(function () {
    if (!gameStarted) {
        gameStarted = true;
        nextSequence();
        $("#level-title").text("Level " + level);
    }
});


$(".btn").click(function () {
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
});


function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    level++;
    $("#level-title").text("Level " + level);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}


function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}


function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}


function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (currentLevel === gamePattern.length - 1) {
            setTimeout(function () {
                nextSequence();
                userClickedPattern = [];
            }, 1000);
        }  
    }
    else {
        var wrong = new Audio("sounds/wrong.mp3");
        wrong.play();

        $("#level-title").text("Game Over, Press Any Key to Restart")
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        gameStarted = false;
        level = 0;
    }
}