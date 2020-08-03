'use strict'
const WALL = '🟦 '
const FOOD = '.'
const EMPTY = ' ';
const POWER_FOOD = '🍩';
const CHERRY = '🍒';

var gElModalHead = document.querySelector('.modal h3');
var gBoard;
var gGame;
var gCherryInterval;
function init() {
    // console.log('hello')
    closeModal();
    gGame = {
        score: 0,
        isOn: false,
        foodOnBoardCount: 0
    }
    gBoard = buildBoard();
    createPacman(gBoard);
    createGhosts(gBoard);
    printMat(gBoard, '.board-container')
    gGame.isOn = true;

    document.querySelector('.score span').innerText = 0;

    clearInterval(gIntervalGhosts);
    gIntervalGhosts = setInterval(moveGhosts, 2000);
    putCherry();

}

function buildBoard() {
    var SIZE = 10;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD;
            if ((i === 1 && j === 1) || (i === 1 && j === SIZE - 2) ||
                (i === SIZE - 2 && j === 1) || (i === SIZE - 2 && j === SIZE - 2)) {
                board[i][j] = POWER_FOOD;
            }
            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL;
            } else {
                gGame.foodOnBoardCount++;
            }
        }
    }
    return board;
}



function updateScore(score) {
    //TODO: UPDATE GAMES SCORE
    gGame.score += score;
    console.log('score:', gGame.score);
    document.querySelector('.score span').innerText = gGame.score;
}

function putCherry() {
    gCherryInterval = setInterval(function () {
        var emptyCells = getAllEmptyCells();
        console.log('emptyCells', emptyCells)
        if (emptyCells.length === 0) {
            return;
        }
        var selectedCellLocation = getRandomEmptyCell(emptyCells);
        console.log('selectedCellLocation', selectedCellLocation)
        gBoard[selectedCellLocation.i][selectedCellLocation.j] = CHERRY;
        renderCell(selectedCellLocation, CHERRY);

    }, 15000);
}

function getAllEmptyCells() {
    var emptyCells = [];
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            if (gBoard[i][j] === '') {
                emptyCells.push({ i: i, j: j });
            }
        }
    }
    return emptyCells;
}

function getRandomEmptyCell(emptyCells) {
    var randomIdx = getRandomIntInclusive(0, emptyCells.length - 1);
    return emptyCells[randomIdx];
}



function gameOver(msg) {
    //TODO: GAME OVER
    clearInterval(gIntervalGhosts);
    clearInterval(gCherryInterval);
    gGame.isOn = false;
    openModal(msg);
}

function checkVictory() {
    if (gGame.score === gGame.foodOnBoardCount) {
        gameOver('You win!');
    }
}