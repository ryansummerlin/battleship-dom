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


window.addEventListener("DOMContentLoaded", event => {
    gridContainer.addEventListener("click", event => {
        let box = event.target;
        // [row, col] = [box.dataset.row, box.dataset.col];
        let row = box.dataset.row;
        let col = box.dataset.col;
        let val = board.makeHit(row, col);
        if (val === null) {
            box.setAttribute("class", "miss");
        } else {
            box.setAttribute("class", "hit");
            box.innerText = val;
        }
    });
});
