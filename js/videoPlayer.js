/*i wanted to use the api so i ask gpt to know how should i do it however Garrit in feedback told us how 
but we need a little more explanaition for that 
https://chatgpt.com/share/68220dab-abf0-8004-8408-e8fe21d11a0d*/

const apiKey = "7c4ccf3d2a72adb09ff852ddc4aa8a76";
const token =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YzRjY2YzZDJhNzJhZGIwOWZmODUyZGRjNGFhOGE3NiIsIm5iZiI6MTc0NDcyMzUxOS4yMzEsInN1YiI6IjY3ZmU1ZTNmYzFlMGE3MDhjYmFkNjRiZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.B5lfXnQkC-jXEtPpjbpJLNo5FRm5YzpST9-rJnID008";
const imageBaseUrl = "https://image.tmdb.org/t/p/w1280";

const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get("movie_id");
const contentType = urlParams.get("type") || "movie";
const titleElement = document.getElementById("title");
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

  coverImageElement.src = data.backdrop_path
    ? `${imageBaseUrl}${data.backdrop_path}`
    : "images/placeholder.jpg";
  coverImageElement.alt = data.title || data.name || "Unknown";
  titleElement.textContent  = data.title || data.name || "Unknown";
  descriptionElement.textContent = data.overview || "No description available.";
  genresElement.textContent =
    data.genres?.map((g) => g.name).join(", ") || "Unknown";
  durationElement.textContent = data.runtime
    ? `${Math.floor(data.runtime / 60)}h ${data.runtime % 60}m`
    : "Unknown";
  ratingElement.textContent = data.vote_average
    ? data.vote_average.toFixed(1)
    : "N/A";
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
// create element as figure in html to show the picture and also add the class called profile-pic
function createProfilePicElement(people) {
  const PicElement = document.createElement("figure");
  PicElement.classList.add("profile-pic");
  // here I add the image by the sorce and alt item when the picture did not load in browser show the user what is that and finally turned that as appenchiled of figure that put in picElement variable
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
// the async function help us to call APT for retrive all the users information and by this method we fetch the data from json file
async function loadCommentsData() {
  const userResponse = await fetch("data/users.json"); // fetch data from local json file (users.json)
  const userJSON = await userResponse.json(); // pars the json response
  users = userJSON.users; // extract the array of users from the parsed json
  renderComments(users); // render the comments
}
// fuction to render the comments from users in comments section by creat DOM element for each comment by adding style and structure
function renderComments(users) {
  commentsElement.innerHTML = "";
  // this a loop for go through each user and also for all their comments
  users.forEach((user) => {
    user.comments.forEach((commentText) => {
      const commentDiv = document.createElement("div"); // here i create the container by divand give that class as user-comment
      commentDiv.className = "user-comment";
      applyCommentDivStyles(commentDiv);

      const profilePicture = document.createElement("img"); // creat element
      profilePicture.src = user.profilePic;
      profilePicture.alt = user.username;
      applyProfilePictureStyles(profilePicture);

      const contentContainerDiv = document.createElement("div"); // creat element
      applyContenetContainerDivStyles(contentContainerDiv);

      const userNameDiv = document.createElement("div"); // creat element
      userNameDiv.textContent = user.username;
      applyUserNameDivStyles(userNameDiv);

      const readMoreLink = document.createElement("div"); // creat element
      readMoreLink.textContent = "Read More";
      applyReadMoreStyles(readMoreLink);

      const singleCommentDiv = document.createElement("div"); // creat element
      singleCommentDiv.textContent = commentText;
      applySingleCommentStyles(singleCommentDiv);
      // start to add and assymble the container with other elemnts like user names and other ...
      contentContainerDiv.appendChild(userNameDiv);
      contentContainerDiv.appendChild(singleCommentDiv);
      contentContainerDiv.appendChild(readMoreLink);

      commentDiv.appendChild(profilePicture);
      commentDiv.appendChild(contentContainerDiv);

      commentsElement.appendChild(commentDiv);
    });
  });
}
/* I tried to add the style by java script instead of css because I want to go more furthure and Eviline teach us the first steps in front end programing ...
I know this way help us to have more flexibility for our styles and have more functional code ( dynamic )*/

// create a function to implement style for main div that show the whole comments
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

// style function for pictures
function applyProfilePictureStyles(profilePicture) {
  profilePicture.style.width = "2rem";
  profilePicture.style.height = "2rem";
  profilePicture.style.borderRadius = "50%";
  profilePicture.style.marginRight = "0.25rem";
  profilePicture.style.marginBottom = "2rem";
}
// style function that keep the content for each user
function applyContenetContainerDivStyles(contentContainerDiv) {
  contentContainerDiv.style.flex = "1";
  contentContainerDiv.style.alignItems = "center";
  contentContainerDiv.style.marginLeft = "0.75rem";
}
// style function for usersname
function applyUserNameDivStyles(userNameDiv) {
  userNameDiv.style.fontWeight = "bold";
  userNameDiv.style.marginBottom = "0.5rem";
  userNameDiv.style.marginTop = "0.2rem";
}
// style function for the user`s comments
function applySingleCommentStyles(singleCommentDiv) {
  singleCommentDiv.style.marginBottom = "0.5rem";
}

// style function for read more in content container
function applyReadMoreStyles(readMoreLink) {
  readMoreLink.style.color = "#999";
  readMoreLink.style.fontSize = "14px";
  readMoreLink.style.cursor = "pointer";
  readMoreLink.style.textAlign = "right";
}
// loading data
loadCommentsData();
