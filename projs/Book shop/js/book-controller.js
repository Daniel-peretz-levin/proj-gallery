'use strict';

function onInit() {
    renderBooks();
}

function renderBooks() {
    var books = gBooks;
    var bookIdForTable = 0;
    var strHeadline = `<tr>
    <td class="cell">ID </td>
    <td class="cell">BOOK NAME</td>
    <td class="cell">BOOK PRICE</td>
    <td class="cell">BOOK RATE</td>
    <td colspan="3" class="cell">ACTIONS</td>
    </tr>`
    var strHtmls = books.map(function (book) {
        bookIdForTable += 1;
        return `<tr>
        <td class="cell book-id">${bookIdForTable}</td>
        <td class="cell book-name">${book.name}</td>
        <td class="cell book-price">${book.price}$</td>
        <td class="cell book-rate">${book.rate}</td>
        <td class="cell"><button class= "btn read" onclick="onReadBook('${book.id}')">Read</button></td>
        <td class="cell"><button class= "btn update" onclick="onUpdateBook('${book.id}')">Update</button></td>
        <td class="cell"><button class= "btn delete" onclick="onDeleteBook('${book.id}')">Delete</button></td>
    </tr>`
    })
    document.querySelector('.books-container').innerHTML = strHeadline + strHtmls.join('')
}

function onDeleteBook(bookId){
    DeleteBook(bookId);
    renderBooks();
}

function onAddBook(){
    var name = prompt('Name of book?');
    var price= +prompt('What is the price?');
    addBook(name, price);
    renderBooks();
}

function onUpdateBook(bookId){
    var newPrice= +prompt('What is the new price?');
    updateBook(bookId, newPrice);
    renderBooks();
}

function onReadBook(bookId) {
    var elBookDetails = document.querySelector('.container-book-details');
    detailsBook(bookId);
    elBookDetails.hidden = false;
}

function onExit() {
    var elBookDetails = document.querySelector('.container-book-details');
    elBookDetails.hidden = true;
}

function detailsBook(bookId) {
    var book = getBook(bookId);
    var htmlStr = `<button onclick="onExit()" class="exit-modal btn">X</button>
            <h2>${book.name}</h2>
            <img class="img" src="img/${book.name}.jpg" />
            <p class="rate-txt">Rate The Book:</p>
            <div>
                <input type="number" class="count-rating" min="0" max="10" placeholder="Rate 0-10">
            </div>
            <button onclick="onSaveRating(${book.rate})" 
            class="btn save-rating">Save Rating</button>`

    var elRelventDetails = document.querySelector('.container-book-details');
    elRelventDetails.innerHTML = htmlStr;
} 
function onSaveRating(){
    
}
