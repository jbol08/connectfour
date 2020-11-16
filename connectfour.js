const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])



function makeBoard() {
for(let y = 0; y < HEIGHT; y++){
    board.push(Array.from({length : WIDTH}));
}
}

function makeHtmlBoard() {
  
  const board = document.getElementById('board');
   //creating a top row for the "game piece" to start at and creating an event to listen for a click
  const top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  board.append(top);

  //adding table data for each column, giving an id to each cell based on postioning
  //adding all tds to row
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    board.append(row);
  }
}

function findSpotForCol(x) {  
for(let y = HEIGHT - 1; y >= 0; y--){
    if(!board[y][x]){
        return y;
    }
}
  return null;
}

function placeInTable(y, x) {
 const piece = document.createElement('div');
 piece.classList.add('piece');
 piece.classList.add(`p${currPlayer}`);
 const getCircle = document.getElementById(`${y}-${x}`);
 getCircle.append(piece);
}



function endGame(msg) {

  setTimeout(function(){
    alert(msg);
    },300);
}  


function handleClick(evt) {

  const x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  const y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  board[y][x] = currPlayer;
  placeInTable(y, x);
  

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  if(board.every(row => row.every(cell => cell))) {
    return endGame('Tie Game! Try Again');
  }

  // switch players
  currPlayer === 1 ? (currPlayer = 2) : (currPlayer = 1);
}

//reset button
const resetButton = document.getElementById('reset-button');
resetButton.addEventListener('click',function(){
    document.location.href = "";
});

function checkForWin() {
  function _win(cells) {
   
    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

//iterating over the entire game board and looks for 4 of the same color in any direction if any of the arrays contain a direction then returning true to declare winner
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      var horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      var vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      var diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      var diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();