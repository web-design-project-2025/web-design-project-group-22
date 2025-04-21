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
const comingSoonElement = document.getElementById("coming-soon");
async function loadData() {
  const coverResponse = await fetch("data/covers.json");
  const coverJSON = await coverResponse.json();
  covers = coverJSON.covers;

  renderContent();
}

function getCoverByID(id) {
  return covers.find((cover) => cover.id === id);
}

function createCoverElement(cover, coverId) {
  const coverElement = document.createElement("figure");
  coverElement.classList.add("cover");

  const imageElement = document.createElement("img");
  imageElement.src = cover.coverImage;
  coverElement.appendChild(imageElement);

  return coverElement;
}

function renderContent() {
  comingSoonElement.innerHTML = "";

  for (let cover of covers) {
    const coverId = getCoverByID(cover.id);
    const coverElement = createCoverElement(cover, coverId);
    comingSoonElement.appendChild(coverElement);
  }
}

loadData();
