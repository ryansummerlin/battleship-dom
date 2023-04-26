import Board from "./board.js";

let board = new Board(); // creates a new game board

// Examine the grid of the game board in the browser console.
// Create the UI of the game using HTML elements based on this grid.
console.log(board.grid);

const gridContainer = document.createElement("div");
gridContainer.setAttribute("class", "grid-container");
document.body.appendChild(gridContainer);

for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
        let gridItem = document.createElement("div");
        gridItem.setAttribute("class", "grid-item");
        gridItem.setAttribute("data-row", i);
        gridItem.setAttribute("data-col", j);
        gridItem.setAttribute("data-val", board.grid[i][j]);
        gridContainer.appendChild(gridItem);
    }
}

const resetButton = document.createElement("button");
resetButton.setAttribute("type", "button");
resetButton.setAttribute("class","reset-button");
resetButton.innerText = "Reset Game";
document.body.appendChild(resetButton);

const clickResetButton = function(event) {
    // You could just call location.reload which is a lot quicker but I think it defeats
    // the whole purpose of the exercise to do that so I've taken the long way so to speak

    let gridItems = gridContainer.children;
    for (let i = 0; i < gridItems.length; i++) {
        let box = gridItems[i];
        box.setAttribute("class", "grid-item");
        box.innerText = '';
    }

    if (board.isGameOver()) {
        const winningMessage = document.querySelector("h2");
        console.log(winningMessage);
        winningMessage.remove();
        gridContainer.addEventListener("click", clickOnGrid);
    }

    board = new Board();
}

const clickOnGrid = function(event) {
    let box = event.target;
    let row = box.dataset.row;
    let col = box.dataset.col;
    let val = board.makeHit(row, col);
    if (val === null) {
        box.classList.add("class", "miss");
    } else {
        box.classList.add("class", "hit");
        box.innerText = val;
    }

    if (board.isGameOver()) {
        const winningMessage = document.createElement("h2");
        winningMessage.innerText = "YOU WIN!";
        document.body.appendChild(winningMessage);
        gridContainer.removeEventListener("click", clickOnGrid);
    }
}

window.addEventListener("DOMContentLoaded", event => {
    gridContainer.addEventListener("click", clickOnGrid);
    resetButton.addEventListener("click", clickResetButton);
});
