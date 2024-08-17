var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var counter = 0;
var timer = 750;
var maxScore = 0;

$(document).one("keypress", function() {
  $("h1").text("Level " + level);
  nextSequence();

});

$(".btn").on("click", function() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);
})


function nextSequence() {
  userClickedPattern = [];
  level++;
  $("h1").text("Level " + level);


  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  if(level % 3 === 0 && timer > 150){
    timer -= 50;
  }


  playSequence();

}

function playSequence(){
  counter = 0;

  const myInterval = setInterval(function() {
    //console.log(interval);

    var tempColor = gamePattern[counter];
    $("#" + tempColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(tempColor);
    counter++;

    if(counter >= gamePattern.length)
    {
      clearInterval(myInterval);
    }
  }, timer);
}


function playSound(name) {
  var soundPath = "./sounds/" + name + ".mp3";
  var sound = new Audio(soundPath);
  sound.play();
}

function animatePress(currentColor) {
  $("." + currentColor).addClass("pressed");
  setTimeout(function() {
    $("." + currentColor).removeClass("pressed")
  }, 100);
}

function checkAnswer(currentLevel) {
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel])
  {
    if(userClickedPattern.length === gamePattern.length)
    {
      setTimeout(nextSequence, 750);
    }
  }
  else{
    if(maxScore < level)
    {
      maxScore = level;
    }

    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    $("h1").text("Game Over ! Your max score is " + maxScore + ". Press any key to Restart");
    $(document).on("keypress", startOver);
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  counter = 0;
  timer = 750;

  nextSequence();
}
