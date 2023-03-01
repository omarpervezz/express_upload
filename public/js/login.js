// Get a reference to the login form
const loginForm = document.querySelector(".logout_form");

// Add a submit event listener to the login form
loginForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent the form from submitting

  // Get the user's email and password
  const email = loginForm.email.value;
  const password = loginForm.password.value;

  // Log in the user with Firebase authentication
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Clear the login form
      loginForm.reset();

      // Redirect to the home page or update UI
      // ...
      window.location.href = "index.html";
    })
    .catch((error) => {
      // Handle login errors
      // ...
    });
});
