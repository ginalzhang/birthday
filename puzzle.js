const puzzleContainer = document.getElementById('puzzleContainer');
const imageSrc = document.createElement('img');
img.src = 'https://www.fcbarcelona.com/fcbarcelona/photo/2022/11/18/ceae25ad-716b-4c57-b22d-688c8712005a/mini_SPAIN-BALDE-IN.png';
const numRows = 4; // Number of rows in the puzzle
const numCols = 4; // Number of columns in the puzzle

let pieces = [];
let imageWidth, imageHeight;

// Function to load the image and get its dimensions
function loadImage() {
    const img = new Image();
    img.src = imageSrc;

    img.onload = () => {
        imageWidth = img.width;
        imageHeight = img.height;
        createPuzzle(imageWidth, imageHeight);
    };
}

// Function to create the puzzle
function createPuzzle(width, height) {
    pieces = [];
    puzzleContainer.innerHTML = ''; // Clear the puzzle container

    puzzleContainer.style.gridTemplateColumns = `repeat(${numCols}, 1fr)`;  // Set grid columns
    puzzleContainer.style.gridTemplateRows = `repeat(${numRows}, 1fr)`;  // Set grid rows

    const pieceWidth = width / numCols;
    const pieceHeight = height / numRows;

    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
            const piece = document.createElement('div');
            piece.classList.add('piece');

            // Set the background image for the piece (cut it into smaller pieces)
            piece.style.backgroundImage = `url(${imageSrc})`;
            piece.style.backgroundPosition = `-${col * pieceWidth}px -${row * pieceHeight}px`; // Position the background for each piece

            piece.setAttribute('data-row', row);
            piece.setAttribute('data-col', col);

            // Set the size of each piece
            piece.style.width = `${pieceWidth}px`;
            piece.style.height = `${pieceHeight}px`;

            // Make the piece draggable
            piece.setAttribute('draggable', true);
            piece.addEventListener('dragstart', handleDragStart);
            piece.addEventListener('dragover', handleDragOver);
            piece.addEventListener('drop', handleDrop);
            piece.addEventListener('dragenter', handleDragEnter);
            piece.addEventListener('dragleave', handleDragLeave);

            puzzleContainer.appendChild(piece);
            pieces.push(piece);
        }
    }

    // Shuffle the pieces by randomizing their positions in the container
    shufflePieces();
}

// Shuffle the puzzle pieces
function shufflePieces() {
    pieces.forEach(piece => {
        const randomTop = Math.floor(Math.random() * numRows) * (imageHeight / numRows);
        const randomLeft = Math.floor(Math.random() * numCols) * (imageWidth / numCols);

        piece.style.top = `${randomTop}px`;
        piece.style.left = `${randomLeft}px`;
        piece.setAttribute('data-pos', randomTop + "," + randomLeft); // Set initial random position
    });
}

// Handle drag start
function handleDragStart(e) {
    e.dataTransfer.setData('piece', e.target.getAttribute('data-pos'));
}

// Handle drag over (allow drop)
function handleDragOver(e) {
    e.preventDefault();
}

// Handle drop
function handleDrop(e) {
    e.preventDefault();

    const draggedPiecePos = e.dataTransfer.getData('piece');
    const draggedPiece = document.querySelector(`[data-pos="${draggedPiecePos}"]`);

    const targetPiece = e.target;

    // Swap positions of the dragged piece and target piece
    const draggedPiecePosArr = draggedPiecePos.split(',');
    const targetPiecePosArr = targetPiece.getAttribute('data-pos').split(',');

    draggedPiece.style.top = targetPiecePosArr[0] + 'px';
    draggedPiece.style.left = targetPiecePosArr[1] + 'px';
    targetPiece.style.top = draggedPiecePosArr[0] + 'px';
    targetPiece.style.left = draggedPiecePosArr[1] + 'px';

    draggedPiece.setAttribute('data-pos', targetPiecePosArr);
    targetPiece.setAttribute('data-pos', draggedPiecePos);
}

// Check if the puzzle is solved
function checkPuzzle() {
    const correctPos = pieces.every(piece => {
        const row = piece.getAttribute('data-row');
        const col = piece.getAttribute('data-col');
        const pos = piece.getAttribute('data-pos').split(',');

        return pos[0] === row * (imageHeight / numRows) && pos[1] === col * (imageWidth / numCols);
    });

    if (correctPos) {
        setTimeout(() => {
            alert('Puzzle Solved!');
        }, 500);
    }
}

// Reset puzzle
function resetPuzzle() {
    loadImage(); // Re-load the image and reset the puzzle
}

loadImage(); // Initialize puzzle on page load
