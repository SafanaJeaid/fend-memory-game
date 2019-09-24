// Globale Varibals

// For cards
var flippedCards = [];
var matchedCards = [];
const cardIcons = ["fa fa-anchor", "fa fa-bicycle", "fa fa-cube", "fa fa-diamond",
    "fa fa-leaf", "fa fa-paper-plane-o","fa fa-bolt", "fa fa-bomb", "fa fa-bicycle",
    "fa fa-cube", "fa fa-diamond", "fa fa-leaf", "fa fa-paper-plane-o",
    "fa fa-anchor", "fa fa-bolt", "fa fa-bomb"];
const deck = document.querySelector('.deck');

// For moves
let moves = 0;
const movesCount = document.querySelector(".moves");

// For rating
const stars = document.querySelector('.stars');

// For timer
let seconds = 0;
let minutes = 0;
let timeCount;
const timer = document.querySelector(".timer");
const minuteTimer = document.querySelector(".minute");
const secondsTimer = document.querySelector(".seconds");
let isTimerOn = false;

// For the restart icon
const restart = document.querySelector(".restart");

// For the winning message "modal"
const modal = document.querySelector('.modal');
const timeFinished = document.querySelector('.final-time');
const ratingFinished = document.querySelector('.final-rating');
const movesFinished = document.querySelector('.final-moves');
const playAgain = document.querySelector('.play-again');

// This function will add the cards to the deck dynamically
function generateCards(){
    // Variable that has the card icons and shuffles them
    let shuffledCards = shuffle(cardIcons);

    // for loop to add each card to the deck
    for(let i = 0; i < shuffledCards.length; i++){
        const list = document.createElement('li');
        list.classList.add('card');
        list.innerHTML = `<i class="${shuffledCards[i]}"></i>`;
        deck.appendChild(list);
    }
 }

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

// This is the start of the game, the cards will be added and will
// listen for clicks
function startGame(){
    generateCards();
    clickedOnCards();
 }

// To start the game
startGame();

function clickedOnCards(){
    var allCards = document.querySelectorAll('.card');
    
    // The loops through all cards and add an event listener to each card
    allCards.forEach(function(card){
        card.addEventListener('click',function(e){
            if (!card.classList.contains("open","show","matched")){
                // To only start the timer once
                if (isTimerOn == false){
                    timeCounter();
                    isTimerOn = true;
                }
                // Adds the opened card to an array
                flippedCards.push(card);
                card.classList.add('open', 'show');
            }
            // Takes two flipped cards and compares them
            if (flippedCards.length == 2){
                // The moves will be increases with every 2 cards flipped
                movesCounter();
                // If the innerHTML of the two cards in the array is equal, it is a match
                if(flippedCards[0].innerHTML === flippedCards[1].innerHTML){
                 foundMatch();
            }else{
                // Otherwise, not a match 
                setTimeout(notMatched,600);
            }
            winningMessage();
            }
        });
 });
 }

function foundMatch(){
    // Add a match to the card's class list
    flippedCards[0].classList.add('match');
    flippedCards[1].classList.add('match');
    // Both cards will be added to the matched card array
    matchedCards.push(flippedCards[0]);
    matchedCards.push(flippedCards[1]);
    // Empty the flipped cards array since it only compares two cards
    flippedCards = [];
 }

function notMatched(){
    // Remove the open and show from the class list so it will be flipped over again
    flippedCards.forEach(function(card) {
        card.classList.remove('open','show');
    });
    flippedCards = [];
 }

function movesCounter(){
    // Increament the moves by one everytime two cards are opened
    moves++;
    // Updated the moves in the score panel
    movesCount.innerHTML = `${moves}`;
    // Call the game rating since it depends on the number of moves
    gameRating();
 }

function gameRating(){
    // Remove a star if the moves has reached 12
    if (moves == 12){
        stars.removeChild(stars.children[0]);
    }
    // Remove another star if the moves reached 24
    if (moves == 24){
        stars.removeChild(stars.children[0]);
    }
 }

function timeCounter(){
    // There's a delay when starting the timer, so this give it a push
    if (seconds == 0){
        seconds++;
    }
    // Starting the timer and showing it on the score panel
    timeCount = setInterval(function () {
        if (minutes < 10){
          minuteTimer.innerHTML = ` 0${minutes} `;
        }else{
          minuteTimer.innerHTML = ` ${minutes} `;
        }
        if (seconds < 10){
          secondsTimer.innerHTML = ` 0${seconds} `;  
        }else{
          secondsTimer.innerHTML = ` ${seconds} `;
        }
        // To update the seconds to minutes
        seconds++;
        if (seconds == 60) {
            minutes++;
            seconds = 0;
        } 
    }, 1000);
 }

function winningMessage(){
    // Once the matched cards array reached 16 that means all cards are matched
    if(matchedCards.length == 16){
        // Display the score on the message
        ratingFinished.innerHTML = stars.innerHTML;
        movesFinished.innerHTML = movesCount.innerHTML;
        timeFinished.innerText = timer.innerText;
        // Stop the timer
        clearInterval(timeCount);
        // Display the message
        modal.style.display = 'block';
        // Listener to the play again button, it restart the game and hides the message
        playAgain.addEventListener('click', function(s){
            restartGame();
            modal.style.display = 'none';
        });
    }
}

// Clears the deck from cards for restarting purposes
function clearDeck() {
    deck.innerHTML = '';
  }

// To restart the game everything is cleared and the game is started again
function restartGame(){
    clearDeck();
    startGame();
    clearInterval(timeCount);
    isTimerOn = false;
    seconds=0;
    minutes=0;
    secondsTimer.innerHTML = ` 0${seconds} `;
    minuteTimer.innerHTML = ` 0${minutes} `;
    flippedCards = [];
    matchedCards = [];
    moves = 0;
    movesCount.innerHTML = `${moves}`;
    stars.innerHTML = '';
    stars.innerHTML += '<li><i class="fa fa-star"></i></li>';
    stars.innerHTML += '<li><i class="fa fa-star"></i></li>';
    stars.innerHTML += '<li><i class="fa fa-star"></i></li>';
 }

// Event listener to the restart button that calls the restart function 
restart.addEventListener('click', restartGame);
