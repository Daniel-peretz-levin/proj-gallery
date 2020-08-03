'use strict';

var gFilterBy = 'all';
var gSortBy = 'created';
var gTodos; /// just a REFERENCE to some array sitting in the memory!!!!!!!! | x08798yfjbnrij3

_createTodos();

function getTodosForDisplay() {
    var todos = sortBy();
    
    if (gFilterBy === 'all') return todos;
    return todos.filter(function (todo) { 
        return (todo.isDone && gFilterBy === 'done') ||
            (!todo.isDone && gFilterBy === 'active')
    })

}

function sortBy() {
    var todos = gTodos; /// note that it's just another var holding the same REFERENCE (x087987246)
    if (gSortBy === 'created') {
        todos = gTodos.sort(function (a, b) {
            return a.timeStamp - b.timeStamp;
        });
    } else if (gSortBy === 'txt') {
        todos = gTodos.sort(function (a, b) {
            var nameA = a.txt.toUpperCase(); // ignore upper and lowercase
            var nameB = b.txt.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            // names must be equal
            return 0;
        });
    } else {
        todos = gTodos.sort(function (a, b) {
            return a.importance - b.importance;
        });
    }
    return todos
}

function removeTodo(todoId) {
    var todoIdx = gTodos.findIndex(function (todo) {
        return todo.id === todoId
    })
    var remove = confirm("Delete It?");
    if (!remove) return;
    else {
        // ES6 Style:
        // var todoIdx = gTodos.findIndex(todo => todo.id === todoId)
        gTodos.splice(todoIdx, 1);
        _saveTodos();
    }
}

function toggleTodo(todoId) {
    var todo = gTodos.find(function (todo) {
        return todo.id === todoId
    })
    todo.isDone = !todo.isDone
    _saveTodos();

}

function addTodo(txt) {
    var todo = _createTodo(txt)
    if (todo.txt === '') return;
    else {
        gTodos.unshift(todo)
        _saveTodos();

    }
}

function setFilter(filterBy) {
    gFilterBy = filterBy;
}
function setSort(sortBy) {
    gSortBy = sortBy;
}


function getTodosCount() {
    return gTodos.length
}
function getActiveCount() {
    var activeTodos = gTodos.filter(function (todo) {
        return !todo.isDone
    })
    return activeTodos.length;
}

// COnventions: Those are private functions that are intended to use only in this file
function _createTodos() {

    var todos = loadFromStorage('myTodos') /// null or empty array or some array

    if (!todos || todos.length === 0) {
   
    // some check of what is todos and if null than make new from txts
        var txts = ['Learn HTML', 'Master CSS', 'Love Javascript']
        // var todos = txts.map(function(txt){
        //     return _createTodo(txt)
        // })
        todos = txts.map(_createTodo)
        gTodos = todos;
        _saveTodos();
    }
    gTodos = todos;
}


function _createTodo(txt, importance = 1) { /// syntax to declare default value parameter
    // var checkImp = importance ? importance : 1
    var todo = {
        id: makeId(),
        txt: txt,
        isDone: false,
        importance: importance,
        timeStamp: Date.now(),
    }
    return todo;
}

function _saveTodos() {
    saveToStorage('myTodos', gTodos)
}

