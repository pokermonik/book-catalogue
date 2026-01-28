import { fetchBooks } from './api/booksApi.js';
import { toggleFavorite, getFavorites, renderFavoritesUI } from './state/favorites.js'
import { debounce } from './utils/debounce.js'
import noCoverImg from '../assets/No_Cover.jpg';


const themeToggle = document.getElementById('themeToggle');
const searchInput = document.getElementById('searchInput');
const resultsContainer = document.getElementById('results');
const statusContainer = document.getElementById('status');
const favoritesContainer = document.getElementById('favoritesList');
let lastResults = [];

function renderBooks(books) {
    resultsContainer.innerHTML = '';
    const favorites = getFavorites();
    if (books.length === 0) {
        statusContainer.innerText = 'Sorry, we couldnt find any books';
        return;
    }

    books.forEach(book => {
        const isFav = favorites.some(fav => fav.key === book.key);
        const coverId = book.cover_i;
        const coverUrl = coverId 
            ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg` 
            :  noCoverImg;
        const imgHTML = coverUrl 
        ? `<img src="${coverUrl}">` 
        : `<div class="no-cover">No Cover Available</div>`;
        const bookElement = document.createElement('div');
        bookElement.className = 'book-card'

        bookElement.innerHTML = 
        `
            <img src="${coverUrl}" alt="${book.title}">
            <div class="book-info">
                <h4 class='book-title'>${book.title}</h4>
                <p class='book-author'>${book.author_name?.[0] || 'Unknown'}</p>
                <p class='book-year'>${book.first_publish_year}
            </div>
            <button class="fav-btn" data-id="${book.key}">${isFav ? '❤️' : '🤍'}</button>
        `;
        resultsContainer.appendChild(bookElement);
    });
}

async function handleSearch(query) {
    if (query.length < 3) {
        resultsContainer.innerHTML = '';
        statusContainer.innerText = 'Insert minimum 3 characters...';
        return;
    }

    statusContainer.innerText = 'Loading...';

    try {
        const books = await fetchBooks(query);
        statusContainer.innerText = `Found: ${books.length}`;
        lastResults = books;
        renderBooks(books);
    } catch (error) {
        statusContainer.innerText = 'Error: ' + error.message;
    }
}
const debouncedSearch = debounce((query) => handleSearch(query), 500);

searchInput.addEventListener('input', (e) => {
    debouncedSearch(e.target.value);
});


resultsContainer.addEventListener('click', (e) => {

    if(e.target.classList.contains("fav-btn"))
    {
        const bookKey = e.target.dataset.id;
        const book = lastResults.find(b => b.key == bookKey)

        if (book)
        {
            const status = toggleFavorite(book)
            e.target.innerText = status ? '❤️' : '🤍';
            renderFavoritesUI();
        }
    }
}
)


themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    const isDark = document.body.classList.contains('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    themeToggle.innerText = isDark ? '☀️' : '🌙';
});


favoritesContainer.addEventListener('click', (e) => {
    const btn = e.target.closest('.remove-fav-btn');
    if (!btn) return;

    const bookKey = btn.dataset.id;
    const favorites = getFavorites();
    const bookToRemove = favorites.find(f => f.key === bookKey);

    if (bookToRemove) {
        toggleFavorite(bookToRemove); 
        renderFavoritesUI();   
   
        const mainCardBtn = document.querySelector(`.fav-btn[data-id="${bookKey}"]`);
        if (mainCardBtn) mainCardBtn.innerText = '🤍';
    }
});

if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-theme');
    themeToggle.innerText = '☀️';
}
renderFavoritesUI();