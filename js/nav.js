// 获取登录状态和用户信息
const isLoggedIn = localStorage.getItem("isLoggedIn") === "true" || false;
const currentUsername = localStorage.getItem("username") || "";

// 检查URL中是否有用户信息（来自登录页面）
const urlParams = new URLSearchParams(window.location.search);
const usernameFromURL = urlParams.get("username");
if (usernameFromURL) {
  // 如果URL中有用户信息，更新登录状态
  localStorage.setItem("isLoggedIn", "true");
  localStorage.setItem("username", usernameFromURL);
  // 清除URL中的参数
  window.history.replaceState({}, document.title, window.location.pathname);
}

// 获取当前页面路径
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
  // Home link - 不在首页时显示
  if (currentPage !== "index.html") {
    const homeLink = document.createElement("li");
    const homeLinkA = document.createElement("a");
    homeLinkA.href = "index.html";
    homeLinkA.textContent = "Home";
    homeLink.appendChild(homeLinkA);
    linksContainer.appendChild(homeLink);
  }

  // Categories link - 不在分类页时显示
  if (currentPage !== "categories.html") {
    const categoriesLink = document.createElement("li");
    const categoriesLinkA = document.createElement("a");
    categoriesLinkA.href = "categories.html";
    categoriesLinkA.textContent = "Categories";
    categoriesLink.appendChild(categoriesLinkA);
    linksContainer.appendChild(categoriesLink);
  }

  // View Together link - 不在view together页面时显示
  if (currentPage !== "viewTogether.html") {
    const viewTogetherLink = document.createElement("li");
    const viewTogetherLinkA = document.createElement("a");
    viewTogetherLinkA.href = "viewTogether.html";
    viewTogetherLinkA.textContent = "View Together";
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
  // 添加用户头像
  const userContainer = document.createElement("div");
  userContainer.classList.add("user-container");

  // 创建头像容器
  const avatarContainer = document.createElement("div");
  avatarContainer.classList.add("avatar-container");
  avatarContainer.title = "Click to logout"; // 添加提示文字

  // 创建头像或用户首字母显示
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

if (isLoggedIn) {
  // Categories - 不在分类页时显示
  if (currentPage !== "categories.html") {
    const categoryMobileLink = document.createElement("a");
    categoryMobileLink.href = "categories.html";
    categoryMobileLink.innerHTML =
      '<i class="fas fa-th-large nav-icon"></i><span>Categories</span>';
    mobileNav.appendChild(categoryMobileLink);
  }

  // View Together - 不在view together页面时显示
  if (currentPage !== "viewTogether.html") {
    const viewTogetherMobileLink = document.createElement("a");
    viewTogetherMobileLink.href = "viewTogether.html";
    viewTogetherMobileLink.innerHTML =
      '<i class="fas fa-users nav-icon"></i><span>View Together</span>';
    mobileNav.appendChild(viewTogetherMobileLink);
  }

  //AI icon
  const aiMobileLink = document.createElement("a");
  aiMobileLink.href = "#";
  aiMobileLink.innerHTML =
    '<i class="fas fa-robot nav-icon"></i><span>AI</span>';
  mobileNav.appendChild(aiMobileLink);
}

//Logo mobile version - 不在首页时显示
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
  // 使用相同的头像样式
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

// 登出函数
function handleLogout() {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("username");
  window.location.href = "index.html";
}
