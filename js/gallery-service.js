'use strict';

var gProjs = [
    {
        id: makeId(),
        name: "Mine Sweeper",
        title: "Mine Sweeper",
        url: "projs/Mine sweeper/index.html",
        publishedAt: '23/07/2020',
    },
    {
        id: makeId(),
        name: "Pacman",
        title: "Pacman",
        url: "projs/Pacman/index.html",
        publishedAt: '22/07/2020',
    },
    {
        id: makeId(),
        name: "Chess",
        title: "Chess",
        url: "projs/Chess/index.html",
        publishedAt: '19/07/2020',
    },
    {
        id: makeId(),
        name: "Book shop",
        title: "Book shop",
        url: "projs/Book shop/index.html",
        publishedAt: '03/08/2020',
    },
    {
        id: makeId(),
        name: "Todo-list",
        title: "Todo-list",
        url: "projs/Todo-list/index.html",
        publishedAt: '29/07/2020',
    },
    {
        id: makeId(),
        name: "GuessMe",
        title: "GuessMe",
        url: "projs/GuessMe/index.html",
        publishedAt: '02/08/2020',
    },


]

function getProjs() {
    return gProjs;
}

// function createProj() {
//     var proj = {
//         id: makeId(),
//         name: name,
//         title: name,
//         url: `projs/${name}/index.html`,
//         publishedAt: '',
//     }
//     return proj;
// }
function getProj(projId){
    var proj = gProjs.find(function (proj) {
        return projId === proj.id;
    })
    return proj;
}
