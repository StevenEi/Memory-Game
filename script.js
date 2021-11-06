const cards = document.querySelectorAll(".memory-card");

let hasFlippedCard = false;
let firstCard;
let secondCard;
let lockBoard = false;

(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12)
        card.style.order = randomPos;
    }) 
})(); // wrapping the function in a () and ending with an (); immediately calls the function on page load

function flipCard() {
    if (lockBoard) return; // prevents user from clicking more cards before the 1.5s unfilpCard function finishes
    if (this === firstCard) return; // prevents user from matching a card with itself by double clicking on it
    this.classList.toggle("flip");

    if (!hasFlippedCard) {
        // first click
        hasFlippedCard = true;
        firstCard = this;
        return; // replaced else statement with return
    }
        // second click
        hasFlippedCard = false;
        secondCard = this;
        matchCheck();
}

function matchCheck(){
    let isMatch = firstCard.dataset.name === secondCard.dataset.name
    isMatch ? disableCards : unflipCards(); // ternary operator, (condition ? true : else). Replaces if/else function
}

// it's a match
function disableCards(){
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);

    resetBoard();
}

 // not a match
function unflipCards(){
    lockBoard = true;
    setTimeout(() =>{
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");
        resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

cards.forEach(card => card.addEventListener("click", flipCard))



