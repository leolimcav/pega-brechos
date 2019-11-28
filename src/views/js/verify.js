function verifyUser() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  if (user) {
    location.href = "/payment";
  } else {
    location.href = "/login";
  }
}
