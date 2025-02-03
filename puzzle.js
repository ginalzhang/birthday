const puzzleContainer = document.getElementById('puzzleContainer');
const imageSrc = 'file1.png'; // Replace with your image file path

const puzzleSize = 4; // 4x4 puzzle, adjust as needed

let pieces = [];

// Function to create puzzle pieces from the image
function createPuzzle() {
    pieces = [];
    puzzleContainer.innerHTML = ''; // Clear the puzzle container

    for (let row = 0; row < puzzleSize; row++) {
        for (let col = 0; col < puzzleSize; col++) {
            const piece = document.createElement('div');
            piece.classList.add('piece');

            // Set the background image for the piece (cut it into smaller pieces)
            piece.style.backgroundImage = `url(${imageSrc})`;
            piece.style.backgroundPosition = `-${col * 100}px -${row * 100}px`; // Position the background image for each piece
            piece.setAttribute('data-row', row);
            piece.setAttribute('data-col', col);

            // Make each piece draggable
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

    // Shuffle the pieces by randomizing their position in the container
    shufflePieces();
}

// Shuffle the puzzle pieces
function shufflePieces() {
    pieces.forEach(piece => {
        const randomTop = Math.floor(Math.random() * (puzzleSize)) * 100;
        const randomLeft = Math.floor(Math.random() * (puzzleSize)) * 100;

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

        return pos[0] === row * 100 && pos[1] === col * 100;
    });

    if (correctPos) {
        setTimeout(() => {
            alert('Puzzle Solved!');
        }, 500);
    }
}

// Reset puzzle
function resetPuzzle() {
    createPuzzle();
}

createPuzzle(); // Initialize puzzle on page load
