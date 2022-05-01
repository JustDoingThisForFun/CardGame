import Deck from './deck.js'

const CARD_VALUE_MAP = {
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "10": 10,
    "J": 11,
    "Q": 12,
    "K": 13,
    "A": 14,
}

const computerCardSlot = document.querySelector('.computer-card-slot');
const playerCardSlot = document.querySelector('.player-card-slot');
const computerDeckElement = document.querySelector('.computer-deck');
const playerDeckElement = document.querySelector('.player-deck');
const text = document.querySelector('.text');

let playerDeck, computerDeck;
let inRound = false;

document.addEventListener('click', () => {
    if (inRound) {
        cleanBeforeRound();
        flipCards();
    }
})

startGame();

function startGame() {
    const deck = new Deck();
    deck.shuffle();

    const deckMidPoint = Math.ceil(deck.numberOfCards / 2);
    playerDeck = new Deck(deck.cards.slice(0, deckMidPoint));
    computerDeck = new Deck(deck.cards.slice(deckMidPoint, deck.numberOfCards));
    inRound = false;

    cleanBeforeRound();
}

const deck = new Deck();
deck.shuffle();

computerCardSlot.appendChild(deck.card[0].getHTML());

function cleanBeforeRound() {
    inRound = false;
    text.innerText = '';
    computerCardSlot.innerHTML = '';
    playerCardSlot.innerHTML = '';
    updateDeckCount();
}

function flipCards() {
    inRound = true;

    const playerCard = playerDeck.pop();
    const computerCard = computerDeck.pop();
    playerCardSlot.appendChild(playerCard.getHTML());
    computerCardSlot.appendChild(computerCard.getHTML());

    updateDeckCount();

    if(isRoundWinner(playerCard, computerCard)) {
        text.innerText = "Win";
    }
}

function updateDeckCount() {
    computerDeckElement.innerText = computerDeck.numberOfCards;
    playerDeckElement.innerText = playerDeck.numberOfCards;
}

function isRoundWinner(cardOne, cardTwo) {
return CARD_VALUE_MAP[cardOne.value] > CARD_VALUE_MAP[cardTwo.value]
}