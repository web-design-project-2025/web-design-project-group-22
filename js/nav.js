
const isLoggedIn = localStorage.getItem("isLoggedIn") === "true" || false;
const desktopNav = document.createElement("nav");
desktopNav.classList.add("navbar", "desktop-nav");
const desktopLogo = document.createElement("img");
desktopLogo.src = "logo.svg";
desktopLogo.classList.add("logo");
desktopNav.appendChild(desktopLogo);

const linksContainer = document.createElement("ul");
linksContainer.classList.add("links");


const homeLink = document.createElement("li");
const homeLinkA = document.createElement("a");
homeLinkA.href = "index.html";
homeLinkA.textContent = "Home";
homeLink.appendChild(homeLinkA);
linksContainer.appendChild(homeLink);

const categoriesLink = document.createElement("li");
const categoriesLinkA = document.createElement("a");
categoriesLinkA.href = "categories.html";
categoriesLinkA.textContent = "Categories";
categoriesLink.appendChild(categoriesLinkA);
linksContainer.appendChild(categoriesLink);

const viewTogetherLink = document.createElement("li");
const viewTogetherLinkA = document.createElement("a");
viewTogetherLinkA.href = "viewTogether.html";
viewTogetherLinkA.textContent = "View Together";
viewTogetherLink.appendChild(viewTogetherLinkA);
linksContainer.appendChild(viewTogetherLink);

desktopNav.appendChild(linksContainer);

const searchContainer = document.createElement("div");
searchContainer.classList.add("search-box");
const searchInput = document.createElement("input");
searchInput.type = "text";
searchInput.placeholder = "search";
searchContainer.appendChild(searchInput);
desktopNav.appendChild(searchContainer);

if (isLoggedIn === false) {
  const signInBtn = document.createElement("button");
  signInBtn.classList.add("sign-in");
  signInBtn.textContent = "Sign In";
  signInBtn.addEventListener("click", () => {
    window.location.href = "login.html";
  });
  desktopNav.appendChild(signInBtn);
}

const mobileNav = document.createElement("div");
mobileNav.classList.add("mobile-nav");

//  Categories
const categoryMobileLink = document.createElement("a");
categoryMobileLink.href = "categories.html";
categoryMobileLink.innerHTML = '<i class="fas fa-th-large nav-icon"></i><span>Categories</span>';
mobileNav.appendChild(categoryMobileLink);

// View Together
const viewTogetherMobileLink = document.createElement("a");
viewTogetherMobileLink.href = "viewTogether.html";
viewTogetherMobileLink.innerHTML = '<i class="fas fa-users nav-icon"></i><span>View Together</span>';
mobileNav.appendChild(viewTogetherMobileLink);

//Logo mobile version
const mobileLogo = document.createElement("a");
mobileLogo.href = "index.html";
mobileLogo.classList.add("mobile-logo-container");
const mobileLogoImg = document.createElement("img");
mobileLogoImg.src = "mobile-nav-logo.png";
mobileLogoImg.classList.add("mobile-logo");
mobileLogo.appendChild(mobileLogoImg);
mobileNav.appendChild(mobileLogo);

//AI icon
const aiMobileLink = document.createElement("a");
aiMobileLink.href = "#";
aiMobileLink.innerHTML = '<i class="fas fa-robot nav-icon"></i><span>AI</span>';
mobileNav.appendChild(aiMobileLink);

// Login
if (isLoggedIn) {
  const profileMobileLink = document.createElement("a");
  profileMobileLink.href = "#";
  profileMobileLink.innerHTML = '<i class="fas fa-user nav-icon"></i><span>Profile</span>';
  mobileNav.appendChild(profileMobileLink);
} else {
  const loginMobileLink = document.createElement("a");
  loginMobileLink.href = "login.html";
  loginMobileLink.innerHTML = '<i class="fas fa-sign-in-alt nav-icon"></i><span>Login</span>';
  mobileNav.appendChild(loginMobileLink);
}

document.body.prepend(desktopNav);
document.body.appendChild(mobileNav);