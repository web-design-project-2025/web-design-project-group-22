
const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"|| false; 
const currentPage = window.location.pathname.split("/").pop();
const nav = document.createElement("nav");
nav.classList.add("navbar");

const logo = document.createElement("img");
logo.src = "logo.svg";
logo.classList.add("logo");

const linksContainer = document.createElement("div");
linksContainer.classList.add("links-item");

const searchContainer = document.createElement("div");
searchContainer.classList.add("search-box");
const searchInput = document.createElement("input");
searchInput.type = "text";
searchInput.placeholder = "search";

searchContainer.appendChild(searchInput);

const iconContainer = document.createElement("div");
iconContainer.classList.add("icon-container");

if (isLoggedIn) {
  const profileIcon = document.createElement("i");
  profileIcon.classList.add("fas","fa-user","nav-icon");
  const profileLink = document.createElement("a");
  profileLink.appendChild(profileIcon);
  iconContainer.appendChild(profileLink);

  const aiIcon = document.createElement("i");
  aiIcon.classList.add("fas","fa-robot","nav-icon");
  const aiLink = document.createElement("a");
  aiLink.appendChild(aiIcon);
  iconContainer.appendChild(aiLink);
}else{
  const signInIcon = document.createElement("i");
  signInIcon.classList.add("fas", "fas-sign-in-alt", "nav-icon");
  const signInLink = document.createElement("a");
  signInLink.href ="login.html";
  signInLink.appendChild(signInIcon);
  iconContainer.appendChild(signInLink);
}

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
  {
    name: "View Togeether",
    href: "login.html",
    showOn: ["index.html"],
  },
];

for (let { name, href, showOn } of navItems) {
  if (showOn === "all" || showOn.includes(currentPage)) {
    const linksContainer = document.createElement("div");
    linksContainer.classList.add("link-item");

    const textLink = document.createElement("a");
    textLink.textContent = name;
    textLink.href = href;
    textLink.classList.add("text-link");
    linksContainer.appendChild(textLink);

    const iconLink = document.createElement("a");
    iconLink.href =href;
    iconLink.classList.add("icon-link");
    const iconElement = document.createElement("i");
    if (name === "Home") {
      iconElement.classList.add("fas", "fa-home", "nav-icon");
    }else if (name === "categories") {
      iconElement.classList.add("fas", "fa-list", "nav-icon");
    } else if (href === "ViewTogether.html") {
      iconElement.classList.add("fas", "fa-users", "nav-icon");
    } else if (href === "login.html") {
      iconElement.classList.add("fas", "fa-sign-in-alt", "nav-icon");
    }
    iconLink.appendChild(iconElement);
    linksContainer.appendChild(iconLink);

    linksContainer.appendChild(linksContainer);
  }
}

nav.appendChild(iconContainer);
nav.appendChild(logo);
nav.appendChild(linksContainer);
nav.appendChild(searchContainer);


document.body.prepend(nav);