function createstorage() {
  const email = document.getElementById("emailCreate");

  if (typeof Storage !== "undefined") {
    // Store
    localStorage.setItem("email", email.value);
    location.href = "/signup";

    // Retrieve
  } else {
    console.log("Sorry, your browser does not support Web Storage...");
  }
}

const email = document.getElementById("email");
const lS = localStorage.getItem("email");
email.value = lS;
