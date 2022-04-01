const startBtn = document.getElementById("start-button");
const restartBtn = document.getElementById("restart-button");
let gameScore = 0;

startBtn.addEventListener("click", function(){
  const gameContainer = document.getElementById("game");
//number of times the cards have been clicked
let flipCount = 0;
//set to null so the value is intentionally nothing
let card1 = null;
let card2 = null;
//when it's true it will not allow anymore clicks
let noMoreClicks = false;


 

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want to research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  //don't let the user click if noMoreClicks is set to true
  if (noMoreClicks === true) return;
  //variable for the event target
  let cardClick = event.target;
  //can't click on cards that have already been clicked
  if (cardClick.classList.contains("shown")) return;
 
  //change the background color of the card to the class the card has
  cardClick.style.backgroundColor = cardClick.classList[0];
  //if there's no value to card1 
  if (!card1){
    //add the class shown
    cardClick.classList.add("shown")
    //card1 will be set to the current clic
    card1 = cardClick;
  }
  //if there's no value to card2
  if (!card2){
    //add shown as a class
    cardClick.classList.add("shown")
    //set card2 to what yo uclicked, but if it's the same as card 1 set it to null, otherwise set it to what you clicked
    card2 = cardClick === card1 ? null : cardClick;
  }
  //if the user has chosen both cards
  if (card1 !== null && card2 !== null){
    //set noMoreClicks to true since they've turned over 2 cards
    noMoreClicks = true;
    //if card1 and card2 are the same color...
    if (card1.className === card2.className){
      //add 2 to flipCount;
      flipCount += 2;
      gameScore += 2;
      document.getElementById("score").innerText = "Score: " + gameScore;
      //remove the ability to click on card 1 or 2
      card1.removeEventListener ("click", handleCardClick);
      card2.removeEventListener ("click", handleCardClick);
      //prepare variables for another round of clicks
      card1 = null;
      card2 = null;
      //set noMoreClicks to false so users can click again.
      noMoreClicks = false;
      //if card 1 and card 2 don't match, set a timer for 1 second and execute the function inside
    } else{ setTimeout(function(){
      gameScore += 2;
      document.getElementById("score").innerText = "Score: " + gameScore;
      //set the background color to nothing so they flip back over
      card1.style.backgroundColor = '';
      card2.style.backgroundColor = '';
      //remove the shown class
      card1.classList.remove("shown");
      card2.classList.remove("shown");
      //set them to null so they don't have a value
      card1 = null;
      card2 = null;
      //set noMoreClicks to false
      noMoreClicks = false;
    }, 1000)

    }
    }
  }

  restartBtn.addEventListener("click", function(){
    window.location.reload();
  })


// when the DOM loads
createDivsForColors(shuffledColors);
})