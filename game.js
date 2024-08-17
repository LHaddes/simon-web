var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

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

  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColor);
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
    console.log("Win");
    if(userClickedPattern.length === gamePattern.length)
    {
      setTimeout(nextSequence, 750);
    }
  }
  else{
    console.log("Loose");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    $("h1").text("Game Over, Press any key to Restart");
    $(document).on("keypress", startOver);
  }
}

function startOver() {
  level = 0;
  gamePattern = [];

  nextSequence();
}
