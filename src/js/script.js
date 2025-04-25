document.querySelector(".hamburger").addEventListener("click", () => {
  document.querySelector(".nav-links").classList.toggle("active");
});

const modal = document.getElementById("loginModal");
const loginBtns = document.querySelectorAll(".login-btn");
const closeBtn = document.querySelector(".close");
const roleSelect = document.getElementById("role");
const loginForm = document.querySelector(".modal-content");

// Handle regular login buttons
loginBtns.forEach((btn) =>
  btn.addEventListener("click", () => {
    modal.style.display = "flex";
  })
);

// Handle role-specific logins
document.querySelectorAll(".entityLogin ul").forEach((roleElement) => {
  roleElement.addEventListener("click", (e) => {
    // Prevent default only if user is not logged in
    e.preventDefault();

    // Get the role from the data attribute
    const role = roleElement.getAttribute("data-role");

    // Set the selected role in the dropdown
    for (let i = 0; i < roleSelect.options.length; i++) {
      if (roleSelect.options[i].text === role) {
        roleSelect.selectedIndex = i;
        break;
      }
    }

    // Show the login modal
    modal.style.display = "flex";
  });
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

// Add login form submission handler
loginForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const role = roleSelect.options[roleSelect.selectedIndex].text;

  // Simple validation
  if (!username || !password || role === "Please select an option") {
    alert("Please fill in all fields");
    return;
  }

  // For demo purposes, use simple credentials
  // In a real app, you would validate against a backend
  const validCredentials = {
    Receptionist: { username: "receptionist", password: "pass123" },
    "Healthcare Provider": { username: "doctor", password: "pass123" },
    "Claims Examiner": { username: "claims", password: "pass123" },
    Administrator: { username: "admin", password: "pass123" },
  };

  if (
    validCredentials[role] &&
    validCredentials[role].username === username &&
    validCredentials[role].password === password
  ) {
    // Store login info in sessionStorage
    sessionStorage.setItem("loggedIn", "true");
    sessionStorage.setItem("userRole", role);
    sessionStorage.setItem("username", username);

    // Redirect based on role
    switch (role) {
      case "Receptionist":
        window.location.href = "../html/receptionist-dashboard.html";
        break;
      case "Healthcare Provider":
        window.location.href = "../html/healthcare-provider-dashboard.html";
        break;
      case "Claims Examiner":
        window.location.href = "../html/claims-examiner-dashboard.html";
        break;
      case "Administrator":
        window.location.href = "../html/admin-dashboard.html";
        break;
    }
  } else {
    alert("Invalid credentials. Please try again.");
  }
});

// Check if user is logged in (for protected pages)
function checkAuth() {
  const loggedIn = sessionStorage.getItem("loggedIn");
  const currentRole = sessionStorage.getItem("userRole");

  // Get the current page path
  const currentPath = window.location.pathname;

  // List of protected pages
  const protectedPages = [
    "receptionist-dashboard.html",
    "healthcare-provider-dashboard.html",
    "claims-examiner-dashboard.html",
    "admin-dashboard.html",
  ];

  // Check if current page is protected
  const isProtectedPage = protectedPages.some((page) =>
    currentPath.includes(page)
  );

  if (isProtectedPage && (!loggedIn || loggedIn !== "true")) {
    // Redirect to login page if not logged in
    window.location.href = "../html/index.html";
    alert("Please log in to access this page");
  }
}

// Logout function
function logout() {
  // Clear all user session data
  sessionStorage.removeItem("loggedIn");
  sessionStorage.removeItem("userRole");
  sessionStorage.removeItem("username");

  // Redirect to home page
  window.location.href = "../html/index.html";
}

// Add logout event listener to all logout buttons
document.addEventListener("DOMContentLoaded", function () {
  // Check authentication on page load
  checkAuth();

  // Set up logout buttons
  const logoutBtns = document.querySelectorAll(".logout-btn");
  if (logoutBtns && logoutBtns.length > 0) {
    logoutBtns.forEach((btn) => {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        console.log("Logout clicked");
        logout();
      });
    });
  } else {
    console.log("No logout buttons found");
  }

  // Update UI based on login status
  updateUI();
});

// Update UI based on login status
function updateUI() {
  const loggedIn = sessionStorage.getItem("loggedIn") === "true";
  const username = sessionStorage.getItem("username");
  const userRole = sessionStorage.getItem("userRole");

  const loginBtns = document.querySelectorAll(".login-btn");
  const userInfoElement = document.getElementById("user-info");

  if (loggedIn && userInfoElement) {
    // Update user info display
    userInfoElement.textContent = `${username} (${userRole})`;
    userInfoElement.style.display = "block";

    // Hide login buttons when logged in
    loginBtns.forEach((btn) => {
      btn.style.display = "none";
    });
  }
}
