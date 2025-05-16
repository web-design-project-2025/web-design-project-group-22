const isLoggedIn = localStorage.getItem("isLoggedIn") === "true" || false;
const currentUsername = localStorage.getItem("username") || "";

const urlParams = new URLSearchParams(window.location.search);
const usernameFromURL = urlParams.get("username");
if (usernameFromURL) {
  localStorage.setItem("isLoggedIn", "true");
  localStorage.setItem("username", usernameFromURL);

  window.history.replaceState({}, document.title, window.location.pathname);
}

const currentPage = window.location.pathname.split("/").pop() || "index.html";

const desktopNav = document.createElement("nav");
desktopNav.classList.add("navbar", "desktop-nav");
const desktopLogo = document.createElement("img");
desktopLogo.src = "logo.svg";
desktopLogo.classList.add("logo");
desktopNav.appendChild(desktopLogo);

const linksContainer = document.createElement("ul");
linksContainer.classList.add("links");

if (isLoggedIn) {
  if (currentPage !== "index.html") {
    const homeLink = document.createElement("li");
    const homeLinkA = document.createElement("a");
    homeLinkA.href = "index.html";
    homeLinkA.textContent = "Home";
    homeLink.appendChild(homeLinkA);
    linksContainer.appendChild(homeLink);
  }

  // Categories link
  if (currentPage !== "categories.html") {
    const categoriesLink = document.createElement("li");
    const categoriesLinkA = document.createElement("a");
    categoriesLinkA.href = "#";
    categoriesLinkA.innerHTML = '<i class="fas fa-robot nav-icon">';
    categoriesLink.appendChild(categoriesLinkA);
    linksContainer.appendChild(categoriesLink);
  }

  // View Together link
  if (currentPage !== "viewTogether.html") {
    const viewTogetherLink = document.createElement("li");
    const viewTogetherLinkA = document.createElement("a");
    viewTogetherLinkA.href = "viewTogether.html";
    viewTogetherLinkA.innerHTML =
      '<i class="fas fa-users nav-icon"></i>';
    viewTogetherLink.appendChild(viewTogetherLinkA);
    linksContainer.appendChild(viewTogetherLink);
  }
}

desktopNav.appendChild(linksContainer);

const searchContainer = document.createElement("div");
searchContainer.classList.add("search-box");
const searchInput = document.createElement("input");
searchInput.type = "text";
searchInput.placeholder = "search";
searchContainer.appendChild(searchInput);
searchInput.addEventListener("click", () => {
  window.location.href = "categories.html";
})
desktopNav.appendChild(searchContainer);

if (!isLoggedIn) {
  const signInBtn = document.createElement("button");
  signInBtn.classList.add("sign-in");
  signInBtn.textContent = "Sign In";
  signInBtn.addEventListener("click", () => {
    window.location.href = "login.html";
  });
  desktopNav.appendChild(signInBtn);
} else {
  const userContainer = document.createElement("div");
  userContainer.classList.add("user-container");

  const avatarContainer = document.createElement("div");
  avatarContainer.classList.add("avatar-container");
  avatarContainer.title = "Click to logout";

  const avatarContent = document.createElement("div");
  avatarContent.classList.add("avatar-content");
  avatarContent.textContent = currentUsername.charAt(0).toUpperCase();

  avatarContainer.appendChild(avatarContent);
  avatarContainer.addEventListener("click", handleLogout);

  userContainer.appendChild(avatarContainer);
  desktopNav.appendChild(userContainer);
}

const mobileNav = document.createElement("div");
mobileNav.classList.add("mobile-nav");

  // Categories
  if (currentPage !== "categories.html") {
    const categoryMobileLink = document.createElement("a");
    categoryMobileLink.href = "categories.html";
    categoryMobileLink.innerHTML =
      '<i class="fas fa-th-large nav-icon"></i><span>Categories</span>';
    mobileNav.appendChild(categoryMobileLink);
  }

  // View Together
  if (currentPage !== "viewTogether.html") {
    const viewTogetherMobileLink = document.createElement("a");
    viewTogetherMobileLink.href = "viewTogether.html";
    viewTogetherMobileLink.innerHTML =
      '<i class="fas fa-users nav-icon"></i><span>View Together</span>';
    mobileNav.appendChild(viewTogetherMobileLink);
  }
  // logo part for mobile nav  
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
  aiMobileLink.innerHTML =
    '<i class="fas fa-robot nav-icon"></i><span>AI</span>';
  mobileNav.appendChild(aiMobileLink);

//Logo mobile version
if (currentPage !== "index.html") {
  const mobileLogo = document.createElement("a");
  mobileLogo.href = "index.html";
  mobileLogo.classList.add("mobile-logo-container");
  const mobileLogoImg = document.createElement("img");
  mobileLogoImg.src = "mobile-nav-logo.png";
  mobileLogoImg.classList.add("mobile-logo");
  mobileLogo.appendChild(mobileLogoImg);
  mobileNav.appendChild(mobileLogo);
}

// Login
if (isLoggedIn) {
  const profileMobileLink = document.createElement("a");
  profileMobileLink.href = "#";

  profileMobileLink.innerHTML = `
    <div class="avatar-container-mobile">
      <div class="avatar-content-mobile">${currentUsername
        .charAt(0)
        .toUpperCase()}</div>
    </div>
  `;
  profileMobileLink.addEventListener("click", (e) => {
    e.preventDefault();
    handleLogout();
  });
  mobileNav.appendChild(profileMobileLink);
} else {
  const loginMobileLink = document.createElement("a");
  loginMobileLink.href = "login.html";
  loginMobileLink.innerHTML =
    '<i class="fas fa-sign-in-alt nav-icon"></i><span>Login</span>';
  mobileNav.appendChild(loginMobileLink);
}

document.body.prepend(desktopNav);
document.body.appendChild(mobileNav);

function handleLogout() {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("username");
  window.location.href = "index.html";
}