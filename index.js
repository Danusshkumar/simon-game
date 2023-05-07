/*
rules and steps:

start the game by pressing any key:

if started write a random function to do the selection:

once done push the same in array and let the user if they are doing same and if it is not just call gameOver()

if they done properly increase level variable to ++

*/

// some variable declaration section
var gameStarted = false;
var levelNumber = 0;
var randomTracker = [];
var pivoterIndex;

//adding animation section

function addAnimationForPressed(keyValue){

    $("#" + keyValue).addClass("pressed");

    var audio = new Audio("sounds/" + keyValue + ".mp3");
    audio.play();

    setTimeout(function () {
        $("#" + keyValue).removeClass("pressed");
    },100);

}

function doAnimationForGameOver(){

    $("body").addClass("game-over");

    var audio = new Audio("sounds/wrong.mp3");
    audio.play();

    setTimeout(function () {
        $("body").removeClass("game-over");
    },100);
}

//getting keys and number section

function getKeyNumber(keyValue){
    var keyNumber;
    switch(keyValue){
        case "green":
        keyNumber = 1;
        break;
        case "red":
        keyNumber = 2;
        break;
        case "yellow":
        keyNumber = 3;
        break;
        case "blue":
        keyNumber = 4;
        break;
    }
    return keyNumber;

}

function getKeyValue(keyNumber){

    var keyValue;
    switch(keyNumber){
        case 1:
        keyValue = "green";
        break;
        case 2:
        keyValue = "red";
        break;
        case 3:
        keyValue = "yellow";
        break;
        case 4:
        keyValue = "blue";
        break;
    }
    return keyValue;
}

//functioning section

function startGame(){
    playGame();
}


function playGame(){

    levelNumber++;
    $("#level-title").text("Level " + levelNumber);


    var randomNumber = Math.floor((Math.random()) * 4) + 1;

        //before pushing we have to indicate the number
        var keyValue = getKeyValue(randomNumber);

        addAnimationForPressed(keyValue);


        randomTracker.push(randomNumber);

    // our task completed

    //setting pivoterIndex to zero
    pivoterIndex = 0;

}

function theirTurn(buttonValue){

    //if level completed then they will call playGame otherwise gameOver;
    //getting keynumber from keyvalue
    var correctBtnValue = getKeyValue(randomTracker[pivoterIndex]);
    var inputBtnValue = buttonValue;

    if(correctBtnValue === inputBtnValue){

        pivoterIndex++;
        if(pivoterIndex >= randomTracker.length){
            //we got to the next level
            setTimeout(() => {
                playGame();
            },500);
        }
    }
    else {
        gameOver();
    }

}

//game over section
function gameOver(){

    doAnimationForGameOver();
    //setting things correct
    pivoterIndex = 0;
    randomTracker = [];
    gameStarted = false;
    $("#level-title").text("Game Over, Press any key to restart!");
}


//getting input from user
$(".btn").click( function () {
    addAnimationForPressed($(this).attr("id"));
    theirTurn($(this).attr("id"));
});

//starting the game by pressing any key and redoing the same if game over
$(document).keypress( function () {

    if(gameStarted === false){
        startGame(); 
        gameStarted = true;
    }
});
