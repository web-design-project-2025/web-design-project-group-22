function handleLogin(event) {
  event.preventDefault();

  const email = document.getElementById("email").value;

  if (email) {
    const username = email.split("@")[0];

    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("username", username);

    window.location.href = "index.html";
  } else {
    alert("Please enter a valid email.");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  if (isLoggedIn) {
    window.location.href = "index.html";
  }
});

console.log("Login script loaded successfully.");
