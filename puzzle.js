const puzzleImage = 'puzzle-image.jpg'; // Path to your puzzle image
const rows = 3; // Number of rows in the puzzle grid
const cols = 3; // Number of columns in the puzzle grid
const puzzleBoard = document.getElementById('puzzle-board');
let pieces = [];
let solved = 0;

// Create puzzle pieces
function createPuzzlePieces() {
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const piece = document.createElement('div');
            piece.classList.add('puzzle-piece');
            piece.setAttribute('draggable', true);
            piece.setAttribute('data-row', row);
            piece.setAttribute('data-col', col);
            piece.style.backgroundImage = `url(${puzzleImage})`;
            piece.style.backgroundPosition = `-${col * 100}px -${row * 100}px`;
            piece.addEventListener('dragstart', handleDragStart);
            piece.addEventListener('dragover', handleDragOver);
            piece.addEventListener('drop', handleDrop);
            pieces.push(piece);
            puzzleBoard.appendChild(piece);
        }
    }
}

// Shuffle the puzzle pieces
function shufflePuzzle() {
    const shuffledPieces = [...pieces];
    shuffledPieces.sort(() => Math.random() - 0.5); // Random shuffle

    puzzleBoard.innerHTML = ''; // Clear the board

    shuffledPieces.forEach(piece => puzzleBoard.appendChild(piece)); // Re-add shuffled pieces

    // Reset status and solved count
    solved = 0;
    document.getElementById('status').textContent = 'Puzzle is shuffled. Start solving!';
}

// Handle drag start
function handleDragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.dataset.row + ',' + e.target.dataset.col);
}

// Handle drag over
function handleDragOver(e) {
    e.preventDefault(); // Necessary to allow drop
}

// Handle drop
function handleDrop(e) {
    e.preventDefault();
    const draggedData = e.dataTransfer.getData('text/plain');
    const [draggedRow, draggedCol] = draggedData.split(',').map(Number);
    const droppedRow = e.target.dataset.row;
    const droppedCol = e.target.dataset.col;

    if (draggedRow === droppedRow && draggedCol === droppedCol) return; // Prevent invalid drop

    const draggedPiece = document.querySelector(`.puzzle-piece[data-row="${draggedRow}"][data-col="${draggedCol}"]`);
    const droppedPiece = document.querySelector(`.puzzle-piece[data-row="${droppedRow}"][data-col="${droppedCol}"]`);

    // Swap the positions of the pieces
    draggedPiece.dataset.row = droppedRow;
    draggedPiece.dataset.col = droppedCol;
    droppedPiece.dataset.row = draggedRow;
    droppedPiece.dataset.col = draggedCol;

    // Check if the puzzle is solved
    checkPuzzle();
}

// Check if the puzzle is solved
function checkPuzzle() {
    const correctPositions = pieces.filter(piece => {
        const row = parseInt(piece.dataset.row, 10);
        const col = parseInt(piece.dataset.col, 10);
        return parseInt(piece.style.backgroundPosition.split(' ')[0].slice(1) / 100, 10) === col &&
               parseInt(piece.style.backgroundPosition.split(' ')[1].slice(1) / 100, 10) === row;
    });

    if (correctPositions.length === pieces.length) {
        solved++;
        if (solved === 1) {
            document.getElementById('status').textContent = 'You solved the puzzle!';
            window.location.href = "birthdaybook.html"; // Ensure "puzzle.html" is correct relative path
            return false; // Prevent form submission and page refresh
        }
    }
}

// Initialize the puzzle
createPuzzlePieces();
shufflePuzzle();
