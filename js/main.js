

// loading data from JSON (API)
let covers = [];
// coming soon
const comingSoonElement = document.getElementById("coming-soon");
const usersFavoritesElement = document.getElementById("users-favorites");

async function loadData() {
  const coverResponse = await fetch("data/covers.json");
  const coverJSON = await coverResponse.json();

  // using filter the covers with "coming soon"
  const comingSoonCovers = coverJSON.covers.filter((cover) => cover.comingSoon);
  renderComingSoonContent(comingSoonCovers);

  // filter for "users-favorites"
  const favoritesCovers = coverJSON.covers.filter((cover) => cover.favorite);
  renderFavoritesContent(favoritesCovers);
}

function createCoverElement(cover) {
  const coverElement = document.createElement("figure");
  coverElement.classList.add("cover");

  const imageElement = document.createElement("img");
  imageElement.src = cover.coverImage;
  imageElement.alt = cover.title;
  coverElement.appendChild(imageElement);

  return coverElement;
}
// render the coming soon part
function renderComingSoonContent(comingSoonCovers) {
  comingSoonElement.innerHTML = "";

  // limited the covers to the fiert 5 covers in json file
  const limitedCovers = comingSoonCovers.slice(0, 5);

  for (let cover of limitedCovers) {
    const coverElement = createCoverElement(cover);
    comingSoonElement.appendChild(coverElement);
  }
}
// render the favorites part
function renderFavoritesContent(favoritesCovers) {
  usersFavoritesElement.innerHTML = "";
  const limitedCoversFavorites = favoritesCovers.slice(0, 5);

  for (let cover of limitedCoversFavorites) {
    const coverElement = createCoverElement(cover);
    usersFavoritesElement.appendChild(coverElement);
  }
}

loadData();
