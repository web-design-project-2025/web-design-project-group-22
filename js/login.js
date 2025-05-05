function handleLogin(event) {
  event.preventDefault();

  const email = document.getElementById("email").value;

  if (email) {
    const username = email.split("@")[0];
    window.location.href = `homepage.html?username=${encodeURIComponent(
      username
    )}`;
  } else {
    alert("Please enter a valid email.");
  }
}
console.log("Login script loaded successfully.");
