'use strict'

// Pieces Types
var KING_WHITE = '♔';
var QUEEN_WHITE = '♕';
var ROOK_WHITE = '♖';
var BISHOP_WHITE = '♗';
var KNIGHT_WHITE = '♘';
var PAWN_WHITE = '♙';
var KING_BLACK = '♚';
var QUEEN_BLACK = '♛';
var ROOK_BLACK = '♜';
var BISHOP_BLACK = '♝';
var KNIGHT_BLACK = '♞';
var PAWN_BLACK = '♟';

// The Chess Board
var gBoard;
var gSelectedElCell = null;

function restartGame() {
    gBoard = buildBoard();
    renderBoard(gBoard);
}

function buildBoard() {
    var board = [];
    // TODO: build the board 8 * 8
    var size = 8;
    for (var i = 0; i < size; i++) {
        board[i] = [];
        for (var j = 0; j < size; j++) {
            if (i === 1) board[i][j] = PAWN_BLACK;
            else if (i === 6) board[i][j] = PAWN_WHITE;
            else board[i][j] = '';
        }
    }
    board[0][0] = board[0][7] = ROOK_BLACK;
    board[0][1] = board[0][6] = KNIGHT_BLACK;
    board[0][2] = board[0][5] = BISHOP_BLACK;
    board[0][4] = KING_BLACK;
    board[0][3] = QUEEN_BLACK;

    board[7][0] = board[7][7] = ROOK_WHITE;
    board[7][1] = board[7][6] = KNIGHT_WHITE;
    board[7][2] = board[7][5] = BISHOP_WHITE;
    board[7][3] = KING_WHITE;
    board[7][4] = QUEEN_WHITE;

    // board[4][4] = BISHOP_BLACK;
    // board[4][0] = ROOK_BLACK;
    // board[4][4] = KING_BLACK;
    // board[4][4] = QUEEN_BLACK;
    board[4][4] = KNIGHT_BLACK;
    // console.table(board);
    return board;
}

function renderBoard(board) {
    var strHtml = '';
    for (var i = 0; i < board.length; i++) {
        var row = board[i];
        strHtml += '<tr>';
        for (var j = 0; j < row.length; j++) {
            var cell = row[j];
            // TODO: figure class name
            var className = (i + j) % 2 === 0 ? 'white' : 'black';
            var tdId = `cell-${i}-${j}`;
            strHtml += `<td id="${tdId}" onclick="cellClicked(this)" class="${className}">
                            ${cell}
                        </td>`;
        }
        strHtml += '</tr>';
    }
    var elMat = document.querySelector('.game-board');
    elMat.innerHTML = strHtml;
}


function cellClicked(elCell) {

    // TODO: if the target is marked - move the piece!
    if (gSelectedElCell && elCell.classList.contains('mark')) {
        movePiece(gSelectedElCell, elCell);
        cleanBoard();
        gSelectedElCell = null;
        return;
    }
    cleanBoard();

    elCell.classList.add('selected');
    gSelectedElCell = elCell;

    // console.log('elCell.id: ', elCell.id);
    var cellCoord = getCellCoord(elCell.id);
    // console.log('cellClicked!\n', 'elId:', elCell.id, 'coord:', cellCoord);
    var piece = gBoard[cellCoord.i][cellCoord.j];

    var possibleCoords = [];
    switch (piece) {
        case ROOK_BLACK:
        case ROOK_WHITE:
            possibleCoords = getAllPossibleCoordsRook(cellCoord);
            break;
        case BISHOP_BLACK:
        case BISHOP_WHITE:
            possibleCoords = getAllPossibleCoordsBishop(cellCoord);
            break;
        case KNIGHT_BLACK:
        case KNIGHT_WHITE:
            possibleCoords = getAllPossibleCoordsKnight(cellCoord);
            break;
        case KING_BLACK:
        case KING_WHITE:
            possibleCoords = getAllPossibleCoordsKing(cellCoord);
            break;
        case QUEEN_BLACK:
        case QUEEN_WHITE:
            possibleCoords = getAllPossibleCoordsQueen(cellCoord);
            break;
        case PAWN_BLACK:
        case PAWN_WHITE:
            possibleCoords = getAllPossibleCoordsPawn(cellCoord, piece === PAWN_WHITE);
            break;

    }
    markCells(possibleCoords);
}

function movePiece(elFromCell, elToCell) {
    // TODO: use: getCellCoord to get the coords, move the piece
    // update the MODEl, update the DOM
    var fromCoord = getCellCoord(elFromCell.id);
    var toCoord = getCellCoord(elToCell.id);
    console.log('about to move:', fromCoord, toCoord);

    // updating the model:
    gBoard[toCoord.i][toCoord.j] = gBoard[fromCoord.i][fromCoord.j];
    gBoard[fromCoord.i][fromCoord.j] = '';
    console.table(gBoard);

    // updating the dom:
    renderCell(fromCoord, gBoard[fromCoord.i][fromCoord.j]);
    renderCell(toCoord, gBoard[toCoord.i][toCoord.j]);
    // renderBoard(gBoard);
}

function renderCell(coord, htmlStr) {
    var selector = getSelector(coord);
    document.querySelector(selector).innerHTML = htmlStr;
}

function markCells(coords) {
    // TODO: query select them one by one and add mark 
    for (var i = 0; i < coords.length; i++) {
        var selector = getSelector(coords[i]);
        var elCell = document.querySelector(selector);
        elCell.classList.add('mark');
    }
}

// Gets a string such as:  'cell-2-7' and returns {i:2, j:7}
function getCellCoord(strCellId) {
    var coord = {};
    var parts = strCellId.split('-');
    coord.i = +parts[1];
    coord.j = +parts[2];
    return coord;
}



function cleanBoard() {
    var elTds = document.querySelectorAll('.mark, .selected');
    for (var i = 0; i < elTds.length; i++) {
        elTds[i].classList.remove('mark', 'selected');
    }
}

// input: {i: 7, j: 0} || output: '#cell-7-0';
function getSelector(coord) {
    return '#cell-' + coord.i + '-' + coord.j;
}

function isEmptyCell(coord) {
    // if (gBoard[coord.i] === undefiend) {
    //     return gBoard[coord.i][coord.j] === '';

    // }
    return gBoard[coord.i] && gBoard[coord.i][coord.j] === '';
}
function getAllPossibleCoordsPawn(pieceCoord, isWhite) {
    var res = [];
    // TODO: handle PAWN
    var direction = isWhite ? -1 : 1;
    res.push({ i: pieceCoord.i + direction, j: pieceCoord.j });
    if ((pieceCoord.i === 1 && !isWhite) ||
        (pieceCoord.i === 6 && isWhite)) {
        res.push({ i: pieceCoord.i + (direction * 2), j: pieceCoord.j });
    }
    return res;
}

function getAllPossibleCoordsRook(pieceCoord) {
    var res = [];
    var i = pieceCoord.i;
    for (var j = pieceCoord.j + 1; i >= 0 && i < 8; j++) {
        var coord = { i: i, j: j };
        if (!isEmptyCell(coord)) break;
        res.push(coord);
    }
    i = pieceCoord.i;
    for (var j = pieceCoord.j - 1; i >= 0 && i < 8; j--) {
        var coord = { i: i, j: j };
        if (!isEmptyCell(coord)) break;
        res.push(coord);
    }
    j = pieceCoord.j;
    for (var i = pieceCoord.i + 1; j >= 0 && j < 8; i++) {
        var coord = { i: i, j: j };
        if (!isEmptyCell(coord)) break;
        res.push(coord);
    }
    j = pieceCoord.j;
    for (var i = pieceCoord.i - 1; j < 8 && j >= 0; i--) {
        var coord = { i: i, j: j };
        if (!isEmptyCell(coord)) break;
        res.push(coord);
    }
    return res;
}

function getAllPossibleCoordsBishop(pieceCoord) {
    var res = [];
    var i = pieceCoord.i - 1;
    for (var j = pieceCoord.j + 1; i >= 0 && j < 8; j++) {
        var coord = { i: i--, j: j };
        if (!isEmptyCell(coord)) break;
        res.push(coord);
    }
    i = pieceCoord.i - 1;
    for (var j = pieceCoord.j - 1; i >= 0 && j >= 0; j--) {
        var coord = { i: i--, j: j };
        if (!isEmptyCell(coord)) break;
        res.push(coord);
    }
    i = pieceCoord.i + 1;
    for (var j = pieceCoord.j + 1; i < 8 && j < 8; j++) {
        var coord = { i: i++, j: j };
        if (!isEmptyCell(coord)) break;
        res.push(coord);
    }
    i = pieceCoord.i + 1;
    for (var j = pieceCoord.j - 1; i < 8 && j >= 0; j--) {
        var coord = { i: i++, j: j };
        if (!isEmptyCell(coord)) break;
        res.push(coord);
    }
    // TODO: 3 more directions - the Bishop 
    return res;
}

function getAllPossibleCoordsQueen(pieceCoord) {
    var res = [];
    var rookMoves = getAllPossibleCoordsRook(pieceCoord);
    var bishopMoves = getAllPossibleCoordsBishop(pieceCoord);
    res = [...rookMoves, ...bishopMoves];  /// rookMoves[0], rookMoves[1], rookMoves[2]
    return res;
}

function getAllPossibleCoordsKing(pieceCoord) {
    // debugger;
    var res = [];
    for (var i = pieceCoord.i - 1; i <= pieceCoord.i + 1; i++) {
        for (var j = pieceCoord.j - 1; j <= pieceCoord.j + 1; j++) {
            if (i === pieceCoord.i && j === pieceCoord.j) continue;
            var coord = { i: i, j: j };
            if (!isEmptyCell(coord)) continue;
            res.push(coord);
        }
    }
    return res;
}

function getAllPossibleCoordsKnight(pieceCoord) {
    var res = [];
    for (var i = pieceCoord.i-2; i <= pieceCoord.i+2; i++) {
        if (i < 0 || i >= 8) continue;
        for (var j = pieceCoord.j-2; j <= pieceCoord.j+2; j++) {
            if (j < 0 || j >= 8) continue;
            var coord = {i:i,j:j};
            if (!isEmptyCell(coord)) continue;
            var absI = Math.abs(i - pieceCoord.i);
            var absJ = Math.abs(j - pieceCoord.j);
            if (absI + absJ === 3) res.push(coord);
        } 
    }
    return res;
}



