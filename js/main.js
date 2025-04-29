const currentPage = window.location.pathname.split("/").pop();
const nav = document.createElement("nav");
nav.classList.add("navbar");

const navItems = [
  {
    name: "Home",
    href: "index.html",
    showOn: ["categories.html", "view-together.html"],
  },
  {
    name: "categories",
    href: "categories.html",
    showOn: ["index.html", "view-together.html"],
  },
  {
    name: "View Togeether",
    href: "ViewTogether.html",
    showOn: ["indexe.html", "categories.html"],
  },
];

for (let { name, href, showOn } of navItems) {
  if (showOn === "all" || showOn.includes(currentPage)) {
    const link = document.createElement("a");
    link.textContent = name;
    link.href = href;
    nav.appendChild(link);
  }
}

document.body.prepend(nav);

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
