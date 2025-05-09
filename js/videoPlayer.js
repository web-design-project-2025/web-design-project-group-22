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

      const singleCommentDiv = document.createElement("div");
      singleCommentDiv.textContent = commentText;
      applySingleCommentStyles(singleCommentDiv);

      contentContainerDiv.appendChild(userNameDiv);
      contentContainerDiv.appendChild(singleCommentDiv);

      commentDiv.appendChild(profilePicture);
      commentDiv.appendChild(contentContainerDiv);

      commentsElement.appendChild(commentDiv);
    });
  });
}

function applyCommentDivStyles(commentDiv) {
  commentDiv.style.display = "flex";
  commentDiv.style.alignItems = "flex-start";
  commentDiv.style.padding = "12px";
  commentDiv.style.marginBottom = "16px";
  commentDiv.style.borderBottom = "1px solid #e0e0e0";
}

function applyProfilePictureStyles(profilePicture) {
  profilePicture.style.width = "50px";
  profilePicture.style.height = "50px";
  profilePicture.style.borderRadius = "50%";
  profilePicture.style.marginRight = "10px";
}

function applyContenetContainerDivStyles(contentContainerDiv) {
  contentContainerDiv.style.flex = "1";
}

function applyUserNameDivStyles(userNameDiv) {
  userNameDiv.style.fontWeight = "bold";
  userNameDiv.style.marginBottom = "4px";
}

function applySingleCommentStyles(singleCommentDiv) {
  singleCommentDiv.style.marginBottom = "6px";
}

loadCommentsData();
