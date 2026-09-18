const API_URL = "https://db2-kasilag-login.onrender.com"; // Change to your Render URL after backend deployment

const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const showRegister = document.getElementById("showRegister");
const message = document.getElementById("message");
const registerMessage = document.getElementById("registerMessage");

// Toggle between Login and Register forms
if (showRegister) {
  showRegister.addEventListener("click", (e) => {
    e.preventDefault();
    if (registerForm.classList.contains("hidden")) {
      registerForm.classList.remove("hidden");
      loginForm.classList.add("hidden");
      showRegister.textContent = "Back to Login";
    } else {
      registerForm.classList.add("hidden");
      loginForm.classList.remove("hidden");
      showRegister.textContent = "Register";
    }
  });
}

// Handle Login Form Submission
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const response = await fetch(`${API_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        localStorage.setItem("token", data.token);
        window.location.href = "dashboard.html";
      } else {
        message.innerText = data.message || "Login failed.";
      }
    } catch (error) {
      message.innerText = "Cannot connect to server.";
    }
  });
}

// Handle Register Form Submission
if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("regEmail").value;
    const password = document.getElementById("regPassword").value;

    try {
      const response = await fetch(`${API_URL}/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        registerMessage.innerText = data.message || "Registration successful!";
        document.getElementById("regEmail").value = "";
        document.getElementById("regPassword").value = "";
        document.getElementById("name").value = "";
      } else {
        registerMessage.innerText = data.message || "Registration failed.";
      }
    } catch (error) {
      registerMessage.innerText = "Cannot connect to server.";
    }
  });
}
