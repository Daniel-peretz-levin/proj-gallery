'use strict'

function onInit() {
    console.log('Init');
    renderTodos();
}

function onTodoToggle(elTodo, todoId) {
    toggleTodo(todoId)
    renderTodos()
    // elTodo.classList.toggle('done')
}

function renderTodos() {
    var strHTML = ''
    var todos = getTodosForDisplay();

    if (!todos.length) { 
        if (gFilterBy === 'all') {
            strHTML = 'No Todos';
        } else if (gFilterBy === 'active') {
            strHTML = 'No Active Todos';
        } else {
            strHTML = '<li>No Done Todos</li>';
        }
    } else {
        todos.forEach(function (todo) {
            var className = (todo.isDone) ? 'done' : ''
            strHTML += `
            <li onclick="onTodoToggle(this, '${todo.id}')" class="${className}">
                ${todo.txt}
                <button onclick="onTodoRemove(event, '${todo.id}')">x</button>
            </li>
            `;
        })
    }

    

    var elTodoList = document.querySelector('.todo-list');
    elTodoList.innerHTML = strHTML;

    document.querySelector('.total-count').innerText = getTodosCount();
    document.querySelector('.active-count').innerText = getActiveCount();
}

function onTodoRemove(ev, todoId) {
    ev.stopPropagation();
    removeTodo(todoId);
    renderTodos();
}

function onAddTodo() {
    var elTodoTxt = document.querySelector('.todo-txt');
    var todoTxt = elTodoTxt.value;
    var elTodoImportance = document.querySelector('.todo-importance');
    var todoImportance = elTodoImportance.value;
    addTodo(todoTxt, todoImportance);
    renderTodos();
    elTodoTxt.value = '';
    elTodoImportance.value = '';
}

function onSetFilter(filterBy) {
    setFilter(filterBy);
    renderTodos();
}

function onSetSort(sortBy) {
    setSort(sortBy);
    renderTodos();
}
