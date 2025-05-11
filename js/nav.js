const currentPage = window.location.pathname.split("/").pop();
const nav = document.createElement("nav");
nav.classList.add("navbar");

const logo = document.createElement("img");
logo.src = "logo.svg";
logo.classList.add("logo");

const linksContainer = document.createElement("div");
linksContainer.classList.add("links");

const searchContainer = document.createElement("div");
searchContainer.classList.add("search-box");
const searchInput = document.createElement("input");
searchInput.type = "text";
searchInput.placeholder = "search";

searchContainer.appendChild(searchInput);

const signInButton = document.createElement("button");
signInButton.classList.add("sign-in");
signInButton.textContent = "sign in/up";

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
    showOn: ["index.html", "categories.html"],
  },
];

for (let { name, href, showOn } of navItems) {
  if (showOn === "all" || showOn.includes(currentPage)) {
    const li = document.createElement("li");
    const link = document.createElement("a");
    link.textContent = name;
    link.href = href;
    linksContainer.appendChild(link);
  }
}

nav.appendChild(logo);
nav.appendChild(linksContainer);
nav.appendChild(searchContainer);
nav.appendChild(signInButton);


document.body.prepend(nav);