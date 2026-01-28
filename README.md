# book-catalogue

The page is deployed at: https://pokermonik.github.io/book-catalogue/

## Task
https://drive.google.com/file/d/1swszcMU9rF_-zRJaA2VchPuU_d7yrAbs/view?usp=sharing

Implement a small web application (without using any libraries or frameworks) that allows you to
search for books by title via a public API, view the results, and add your favorite books to your
"favorites" while saving the data.

## How to run the app

Follow these steps to build and run the application locally:

1.  **Install dependencies**:
    Open your terminal in the project directory and run:
    npm install

2.  **Run in development mode**:
    To start a local server with hot-reload for testing:
    npm run dev
    The app will typically be available at `http://localhost:5173`.

3.  **Build for production**:
    To generate the optimized final build (3 files: HTML, JS, and an assets folder):
    npm run build
    The final production-ready files will be located in the `/dist` folder.

## Folder Structure

The project is organized into logical groups to separate concerns and maintain clean code:

* **`/assets`**: Stores static assets such as "No Cover" placeholder image.
* **`/src`**: Contains all the source code of the application.
    * **`/api`**: Contains `booksApi.js` which handles the `fetch` requests to the Open Library API.
    * **`/state`**: Contains `favorites.js` which manages the `localStorage` logic and the rendering of the Favorites sidebar.
    * **`/utils`**: Stores helper functions like `debounce.js` used to optimize search API calls.
    * **`main.js`**: The main entry point of the application that initializes event listeners and connects all modules.
    * **`style.css`**: Contains all application styles, including layout, card designs, and dark theme definitions.
* **`index.html`**: The main HTML5 structure of the application.
* **`vite.config.js`**: Configuration file for the build tool to ensure optimized output.
