
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get("movie_id");

const coverImageElement = document.getElementById("cover-image");
const descriptionElement = document.getElementById("description");
const genresElement = document.getElementById("genres");
const durationElement = document.getElementById("duration");

// Load data from covers.json
async function loadContentDetails() {
  const response = await fetch("data/covers.json");
  const data = await response.json();
  const cover = data.covers.find((cover) => cover.id === movieId);

  if (cover) {
    coverImageElement.src = cover.coverImage || "images/placeholder.jpg";
    coverImageElement.alt = cover.title || "Unknown";
    descriptionElement.textContent = cover.description || "No description available.";
    genresElement.textContent = cover.genre?.join(", ") || "Unknown";
    durationElement.textContent = cover.duration || "Unknown";
  }
}

loadContentDetails();

/* I could not find the bug related to file path issue and missing add style to comment Dive, so i get help from AI
because there is no public linke to share my chat I will put the conversation pdf However i share the link here
link: https://claude.ai/share/69066603-53ee-4f4a-9eeb-916e13c14703 */

// loading data from JSON (API)
let people = [];
let users = [];

// get the  comments && casts Element by id
const commentsElement = document.getElementById("comments");
const castsElement = document.getElementById("casts");

async function loadPeopleData() {
  const peopleResponse = await fetch("data/celeberities.json");
  const peopleJSON = await peopleResponse.json();

  // using filter to collect casts from celeberities.json
  const castsPicElement = peopleJSON.people.filter((people) => people.cast);
  renderProfilePicContent(castsPicElement);
}

function createProfilePicElement(people) {
  const PicElement = document.createElement("figure");
  PicElement.classList.add("profile-pic");

  const imageElement = document.createElement("img");
  imageElement.src = people.profile_image;
  imageElement.alt = people.name;
  PicElement.appendChild(imageElement);

  return PicElement;
}
// render pictures
function renderProfilePicContent(castsPicElement) {
  castsElement.innerHTML = "";

  // limited the Pictures to the first 6 pictures in json file
  const limitedProfilePic = castsPicElement.slice(0, 6);

  for (let people of limitedProfilePic) {
    const picElement = createProfilePicElement(people);
    castsElement.appendChild(picElement);
  }
}
loadPeopleData();

async function loadCommentsData() {
  const userResponse = await fetch("data/users.json");
  const userJSON = await userResponse.json();
  users = userJSON.users;
  renderComments(users);
}

function renderComments(users) {
  commentsElement.innerHTML = "";
  users.forEach((user) => {
    user.comments.forEach((commentText) => {
      const commentDiv = document.createElement("div");
      commentDiv.className = "user-comment";
      applyCommentDivStyles(commentDiv);

      const profilePicture = document.createElement("img");
      profilePicture.src = user.profilePic;
      profilePicture.alt = user.username;
      applyProfilePictureStyles(profilePicture);

      const contentContainerDiv = document.createElement("div");
      applyContenetContainerDivStyles(contentContainerDiv);

      const userNameDiv = document.createElement("div");
      userNameDiv.textContent = user.username;
      applyUserNameDivStyles(userNameDiv);

      const readMoreLink = document.createElement("div");
      readMoreLink.textContent = "Read More";
      applyReadMoreStyles(readMoreLink);

      const singleCommentDiv = document.createElement("div");
      singleCommentDiv.textContent = commentText;
      applySingleCommentStyles(singleCommentDiv);

      contentContainerDiv.appendChild(userNameDiv);
      contentContainerDiv.appendChild(singleCommentDiv);
      contentContainerDiv.appendChild(readMoreLink);

      commentDiv.appendChild(profilePicture);
      commentDiv.appendChild(contentContainerDiv);

      commentsElement.appendChild(commentDiv);
    });
  });
}

function applyCommentDivStyles(commentDiv) {
  commentDiv.style.width = "78%";
  commentDiv.style.borderRadius = "1rem";
  commentDiv.style.display = "flex";
  commentDiv.style.alignItems = "flex-start";
  commentDiv.style.padding = "0.75rem";
  commentDiv.style.marginBottom = "0.5rem";
  commentDiv.style.marginLeft = "10rem";
  commentDiv.style.borderBottom = "1px solid #e0e0e0";
  commentDiv.style.backgroundColor = "white";
}

function applyProfilePictureStyles(profilePicture) {
  profilePicture.style.width = "2rem";
  profilePicture.style.height = "2rem";
  profilePicture.style.borderRadius = "50%";
  profilePicture.style.marginRight = "0.25rem";
  profilePicture.style.marginBottom = "2rem";
}

function applyContenetContainerDivStyles(contentContainerDiv) {
  contentContainerDiv.style.flex = "1";
  contentContainerDiv.style.alignItems = "center";
  contentContainerDiv.style.marginLeft = "0.75rem";
}

function applyUserNameDivStyles(userNameDiv) {
  userNameDiv.style.fontWeight = "bold";
  userNameDiv.style.marginBottom = "0.5rem";
  userNameDiv.style.marginTop = "0.2rem";
}

function applySingleCommentStyles(singleCommentDiv) {
  singleCommentDiv.style.marginBottom = "0.5rem";
}

function applyReadMoreStyles(readMoreLink) {
  readMoreLink.style.color = "#999";
  readMoreLink.style.fontSize = "14px";
  readMoreLink.style.cursor = "pointer";
  readMoreLink.style.textAlign = "right";
}

loadCommentsData();
