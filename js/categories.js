
/* get some help from gpt because it was a little hard to done especialy 
the filter part but try not to get  a lot of help from the chatGPT
https://chatgpt.com/share/68220316-eaa4-8004-8ffd-45048d5949d5
*/
const apiKey = "7c4ccf3d2a72adb09ff852ddc4aa8a76";
const token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YzRjY2YzZDJhNzJhZGIwOWZmODUyZGRjNGFhOGE3NiIsIm5iZiI6MTc0NDcyMzUxOS4yMzEsInN1YiI6IjY3ZmU1ZTNmYzFlMGE3MDhjYmFkNjRiZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.B5lfXnQkC-jXEtPpjbpJLNo5FRm5YzpST9-rJnID008";
const imageBaseUrl = "https://image.tmdb.org/t/p/w500";

const categoryGrid = document.getElementById("category-grid");
const header = document.getElementById("header");
const genreFilters = document.getElementById("genre-filters");

// Define genres with TMDB genre IDs
const categories = [
  { name: "Action", genreId: 28, endpoint: "/movie" },
  { name: "Adventure", genreId: 12, endpoint: "/movie" },
  { name: "Animation", genreId: 16, endpoint: "/movie" },
  { name: "Biography", genreId: 36, endpoint: "/movie" },
  { name: "Comedy", genreId: 35, endpoint: "/movie" },
  { name: "Crime", genreId: 80, endpoint: "/movie" },
  { name: "Documentary", genreId: 99, endpoint: "/movie" }
];

let allMovies = [];

// Load movies API
async function loadMoviesData() {
  allMovies = [];
  for (let page = 1; page <= 20; page++) {
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&page=${page}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const data = await response.json();
    for (let i = 0; i < data.results.length; i++) {
      const item = data.results[i];
      allMovies.push({
        id: item.id,
        title: item.title,
        poster_path: item.poster_path,
        genre_ids: item.genre_ids,
        name: item.name,
        categoryType: "movie"
      });
    }
  }
}

// filter checkboxes
function createGenreFilters() {
  if (!genreFilters) return;
  genreFilters.innerHTML = "";
  categories.forEach((category) => {
    const filterDiv = document.createElement("div");
    filterDiv.className = "filter-checkbox";
    filterDiv.innerHTML = `
      <input type="checkbox" id="genre-${category.name.toLowerCase()}" value="${category.genreId}">
      <label for="genre-${category.name.toLowerCase()}">${category.name}</label>
    `;
    genreFilters.appendChild(filterDiv);
  });

  genreFilters.querySelectorAll("input[type=checkbox]").forEach(checkbox => {
    checkbox.addEventListener("change", () => {
      const checkedGenreIds = Array.from(genreFilters.querySelectorAll("input:checked")).map(input => parseInt(input.value));
      renderMovies(checkedGenreIds);
    });
  });

  const clearButton = document.querySelector(".clear-button");
  if (clearButton) {
    clearButton.addEventListener("click", clearAllFilters);
  }
}

function clearAllFilters() {
  genreFilters.querySelectorAll("input[type=checkbox]").forEach(checkbox => {
    checkbox.checked = false;
  });
  renderMovies([]);
}

// Render movies based on selected genres
function renderMovies(selectedGenreIds) {
  categoryGrid.innerHTML = "";

  let filteredMovies = allMovies;
  if (selectedGenreIds.length > 0) {
    filteredMovies = allMovies.filter(movie =>
      movie.genre_ids.some(genreId => selectedGenreIds.includes(genreId))
    );
    header.innerHTML = `<h1>Filtered Movies</h1>`;
  } else {
    header.innerHTML = `<h1>Categories</h1>`;
  }

  if (selectedGenreIds.length === 1) {
    const category = categories.find(category => category.genreId === selectedGenreIds[0]);
    header.innerHTML = `
      <div class="category-header">
        <h1>${category.name}</h1>
        <button class="back-button">Back</button>
      </div>
    `;
    const backButton = header.querySelector(".back-button");
    backButton.addEventListener("click", () => {
      window.location.href = "categories.html";
    });

    const section = document.createElement("section");
    section.className = "category-section";
    section.innerHTML = `<div class="movie-grid"></div>`;
    const movieGrid = section.querySelector(".movie-grid");

    for (let i = 0; i < Math.min(20, filteredMovies.length); i++) {
      const item = filteredMovies[i];
      const movieCard = document.createElement("a");
      movieCard.href = `videoPlayer.html?movie_id=${item.id}&type=${item.categoryType}`;
      movieCard.className = "movie-card";
      movieCard.innerHTML = `
        <img src="${item.poster_path ? imageBaseUrl + item.poster_path : "images/placeholder.jpg"}" alt="${item.title || item.name}" />
        <p>${item.title || item.name}</p>
      `;
      movieGrid.appendChild(movieCard);
    }

    categoryGrid.appendChild(section);
  } else if (selectedGenreIds.length > 1) {
    const section = document.createElement("section");
    section.className = "category-section";
    section.innerHTML = `<div class="movie-grid"></div>`;
    const movieGrid = section.querySelector(".movie-grid");

    for (let i = 0; i < Math.min(20, filteredMovies.length); i++) {
      const item = filteredMovies[i];
      const movieCard = document.createElement("a");
      movieCard.href = `videoPlayer.html?movie_id=${item.id}&type=${item.categoryType}`;
      movieCard.className = "movie-card";
      movieCard.innerHTML = `
        <img src="${item.poster_path ? imageBaseUrl + item.poster_path : "images/placeholder.jpg"}" alt="${item.title || item.name}" />
        <p>${item.title || item.name}</p>
      `;
      movieGrid.appendChild(movieCard);
    }

    categoryGrid.appendChild(section);
  } else {
    categories.forEach((category) => {
      const section = document.createElement("section");
      section.className = "category-section";
      section.innerHTML = `
        <div class="category-header">
          <div class="category-title" onclick="renderMovies([${category.genreId}])">
            <h2>${category.name}</h2>
            <i class="fas fa-chevron-right"></i>
          </div>
        </div>
        <div class="movie-grid"></div>
      `;

      const movieGrid = section.querySelector(".movie-grid");
      let count = 0;
      for (let i = 0; i < allMovies.length && count < 5; i++) {
        const item = allMovies[i];
        if (item.genre_ids.includes(category.genreId)) {
          const movieCard = document.createElement("a");
          movieCard.href = `videoPlayer.html?movie_id=${item.id}&type=${item.categoryType}`;
          movieCard.className = "movie-card";
          movieCard.innerHTML = `
            <img src="${item.poster_path ? imageBaseUrl + item.poster_path : "images/placeholder.jpg"}" alt="${item.title || item.name}" />
            <p>${item.title || item.name}</p>
          `;
          movieGrid.appendChild(movieCard);
          count++;
        }
      }

      categoryGrid.appendChild(section);
    });
  }
}

const urlParams = new URLSearchParams(window.location.search);
const selectedGenre = urlParams.get("genre");


createGenreFilters();
const selectedCategory = selectedGenre ? categories.find(category => category.name.toLowerCase() === selectedGenre.toLowerCase()) : null;
if (selectedCategory) {
  loadMoviesData().then(() => renderMovies([selectedCategory.genreId]));
} else {
  loadMoviesData().then(() => renderMovies([]));
}