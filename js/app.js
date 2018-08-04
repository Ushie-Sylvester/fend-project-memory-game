/*
 * Create a list that holds all of your cards
 */
const icons = ["fa fa-diamond", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-paper-plane-o", 
"fa fa-anchor", "fa fa-anchor", "fa fa-bolt", "fa fa-bolt", "fa fa-cube", "fa fa-cube", 
"fa fa-leaf", "fa fa-leaf", "fa fa-bicycle", "fa fa-bicycle", "fa fa-bomb", "fa fa-bomb"];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */


const cardsContainer = document.querySelector(".deck");
//array to hold an open card
let openedCards = [];
let matchedCards= [];

/*
 * Initialize the Game
 */
function init() {
    for(let i = 0; i < icons.length; i++) {
        const card = document.createElement("li");
        card.classList.add("card");
        card.innerHTML = `<i class="${icons[i]}"></i>`;
        cardsContainer.appendChild(card);

        // Add click event to each card
        click(card);
    }

}
// Calling the Card function

card= shuffle(icons);

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
    if (matchedCards.length === icons.length){
        
        //COngratulation message function from https://github.com/ervaibhavkumar/Udacity-Memory-Game/blob/master/js/app.js
        setTimeout(function() {
            $('.deck').each(function() {
                swal({
                    title: 'Congratulations',
                    type: 'success',
                    text: 'You Won the Game!!!, With ' + moves + 'Moves and You got ' + stars + ' Star(s)', // Time taken is ' + hours + ' Hours ' + min + ' Minutes and ' + sec + ' Seconds',
                    allowOutsideClick: false,
                    showCancelButton: true,
                    confirmButtonText: 'Play Again',
                    confirmButtonColor: '#2E3D49',
                    cancelButtonText: 'Close',
                    cancelButtonColor: '#FF0000'
                }).then(function() {
                    location.reload();
                }, function(dismiss) {
                    console.log('Yes');
                });

            });
        }, 300);
        
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

    //Call "init" function to create new cards
    init();

    // Reset Any related Variable
    matchedCards = [];
    moves = 0;
    movesContainer.innerHTML = moves ;
    starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li>
    <li><i class="fa fa-star"></i></li>
    <li><i class="fa fa-star"></i></li>`;
})


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







