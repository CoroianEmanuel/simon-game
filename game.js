var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var verify = false;
var counter = 0;

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").html("Level " + level + "<br><br>Correct Clicks " + counter);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
};

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
};

function animatePress(curentColor) {
    $("#" + curentColor).addClass("pressed");

    setTimeout(function(){
        $("#" + curentColor).removeClass("pressed")
    }, 100);
};

$(document).keydown(function(){
    if(!verify){
        $("#level-title").html("Level " + level + "<br><br>Correct Clicks " + counter); 
        nextSequence();
        verify = true;
    }
});

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        counter++;
        console.log("success");
        $("#level-title").html("Level " + level + "<br><br>Correct Clicks " + counter);
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    } else {
        console.log("wrong");
        playSound("wrong");
        wrongChoice();
        startOver();
    }
};

function wrongChoice(){
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    }, 200);
    $("#level-title").html("Game Over, <br><br>Press Any Key to Restart.")
};

function startOver(){
    counter = 0;
    level = 0;
    gamePattern = [];
    verify = false;
};
