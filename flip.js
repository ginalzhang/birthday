const gameBoard = document.getElementById('gameBoard');
const cardValues = [
    'file1.png', 'file2.png', 'file3.png', 'file4.png', // Replace with your own image paths
    'file1.png', 'file2.png', 'file3.png', 'file4.png'  // Duplicate for pairs
];

let flippedCards = [];
let matchedCards = 0;

// Shuffle function to randomize the cards
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Function to create the board
function createBoard() {
    const shuffledValues = shuffleArray(cardValues);

    shuffledValues.forEach((value, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.value = value;
        card.dataset.index = index;

        // Create the card inner container to hold front and back faces
        const cardInner = document.createElement('div');
        cardInner.classList.add('card-inner');
        
        // Front of the card (image)
        const cardFront = document.createElement('div');
        cardFront.classList.add('card-front');
        cardFront.style.backgroundImage = `url(${value})`; // The image path here is set dynamically based on cardValues
        cardInner.appendChild(cardFront);

        // Back of the card (still visible when flipped)
        const cardBack = document.createElement('div');
        cardBack.classList.add('card-back');
        cardInner.appendChild(cardBack);

        card.appendChild(cardInner);
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });
}

// Function to flip a card
function flipCard() {
    if (flippedCards.length === 2 || this.classList.contains('flipped') || this.classList.contains('matched')) return;

    this.classList.add('flipped');
    flippedCards.push(this);

    if (flippedCards.length === 2) {
        checkForMatch();
    }
}

// Function to check if the two flipped cards match
function checkForMatch() {
    const [card1, card2] = flippedCards;

    if (card1.dataset.value === card2.dataset.value) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedCards += 2;
        if (matchedCards === cardValues.length) {
            setTimeout(() => {
                alert('You Win!');
            }, 500);
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
        }, 1000);
    }

    flippedCards = [];
}

// Function to reset the game
function resetGame() {
    gameBoard.innerHTML = '';
    flippedCards = [];
    matchedCards = 0;
    createBoard();
}

// Start the game by creating the initial board
createBoard();

// Optionally, add a reset button to restart the game
const resetButton = document.createElement('button');
resetButton.textContent = 'Restart Game';
resetButton.addEventListener('click', resetGame);
document.body.appendChild(resetButton);
