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

function getAllPossibleCoordsQueen(pieceCoord) {
    var res = [];
    // var i = pieceCoord.i - 1;
    var rookMoves = getAllPossibleCoordsRook(pieceCoord); 
    var bishopMoves = getAllPossibleCoordsBishop(pieceCoord);
    res = [ ...rookMoves, ...bishopMoves ];  /// rookMoves[0], rookMoves[1], rookMoves[2]
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

