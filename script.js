const board = document.getElementById("board");
const message = document.getElementById("message");
let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            message.textContent = `Игрок ${gameBoard[a]} победил!`;
            return true;
        }
    }
    if (!gameBoard.includes("")) {
        message.textContent = "Ничья!";
        return true;
    }
    return false;
}

function handleClick(index) {
    if (gameBoard[index] || message.textContent) return;
    gameBoard[index] = currentPlayer;
    renderBoard();
    if (!checkWinner()) {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
}

function renderBoard() {
    board.innerHTML = "";
    gameBoard.forEach((cell, index) => {
        const div = document.createElement("div");
        div.classList.add("cell");
        if (cell) div.classList.add("taken");
        div.textContent = cell;
        div.onclick = () => handleClick(index);
        board.appendChild(div);
    });
}

function resetGame() {
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    message.textContent = "";
    renderBoard();
}

renderBoard();
