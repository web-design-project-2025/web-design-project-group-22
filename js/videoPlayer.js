
/*i wanted to use the api so i ask gpt to know how should i do it however Garrit in feedback told us how 
but we need a little more explanaition for that 
https://chatgpt.com/share/68220dab-abf0-8004-8408-e8fe21d11a0d*/ 

const apiKey = "7c4ccf3d2a72adb09ff852ddc4aa8a76";
const token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YzRjY2YzZDJhNzJhZGIwOWZmODUyZGRjNGFhOGE3NiIsIm5iZiI6MTc0NDcyMzUxOS4yMzEsInN1YiI6IjY3ZmU1ZTNmYzFlMGE3MDhjYmFkNjRiZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.B5lfXnQkC-jXEtPpjbpJLNo5FRm5YzpST9-rJnID008";
const imageBaseUrl = "https://image.tmdb.org/t/p/w1280";


const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get("movie_id");
const contentType = urlParams.get("type") || "movie";


const coverImageElement = document.getElementById("cover-image");
const descriptionElement = document.getElementById("description");
const genresElement = document.getElementById("genres");
const durationElement = document.getElementById("duration");
const ratingElement = document.querySelector(".icon-button.star .rating");

async function loadContentDetails() {
  const response = await fetch(
    `https://api.themoviedb.org/3/${contentType}/${movieId}?api_key=${apiKey}&language=en-US`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  const data = await response.json();

  coverImageElement.src = data.backdrop_path ? `${imageBaseUrl}${data.backdrop_path}` : "images/placeholder.jpg";
  coverImageElement.alt = data.title || data.name || "Unknown";
  descriptionElement.textContent = data.overview || "No description available.";
  genresElement.textContent = data.genres?.map((g) => g.name).join(", ") || "Unknown";
  durationElement.textContent = data.runtime ? `${Math.floor(data.runtime / 60)}h ${data.runtime % 60}m` : "Unknown";
  ratingElement.textContent = data.vote_average ? data.vote_average.toFixed(1) : "N/A";
  
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
