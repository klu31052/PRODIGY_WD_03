const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('resetButton');
const message = document.getElementById('message');
const playerVsPlayerButton = document.getElementById('playerVsPlayer');
const playerVsComputerButton = document.getElementById('playerVsComputer');

let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;
let isPlayerVsComputer = false;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const handleCellClick = (e) => {
    const cell = e.target;
    const cellIndex = cell.getAttribute('data-index');

    if (gameState[cellIndex] !== '' || !isGameActive) {
        return;
    }

    gameState[cellIndex] = currentPlayer;
    cell.innerText = currentPlayer;
    cell.style.pointerEvents = 'none';

    if (checkForWinner()) return;

    if (isPlayerVsComputer && currentPlayer === 'X') {
        currentPlayer = 'O';
        setTimeout(computerMove, 500); // Slight delay to mimic thinking
    } else {
        switchPlayer();
    }
};

const switchPlayer = () => {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    message.innerText = `Player ${currentPlayer}'s turn`;
};

const checkForWinner = () => {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        message.innerText = `Player ${currentPlayer} wins!`;
        isGameActive = false;
        return true;
    }

    if (!gameState.includes('')) {
        message.innerText = `It's a draw!`;
        isGameActive = false;
        return true;
    }

    return false;
};

const computerMove = () => {
    let emptyCells = [];
    gameState.forEach((cell, index) => {
        if (cell === '') emptyCells.push(index);
    });

    if (emptyCells.length === 0) return;

    const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    gameState[randomIndex] = 'O';
    cells[randomIndex].innerText = 'O';
    cells[randomIndex].style.pointerEvents = 'none';

    if (!checkForWinner()) {
        currentPlayer = 'X';
        message.innerText = `Player ${currentPlayer}'s turn`;
    }
};

const resetGame = () => {
    currentPlayer = 'X';
    gameState = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    message.innerText = `Player ${currentPlayer}'s turn`;
    cells.forEach(cell => {
        cell.innerText = '';
        cell.style.pointerEvents = 'auto';
    });
};

const setPlayerVsPlayer = () => {
    isPlayerVsComputer = false;
    resetGame();
};

const setPlayerVsComputer = () => {
    isPlayerVsComputer = true;
    resetGame();
};

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
playerVsPlayerButton.addEventListener('click', setPlayerVsPlayer);
playerVsComputerButton.addEventListener('click', setPlayerVsComputer);
