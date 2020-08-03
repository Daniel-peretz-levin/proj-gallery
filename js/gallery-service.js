'use strict';

var gProjs = [
    {
        id: makeId(),
        name: "Mine Sweeper",
        title: "Mine Sweeper",
        url: "projs/Mine sweeper/index.html",
        publishedAt: '2020/07/23',
    },
    {
        id: makeId(),
        name: "Pacman",
        title: "Pacman",
        url: "projs/Pacman/index.html",
        publishedAt: '2020/07/22',
    },
    {
        id: makeId(),
        name: "Chess",
        title: "Chess",
        url: "projs/Chess/index.html",
        publishedAt: '2020/07/19',
    },
    {
        id: makeId(),
        name: "Book shop",
        title: "Book shop",
        url: "projs/Book shop/index.html",
        publishedAt: '2020/08/03',
    },
    {
        id: makeId(),
        name: "Todo-list",
        title: "Todo-list",
        url: "projs/Todo-list/index.html",
        publishedAt: '2020/07/29',
    },
    {
        id: makeId(),
        name: "GuessMe",
        title: "GuessMe",
        url: "projs/GuessMe/index.html",
        publishedAt: '2020/08/02',
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
