// loading data from JSON (API)
let covers = [];
// coming soon
const comingSoonElement = document.getElementById("coming-soon");
const usersFavoritesElement = document.getElementById("users-favorites");

async function loadCoversData() {
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

// adding link for covers to videoplayer.html
  const linkElement = document.createElement("a");
  linkElement.href = `videoPlayer.html?movie_id=${cover.id}`;

  const imageElement = document.createElement("img");
  imageElement.src = cover.coverImage;
  imageElement.alt = cover.title;

  linkElement.appendChild(imageElement)
  coverElement.appendChild(linkElement);

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

loadCoversData(); // Loading covers

const celebritySlider = document.getElementById("celebrity-slider");
const leftArrow = document.querySelector(".left-arrow");
const rightArrow = document.querySelector(".right-arrow");

let celebrities = [];
let currentIndex = 0;

async function loadCelebritiesData() {
  const response = await fetch("data/celeberities.json");
  const data = await response.json();
  celebrities = data.people; // Extract celebrity data from the JSON

  renderCelebrities(currentIndex);
}

// Render the celebrity images into the slider
function renderCelebrities(startIndex) {
  celebritySlider.innerHTML = "";
  for (let i = 0; i < 6; i++) {
    const celebIndex = (startIndex + i) % celebrities.length; // wrap around
    const celebrity = celebrities[celebIndex];

    const imgElement = document.createElement("img");
    imgElement.src = celebrity.profile_image;
    imgElement.alt = celebrity.name;
    celebritySlider.appendChild(imgElement);
  }
}

// Handle left arrow click
leftArrow.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex -= 1; // Move back by 1 images
  } else {
    currentIndex = celebrities.length - 1; // Wrap to the last group
  }
  renderCelebrities(currentIndex);
});

// Handle right arrow click
rightArrow.addEventListener("click", () => {
  if (currentIndex < celebrities.length - 1) {
    currentIndex += 1; // Move forward by 1 images
  } else {
    currentIndex = 0; // Wrap back to the first group
  }
  renderCelebrities(currentIndex);
});

loadCelebritiesData(); // Loading celebrities pictures
