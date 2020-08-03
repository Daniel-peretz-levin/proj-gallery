'use strict'
const PACMAN = '&#9786;';

// const SUPER_PACMAN = '&#9786;';
var isSuper = false;
var deadGhosts= [];

var gPacman = null;
function createPacman(board) {
    //TODO: CREATE PACMAN
    gPacman = {
        location: {
            i: 5,
            j: 5
        }
    }
    gGame.foodOnBoardCount--;
    board[gPacman.location.i][gPacman.location.j] = PACMAN;
}


function movePacman(ev) {
    if (!gGame.isOn) return;
    //TODO: MOVE PACMAN
    var targetLoc = getNextLocation(ev);
    if (!targetLoc) return;
    var targetCell = gBoard[targetLoc.i][targetLoc.j];
    console.log(targetCell);
    if (targetCell === WALL) return;
    else if (targetCell === FOOD) {
        updateScore(1);
    }else if (targetCell === CHERRY) {
        updateScore(15);
    } else if (targetCell === POWER_FOOD) {
        if (isSuper) return;
        updateScore(1);
        superPower();
        renderGhosts();
    } else if (targetCell === GHOST) {
        if (isSuper) {
            var ghostIdx = getGhostIdxFromLoc(targetLoc);
            var deadGhost = gGhosts.splice(ghostIdx, 1)[0];
            deadGhosts.push(deadGhost);
        } else {
            gameOver('Game over..');
            return;
        }
    }

    gBoard[targetLoc.i][targetLoc.j] = PACMAN;
    gBoard[gPacman.location.i][gPacman.location.j] = '';

    renderCell(targetLoc, PACMAN);
    renderCell(gPacman.location, '');

    gPacman.location = targetLoc;

    checkVictory();
}

function getNextLocation(ev) {
    //TODO: GET NEXT LOCATION FROM KEYBOARD
    var moveDiff = getPlayerMoveDiff(ev);
    if (!moveDiff) return;
    return {
        i: gPacman.location.i + moveDiff.i,
        j: gPacman.location.j + moveDiff.j
    }
}

function getPlayerMoveDiff(ev) {
    switch (ev.key) {
        case 'ArrowUp':
            return { i: -1, j: 0 };
        case 'ArrowDown':
            return { i: 1, j: 0 };
        case 'ArrowRight':
            return { i: 0, j: 1 };
        case 'ArrowLeft':
            return { i: 0, j: -1 };
    }
}

function superPower() {
    isSuper = true;
    //// loop on gGhosts and change their color to 'blue' (save their prev color)
    for (var i = 0; i < gGhosts.length; i++) {
        var currGhost = gGhosts[i];
        console.log(currGhost);
        currGhost.prevColor = currGhost.color;
        currGhost.color = "blue";
    }
    setTimeout(function () {
        isSuper = false;
        //// loop on them again and color them in their color (random again is also OK)
        gGhosts.push(...deadGhosts);
        deadGhosts=[];
        for (var i = 0; i < gGhosts.length; i++) {
            var currGhost = gGhosts[i];
            currGhost.color = currGhost.prevColor;
        }
        console.log('deadGhosts', deadGhosts);
        console.log('gGhosts', gGhosts);
    }, 5000);
}

function getGhostIdxFromLoc(location) { /// {i: 4, j: 7}
    console.log('targetLocation:', location);
    for (var i = 0; i < gGhosts.length; i++) {
        var currGhost = gGhosts[i];
        console.log('currGhost:', currGhost);
        if (currGhost.location.i === location.i && currGhost.location.j === location.j) {
            return i;
        }
        /// compare this 2 below to find the wanted ghsot
        // console.log('currGhost Location:', currGhost.location)
        // console.log('Eaten ghost Location:', location)
    }
}



/// EXAMPLES
// setTimeout(function () {
//     //// code to be run after timeout


// }, 3000)

//// var nums = [1, 2, 3]
/// nums.splice(1, 1) ---> nums = [1, 3]