var arr = [[], [], [], [], [], [], [], [], []];

for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
        arr[i][j] = document.getElementById(i * 9 + j);
    }
}

var board = [[], [], [], [], [], [], [], [], []];

function FillBoard(board) {
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (board[i][j] != 0) {
                arr[i][j].innerText = board[i][j];
                arr[i][j].classList.remove("wrong");
                arr[i][j].classList.remove("right");
            } else {
                arr[i][j].innerText = '';
            }
        }
    }
}

let GetPuzzle = document.getElementById('GetPuzzle');
let SolvePuzzle = document.getElementById('SolvePuzzle');

GetPuzzle.onclick = function () {
    var xhrRequest = new XMLHttpRequest();
    xhrRequest.onload = function () {
        var response = JSON.parse(xhrRequest.response);
        console.log(response);
        board = response.board;
        FillBoard(board);
    };
    xhrRequest.open('get', 'https://sugoku.onrender.com/board?difficulty=easy');
    xhrRequest.send();
};

SolvePuzzle.onclick = () => {
    sudukoSolver(board, 0, 0, 9);
};

function checkValidity(row, col, val) {
    // Check if the value is already present in the row or column
    for (let i = 0; i < 9; i++) {
        if (board[row][i] == val || board[i][col] == val)
            return false;
    }
    // Check if the value is present in the 3x3 box
    let startRow = Math.floor(row / 3) * 3;
    let startCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[startRow + i][startCol + j] == val)
                return false;
        }
    }
    return true;
}

function sudukoSolver(board, row, col, n) {
    // base case
    if (row == n) {
        //print(board, n);
        FillBoard(board);
        return true;
    }
    // if we at last col
    if (col == n) {
        return sudukoSolver(board, row + 1, 0, n);
    }
    // if cell is already filled
    if (board[row][col] != 0) {
        return sudukoSolver(board, row, col + 1, n);
    }
    for (let val = 1; val <= 9; val++) {
        // check val is safe or not?
        if (checkValidity(row, col, val)) {
            board[row][col] = val;
            // recursive call
            let aagesolpossible = sudukoSolver(board, row, col + 1, n);
            if (aagesolpossible) {
                return true;
            }
            // backtracking
            board[row][col] = 0;
        }
    }
    return false;
}