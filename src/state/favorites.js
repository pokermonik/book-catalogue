const STORAGE_KEY = "favorite_books"
import noCoverImg from '../../assets/No_Cover.jpg';

export function getFavorites()
{
    const data = localStorage.getItem("favorite_books")
    return data ? JSON.parse(data): []
}

export function toggleFavorite(book)
{
    let favorites = getFavorites();
    let status;
    const index = favorites.findIndex(fav => fav.key === book.key);
    if (index === -1) {
        const bookToSave = {
            key: book.key,
            title: book.title,
            author_name: book.author_name,
            cover_i: book.cover_i,
            first_publish_year: book.first_publish_year
        };
        favorites.push(bookToSave);
        status = true;
    } else {
        favorites.splice(index,1)
        status = false;
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    return status;
}

export function renderFavoritesUI() {
    const favorites = getFavorites();
    const container = document.getElementById('favoritesList');
    container.innerHTML = '';

    if (favorites.length === 0) {
        container.innerHTML = '<p class="empty-msg">No books saved.</p>';
        return;
    }

    favorites.forEach(book => {
        const div = document.createElement('div');
        div.className = 'fav-card'; 

        const coverUrl = book.cover_i 
            ? `https://covers.openlibrary.org/b/id/${book.cover_i}-S.jpg` 
            : noCoverImg;

        div.innerHTML = `
            <img src="${coverUrl}" alt="${book.title}" class="fav-cover">
            <div class="fav-details">
                <span class="fav-title">${book.title}</span>
                <span class="fav-author">${book.author_name?.[0] || 'Unknown'}</span>
                <span class="fav-year">${book.first_publish_year || ''}</span>
            </div>
            <button class="remove-fav-btn" data-id="${book.key}">🤍</button>
        `;
        container.appendChild(div);
    });
}