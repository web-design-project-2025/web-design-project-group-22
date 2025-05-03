

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
