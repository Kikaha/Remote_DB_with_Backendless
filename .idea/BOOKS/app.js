import * as dataApi from './data.js';
import el from './dom.js';

window.addEventListener('load', () => {
    const elements = {
        loadButton: function () {
            return document.querySelector('body button#loadBooks')
        },
        tableBody: function () {
            return document.querySelector('table tbody')
        },
        inputTitle: function () {
            return document.querySelector('[type=title]')
        },
        inputAuthor: function () {
            return document.querySelector('form input#author')
        },
        inputIsbn: function () {
            return document.querySelector('form input#isbn')
        },
        submitButton: function () {
            return [...document.querySelectorAll('button')]
                .filter(x => x.innerText === 'Submit')[0];
            // querySelectorAll('form > button')
        }
    };
    elements.loadButton().addEventListener('click', displayBooks);
    elements.submitButton().addEventListener('click', createBook);

    async function createBook(e) {
        e.preventDefault();
        const book = {
            title: elements.inputTitle().value,
            author: elements.inputAuthor().value,
            isbn: elements.inputIsbn().value
        }
        let isValid = true;
        Object.entries(book).find(([k, v]) => {
            if (v.length === 0) {
                alert(`Book ${k} can not be empty!`);
                isValid = false;
                return true;
            }else{
                return false;
            }
        })
        if (isValid === false){
        return;
        }
        try{
            const created = await dataApi.createBook(book);
            elements.tableBody().appendChild(renderBook(created));
            elements.inputTitle().value = "";
            elements.inputAuthor().value = "";
            elements.inputIsbn().value = "";
        } catch (error){
            alert(error);
            console.error(error);
        }

    }

    async function displayBooks() {
        elements.tableBody().innerHTML = '<tr><td colspan="4">Loading...</td></tr>'
        const books = await dataApi.getBooks();
        elements.tableBody().innerHTML = '';
        books.filter(x => x.title !== null).sort((a, b) =>
            a.title.localeCompare(b.title))
            .forEach(b => elements.tableBody().appendChild(renderBook(b)));
    }

    function renderBook(book) {
        return el('tr', [
            el('td', book.title),
            el('td', book.author),
            el('td', book.isbn),
            el('td', [
                el('button', 'Edit'),
                el('button', 'Delete')])])
    }

})