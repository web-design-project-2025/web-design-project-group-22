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

// loading data from JSON (API)

document.body.prepend(nav);

let covers = [];

async function loadData() {
  const coverResponse = await fetch("data/covers.json");
  const coverJSON = await coverResponse.json();
  covers = coverJSON.covers;

  console.log(coverJSON);
}

loadData();
