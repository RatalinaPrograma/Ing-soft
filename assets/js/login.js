document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById("loginForm");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
  
  
    const savedUsername = localStorage.getItem("username");
    if (savedUsername) {
      usernameInput.value = savedUsername;
    }
  
   
    console.log("Page loaded. Username:", usernameInput.value);
    console.log("Page loaded. Password:", passwordInput.value);
  
  
    loginForm.addEventListener("submit", function(event) {
      event.preventDefault();
  
      const username = usernameInput.value;
      const password = passwordInput.value;
      localStorage.setItem("username", username);
  
      console.log("Form submitted. Username:", username);
      console.log("Form submitted. Password:", password);
  
  
      alert("Login form submitted!");
  
  
    });
  });
  