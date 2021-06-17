/** @format */
const X_CLASS = "x";
const CIRCLE_CLASS = "circle";
const WIINING_COMBINATION = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let circleTurn;

const board = document.getElementById("board");
const cellElements = document.querySelectorAll("[data-cell]");
const winningMessageTextElement = document.querySelector(
  "[data-winning-message-text]"
);
const winningMessage = document.getElementById("winningMessage");
const restartBtn = document.getElementById("restartBtn");

// restartBtn.addEventListener("click", startGame);
restartBtn.addEventListener("click", () => {
  location.reload();
});

startGame();

function startGame() {
  circleTurn = false;
  cellElements.forEach((cell) => {
    // cell.classList.remove(X_CLASS);
    // cell.classList.remove(CIRCLE_CLASS);
    // cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });
  hoverBoard();
  // winningMessage.classList.remove("show");
}

function handleClick(e) {
  const cell = e.target;
  const currentCell = circleTurn ? CIRCLE_CLASS : X_CLASS;
  placemark(cell, currentCell);
  if (checkWin(currentCell)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    switchTurn();
    hoverBoard();
  }
}

function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerHTML = "DRAW..!";
    console.log("match was draw");
  } else {
    winningMessageTextElement.innerHTML = `${circleTurn ? "O's" : "X's"} WINS`;
    console.log(winningMessageTextElement.innerHTML);
  }
  winningMessage.classList.add("show");
}

function isDraw() {
  return [...cellElements].every((cell) => {
    return (
      cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    );
  });
}

function placemark(cell, currentCell) {
  cell.classList.add(currentCell);
}

function switchTurn() {
  circleTurn = !circleTurn;
}

function hoverBoard() {
  board.classList.remove(X_CLASS);
  board.classList.remove(CIRCLE_CLASS);
  if (circleTurn) board.classList.add(CIRCLE_CLASS);
  else board.classList.add(X_CLASS);
}

function checkWin(currentCell) {
  return WIINING_COMBINATION.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentCell);
    });
  });
}
