/*
 * Create a list that holds all of your cards
 */
const icons = ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt", "fa fa-cube",
"fa fa-leaf", "fa fa-bicycle", "fa fa-bomb"];
const doubleIcons = icons.concat(icons);


// Timer function from https://github.com/ervaibhavkumar/Udacity-Memory-Game/blob/master/js/app.js
var min = 0;
var sec = 0;
var hours = 0;
var letsStop = 0;
window.onload = function() {
    setInterval(function() {
        if (letsStop !== 1) {
            sec++;
            if (sec === 60) {
                min++;
                sec = 0;
            }
            if (min === 60) {
                hours++;
                min = 0;
                sec = 0;
            }
            $('.timer').html(hours + ':' + min + ':' + sec);
            // if(letsStop === 1)
            // {
            //     break;
            // } 
            console.log(min);
            console.log(sec);
        }

    }, 1000);
};
 /* Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each cards HTML to the page
 */


const cardsContainer = document.querySelector(".deck");
//array to hold an open card
let openedCards = [];
let matchedCards= [];

/*
 * Initialize the Game
 */
function init() {
    for(let i = 0; i < doubleIcons.length; i++) {
        const card = document.createElement("li");
        card.classList.add("card");
        card.innerHTML = `<i class="${doubleIcons[i]}"></i>`;
        cardsContainer.appendChild(card);

        // Add click event to each card
        click(card);
    }

}
// Calling the Card function

card= shuffle(doubleIcons);

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */



    // creating the click Event
function click(card) {

    // Card click events
    card.addEventListener("click", function(){

        const currentCard = this;
        const previousCard = openedCards[0];

        // there is an open card
        if(openedCards.length === 1) {

            card.classList.add("open", "show","animated", "wobble", "disable");
            openedCards.push(this);
        
            // comparing two cards
            compare(currentCard, previousCard);

        } else {
        //  there is no open cards
            card.classList.add("open", "show","animated", "wobble", "disable");
            openedCards.push(this);
        }
        
    });
}

/*
 * Compare the 2 cards
 */
function compare(currentCard,previousCard) {
    if(currentCard.innerHTML === previousCard.innerHTML) {

        //if the cards matched remove the wobble class and add the rubberband class
        currentCard.classList.remove("animated" , "wobble");
        currentCard.classList.add("match","animated" ,"rubberBand");
        previousCard.classList.remove("animated" , "wobble");
        previousCard.classList.add("match","animated" ,"rubberBand" );
        

        matchedCards.push(currentCard, previousCard);

        openedCards = [];

        // CHECK IF GAME IS OVER

        gameOver();

        
    } else{
        //wait 350ms then execute this
        setTimeout(function(){
            currentCard.classList.remove("open", "show","animated", "wobble", "disable");
            previousCard.classList.remove("open", "show","animated", "wobble", "disable");
        }, 350);

        openedCards = [];
    }
    // Call Move Function
    addMove()

}

/*
 *  Check if Game is over and Display a congratulatory message
 */
function gameOver() {
    if (matchedCards.length === doubleIcons.length){
        
        //COngratulation message function from https://github.com/ervaibhavkumar/Udacity-Memory-Game/blob/master/js/app.js
        setTimeout(function() {
            $('.deck').each(function() {
                swal({
                    title: 'Congratulations',
                    type: 'success',
                    text: 'You Won the Game!!!, With ' + moves + 'Moves and You got ' + stars + ' Star(s) ,Time taken is ' + hours + ' Hours ' + min + ' Minutes and ' + sec + ' Seconds',
                    allowOutsideClick: false,
                    showCancelButton: true,
                    confirmButtonText: 'Play Again',
                    confirmButtonColor: '#2E3D49',
                    cancelButtonText: 'Close',
                    cancelButtonColor: '#FF0000'
                }).then(function() {
                    // location.reload();
                }, function(dismiss) {
                    console.log('Yes');
                });

            });
        }, 300);
        
        letsStop = 1;
            $('.timer').hide();
            $('.timer').html('0:0:0');
            $('.timer').show();
    }
};

/*
* Add Moves
*/
const movesContainer = document.querySelector(".moves");
let moves = 0;
movesContainer.innerHTML = 0;
function addMove() {
    moves++;
    movesContainer.innerHTML = moves;

    //Call Rating function
    rating();
}

/*
* Rating
*/
const starsContainer = document.querySelector(".stars");
let stars = 3;
function rating(){
    switch(moves) {
        case 18:
            starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li>
            <li><i class="fa fa-star"></i></li> <li><i class="fa fa-star-o"></i></li>`;
            stars = 2;

        break;

        case 25:
        starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li> 
        <li><i class="fa fa-star-o"></i></li> <li><i class="fa fa-star-o"></i></li>`;
        stars = 1;


    }
}

/*
* Restart Button function
*/

const restart = document.querySelector(".restart");
restart.addEventListener("click", function(){
    //Delete all Cards
    cardsContainer.innerHTML = "";
    openedCards = [];

    //Call "init"and "shuffle" function to create new cards and re-shuffle the array
    init();
    shuffle(doubleIcons);
    location.reload();
    


    // Reset Any related Variable
    matchedCards = [];
    moves = 0;
    numclicks = 0;
    movesContainer.innerHTML = moves ;
    starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li>
    <li><i class="fa fa-star"></i></li>
    <li><i class="fa fa-star"></i></li>`;
});


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


///START THE GAME FOR THE FIRST TIME
init();







