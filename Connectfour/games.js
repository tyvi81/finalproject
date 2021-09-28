let board = document.getElementById('div');
var boardRow = document.getElementsByTagName('TR'); 
let boardCell = document.getElementsByTagName('td');
// let p1error = document.getElementById('p1error');
// let p2error = document.getElementById('p2error');
// let player1 = document.getElementById('player1');
// let player2 = document.getElementById('player2');
// let p1btn = document.getElementById('player1submit');
// let p2btn = document.getElementById('player2submit');
// let p1name = '';
// let p2name = '';
// p1btn.addEventListener('click', e => {
//     if (player1.value != '') {
//         p1name = player1.value;
//     } else {
//     }
// });
// p1btn.addEventListener('click', e => {
//     // if (player2.value)
//     name = player1.value;
// });

let boardSlot = document.getElementsByClassName('slot')
const playerTurn = document.getElementById('playerTurn');
const reset = document.getElementById('resetGame');
let currentPlayer = 1;
let uncColor = '#7BAFD4';
let dukeColor = '#003087';
let gameOver = false;


reset.addEventListener('click', (e) => {
    for (let i = 0; i < boardCell.length; i++) {
        // console.log(boardCell[i].style.backgroundColor);
        boardCell[i].style.backgroundColor = 'white';
        currentPlayer = 1;
        playerTurn.innerText = "It's UNC's turn!";
        gameOver = false;
    }
})



for (let i = 0; i < boardSlot.length; i++) {
    // console.log(boardCell[i]);
    boardSlot[i].addEventListener('click', (e) => {
        // console.log(`${e.target.parentElement.rowIndex}, ${e.target.cellIndex}`);
    });
}

Array.prototype.forEach.call(boardCell, (cell) => {
    if (gameOver == false) {
    cell.addEventListener('click', changeColor);
    cell.style.backgroundColor = 'white';
    }
});

function changeColor(e) {
    if (gameOver == false) {
    let c = e.target.cellIndex;
    let r = [];

    for (let i = 5; i> -1; i--) {
        if (boardRow[i].children[c].style.backgroundColor == 'white') {
            r.push(boardRow[i].children[c]);
            if (currentPlayer === 1) {
                r[0].style.backgroundColor = uncColor;
                if (checkWin()) {
                    playerTurn.innerText = "UNC WON!";
                    return null;
                } else if (draw()) {
                    playerTurn.innerText = "DRAW!";
                    return null;
                } else {
                    playerTurn.innerText = "It's PUKE's turn!"
                    currentPlayer = 2;
                }
            } else {
                r[0].style.backgroundColor = dukeColor;
                if (checkWin()) {
                    playerTurn.innerText = "Duke cheated :(";
                    return null;
                } else if (draw()) {
                    playerTurn.innerText = "DRAW!";
                    return null;
                } else {
                    playerTurn.innerText = "It's UNC's turn!";
                    currentPlayer = 1;
                }
            }
            return currentPlayer;
            
        }
    }
}
}

function diagonal() {
    for (let c = 0; c < 4; c++) {
        for (let r = 0; r<3;r++) {
            let dWin = colorMatchCheck(
                boardRow[r].children[c].style.backgroundColor, 
                boardRow[r + 1].children[c + 1].style.backgroundColor, 
                boardRow[r + 2].children[c + 2].style.backgroundColor, 
                boardRow[r + 3].children[c + 3].style.backgroundColor);
                // console.log(dWin);
            if (dWin) {
                return true;
            }
                // return true;
        }
        }
    }

function diagonalReverse() {
    for (let c = 0; c < 4; c++) {
        for (let r = 5; r >2; r--) {
            let dWin = colorMatchCheck(
                boardRow[r].children[c].style.backgroundColor, 
                boardRow[r - 1].children[c + 1].style.backgroundColor, 
                boardRow[r - 2].children[c + 2].style.backgroundColor, 
                boardRow[r - 3].children[c + 3].style.backgroundColor);
            if (dWin) {
                return true;
            }
        }
    }
}

function draw() {
    let r = 0;
    // console.log(boardCell.length);
    for (let i = 0; i < boardCell.length; i++) {
        // console.log(boardCell[i].style.backgroundColor);
        if (boardCell[i].style.backgroundColor !== 'white') {
            r++;
        }
    }
    if (r < 42) {
        return false;
    } else {
        gameOver = true;
        return true;
    }
}

function checkWin() {
    if (diagonalReverse() || diagonal() || verticalCheck() || horizontalCheck()) {
        gameOver = true;
        return true;
    }
}

function verticalCheck() {
    // 33
    for (let col = 0; col <7; col++) {
        for (let r = 0; r < 3; r++) {
            if (colorMatchCheck(boardRow[r].children[col].style.backgroundColor, 
            boardRow[r + 1].children[col].style.backgroundColor, 
            boardRow[r + 2].children[col].style.backgroundColor, 
            boardRow[r + 3].children[col].style.backgroundColor
            )) {
                return true;
            }
        }
    
    }
}

function horizontalCheck() {
    for (let row = 0; row <boardRow.length; row++) {
        for (let col = 0; col < 4; col++) {
            // console.log(boardRow[row].children[col].style.backgroundColor);
            if (colorMatchCheck(boardRow[row].children[col].style.backgroundColor, 
            boardRow[row].children[col + 1].style.backgroundColor, 
            boardRow[row].children[col + 2].style.backgroundColor, 
            boardRow[row].children[col + 3].style.backgroundColor
            )) {
                return true;
            }
        }
        
    }
}

function colorMatchCheck(one, two, three, four) {
    return (one === two && one === three && one !== 'white' && one === four);
}
