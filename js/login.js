function handleLogin(event) {
  event.preventDefault();

  const email = document.getElementById("email").value;

  if (email) {
    const username = email.split("@")[0];
    // 设置登录状态和用户信息
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("username", username);
    // 跳转到首页
    window.location.href = "index.html";
  } else {
    alert("Please enter a valid email.");
  }
}

// 确保用户未登录时才显示登录表单
document.addEventListener("DOMContentLoaded", () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  if (isLoggedIn) {
    window.location.href = "index.html";
  }
});

console.log("Login script loaded successfully.");
