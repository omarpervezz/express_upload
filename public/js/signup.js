const signUpForm = document.querySelector(".signUp_form");

signUpForm.addEventListener("submit", (e) => {
  e.preventDefault(); // prevent the form from submitting normally

  // get the user's input values
  const name = signUpForm.name.value;
  const email = signUpForm.email.value;
  const phone = signUpForm.phone.value;
  const password = signUpForm.password.value;
  const confirmPassword = signUpForm.confirm_password.value;
  console.log(name);
  // validate the user's input
  if (
    name === "" ||
    email === "" ||
    phone === "" ||
    password === "" ||
    confirmPassword === ""
  ) {
    alert("Please fill in all fields");
    return;
  }
  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  // create the user in Firebase Authentication
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // add the user's name and phone number to their profile
      const user = userCredential.user;
      user
        .updateProfile({
          displayName: name,
        })
        .then(() => {
          user.updatePhoneNumber({
            phoneNumber: phone,
          });
        });

      // redirect the user to the home page
      window.location.href = "addlisting.html";
    })
    .catch((error) => {
      alert(error.message);
    });
});
