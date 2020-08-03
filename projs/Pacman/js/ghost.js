'use strict'
const GHOST = '&#9781;';



var gGhosts = [];
var gIntervalGhosts;

function createGhost(board) {
    var ghost = {
        //TODO: GHOST OBJ
        location: {
            i: 3,
            j: 3
        },
        color: getRandomColor(),
        prevColor: '',
        currCellContent: ''
    }
    gGhosts.push(ghost);
    board[ghost.location.i][ghost.location.j] = GHOST;
}

function createGhosts(board) {
    //TODO: CREATE GHOSTS
    gGhosts = [];
    for (var i = 0; i < 3; i++) {
        createGhost(board);
    }
    gGame.foodOnBoardCount--;
    console.log(gGhosts);
}

function renderGhosts(){
    for (var idx = 0; idx < gGhosts.length; idx++) {
        renderCell(gGhosts[idx].location, getGhostHTML(gGhosts[idx]));
    }
}

function moveGhosts() {
    //TODO: MOVE GHOSTS
    for (var idx = 0; idx < gGhosts.length; idx++) {
        var ghost = gGhosts[idx];
        // console.log('about to move ghost');
        var moveDiff = getMoveDiff();
        var targetLoc = {
            i: ghost.location.i + moveDiff.i,
            j: ghost.location.j + moveDiff.j
        }
        var targetCell = gBoard[targetLoc.i][targetLoc.j];
        if (targetCell === WALL) continue;
        if (targetCell === GHOST) continue;
        if (targetCell === PACMAN) {
            gameOver('Game over..');
        }
        
        gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent;
        gBoard[targetLoc.i][targetLoc.j] = GHOST;
        
        renderCell(targetLoc, getGhostHTML(ghost));
        
        renderCell(ghost.location, ghost.currCellContent);

        ghost.location = targetLoc;
        ghost.currCellContent = targetCell;
        // if (targetCell === FOOD) {
        //     ghost.currCellContent = FOOD;
        // } else {
        //     ghost.currCellContent = '';
        // }
    }
}

function getMoveDiff() {
    //TODO: RANDOM GHOST MOVEMENT
    var num = getRandomIntInclusive(1,4);
    switch (num) {
        case 1:
            return {i: -1, j:0};
        case 2:
            return {i: 1, j:0};
        case 3:
            return {i: 0, j:1};
        case 4:
            return {i: 0, j:-1};
    }
}


function getGhostHTML(ghost) { 
    return `<span style="color: ${ghost.color};">${GHOST}</span>`;
}