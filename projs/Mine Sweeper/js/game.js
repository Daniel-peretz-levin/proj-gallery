'use strict'

var gBoard, gGame, startTime, currentTime, gInterval;
var gLevel = {
    size: 0,
    mines: 0,
};

function initGame() {
    gGame = {
        isOn: false,
        isLose: false,
        shownCount: 0,
        markedCount: 0,
        secsPassed: 0,
    };
    gGame.isLose = false;
    gBoard = buildBoard();
    setMinesCountBySize();
    randomMinePosition(gBoard);
    setCellsMineCount();
    renderBoard();
    console.log(gBoard);
    var elMines = document.querySelector('.mines');
    elMines.textContent = gLevel.mines;

}

function buildBoard() {
    gLevel.size = getSize();
    var board = [];
    for (var i = 0; i < gLevel.size; i++) {
        board[i] = [];
        for (var j = 0; j < gLevel.size; j++) {
            var cell = {
                minesAroundCount: null,
                isShown: false,
                isMine: false,
                isMarked: false,
            };
            board[i][j] = cell;
        }
    }
    return board;
}

function renderBoard() {
    var board = gBoard;
    var strHtml = '';
    for (var i = 0; i < board.length; i++) {
        strHtml += '<tr>';
        for (var j = 0; j < board[i].length; j++) {
            var cellClass = `${i}-${j}`;
            var cellName = `${i}-${j}`;
            strHtml += `<td class="cell ${cellClass}" id="cell${cellName}" oncontextmenu="onCellRightClick(event, this, ${i}, ${j})" onclick="cellClicked(this, ${i}, ${j})">`
            strHtml += '</td>'
        }
        strHtml += '</tr>'
    }
    var elTable = document.querySelector('.table');
    elTable.innerHTML = strHtml
}

function setCellsMineCount() {
    var board = gBoard;
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            var cell = board[i][j];
            var pos = { i: i, j: j };
            var count = minesNegsCount(board, pos);

            if (cell.isMine === true) continue;
            cell.minesAroundCount = count;
        }
    }
}

function onCellRightClick(event, elCell, i, j) {
    event.preventDefault();
    if (gLevel.mines - gGame.markedCount <= 0 && !gBoard[i][j].isMarked) return;
    gBoard[i][j].isMarked = !gBoard[i][j].isMarked;
    if (gBoard[i][j].isShown === true) return;
    if (gBoard[i][j].isMarked === true) {
        elCell.innerHTML = "🚩";
        gGame.markedCount++;
    } else {
        elCell.innerHTML = "";
        gGame.markedCount--;
    }
    var elMines = document.querySelector('.mines');
    elMines.textContent = gLevel.mines - gGame.markedCount;

}

function cellClicked(elCell, i, j) {
    if (gGame.isLose) return;
    if (gBoard[i][j].isMarked) return;
    if (gBoard[i][j].isShown) return;
    if (gGame.isOn === false) startTimer();
    gGame.isOn = true;
    var cell = gBoard[i][j];
    var pos = { i: i, j: j };
    var counter = cell.minesAroundCount
    if (cell.isMine === false) {

        cell.isShown = true;
        elCell.textContent = counter;
        elCell.style.backgroundColor = "lightblue";
        gGame.shownCount++;
        console.log("shown count is:", gGame.shownCount);
        //if minecount === 0 do  newFunction() goes to each neighbour and call cellClicked
        if (gBoard[i][j].minesAroundCount === 0) expendingNegs(pos);
    }
    else {
        cell.isShown = true;
        elCell.innerHTML = '💣';
        elCell.style.backgroundColor = "red";
        loseGame();
    }
    if (gLevel.mines === gGame.markedCount && gGame.shownCount === (gLevel.size * gLevel.size - gLevel.mines)) winGame();
    // console.log("is shown:", cell.isShown, "count negs", counter);
}
function expendingNegs(pos) {
    for (var i = pos.i - 1; i <= pos.i + 1; i++) {
        for (var j = pos.j - 1; j <= pos.j + 1; j++) {
            if (i === pos.i && j === pos.j) continue;
            if (!checkIfInBoard(gBoard, { i: i, j: j })) continue;
            var elCell = document.getElementById(`cell${i}-${j}`);
            if (gBoard[i][j].isShown === false) cellClicked(elCell, i, j);
        }
    }
}

function minesNegsCount(board, pos) {
    var count = 0;
    for (var i = pos.i - 1; i <= pos.i + 1; i++) {
        for (var j = pos.j - 1; j <= pos.j + 1; j++) {
            if (i === pos.i && j === pos.j) continue;
            if (!checkIfInBoard(board, { i: i, j: j })) continue;
            if (board[i][j].isMine === true) count++;
        }
    }
    // console.log("for pos:",pos,"the ngs count is:",count);
    return count;
}

function checkIfInBoard(board, pos) {
    return (pos.i >= 0 && pos.i < board.length &&
        pos.j >= 0 && pos.j < board[pos.i].length);
}

function randomMinePosition() {
    for (var i = 0; i < gLevel.mines; i++) {
        var selectedRow = getRandomNumber(gLevel.size);
        var selectedColumn = getRandomNumber(gLevel.size);
        var selectedCell = gBoard[selectedRow][selectedColumn];
        if (selectedCell.isMine === false) selectedCell.isMine = true;
        else i--;

    }
}

function getRandomNumber(size) {
    return Math.floor(Math.random() * size);
}

function getSize() {
    var elRadio = document.getElementsByName("size");
    for (let i = 0; i < elRadio.length; i++) {
        if (elRadio[i].checked) {
            return +elRadio[i].value;
        }
    }
}
function startTimer() {
    startTime = new Date();
    gInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
    currentTime = Math.round((new Date() - startTime) / 1000);
    var elTimer = document.querySelector('.timer');
    elTimer.textContent = currentTime;
}

function setMinesCountBySize() {
    if (gLevel.size === 4) gLevel.mines = 2;
    if (gLevel.size === 8) gLevel.mines = 12;
    if (gLevel.size === 12) gLevel.mines = 30;
}

function restartGame() {
    gGame.isOn = false;
    clearInterval(gInterval);
    var elTimer = document.querySelector('.timer');
    elTimer.textContent = 0;
    initGame();
    var elTimer = document.querySelector('.restart');
    elTimer.textContent = '😛';

}

function loseGame() {
    gGame.isLose = true;
    clearInterval(gInterval);
    var elTimer = document.querySelector('.restart');
    elTimer.textContent = '🤯';

    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard.length; j++) {
            var cell = gBoard[i][j];
            if (cell.isMine === true) {
                cell.isShown = true;
                var elCell = document.getElementById(`cell${i}-${j}`);
                console.log(elCell);
                elCell.innerHTML = '💣';
            }
        }
    }
}

function winGame() {
    clearInterval(gInterval);
    var elTimer = document.querySelector('.restart');
    elTimer.textContent = ' 😎';

}



