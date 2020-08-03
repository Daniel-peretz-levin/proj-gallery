'use strict';


var gBooks;

_creatBooks();

function _creatBooks() {
    var books = loadFromStorage('myBooks');
    if (!books || books.length === 0) {
        var names = ['Game Of Thrones', 'The Witcher', 'Harry Potter', 'The Da Vinci Code'];
        books = names.map(_createBook);
        gBooks = books;
    }
    gBooks = books;
    _saveBooksToStorage();
}

function _createBook(name, price) {
    var book = {
        id: makeId(),
        name: name,
        price: getRandomIntInclusive(10, 100),
        rate: 0,
    }
    return book;
}

function _saveBooksToStorage() {
    saveToStorage('myBooks', gBooks)
}

function DeleteBook(bookId) {
    var bookIdx = gBooks.findIndex(function (book) {
        return bookId === book.id;
    })
    var remove = confirm("Delete It?");
    if (!remove) return;
    else {
    gBooks.splice(bookIdx, 1)
    _saveBooksToStorage();
    }
}

function addBook(name, price) {
    var book = _createBook(name, price);
    gBooks.push(book);
    _saveBooksToStorage();
}

function updateBook(bookId, newPrice){
    var bookIdx= gBooks.findIndex(function(book){
        return book.id= bookId;
    })
    gBooks[bookIdx].price= newPrice;
    _saveBooksToStorage();
}

function getBook(bookId){
    var book = gBooks.find(function (book) {
        return bookId === book.id;
    })
    return book;
}


