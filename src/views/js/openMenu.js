document.getElementById("submenuUser").style.display = "none";

function openNav() {
  document.getElementById("mySideNav").style.display = "block";
  document.getElementById("mySideNav").style.display = "flex";
}
function closeNav() {
  document.getElementById("mySideNav").style.display = "none";
}

function openSubmenu() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  if (user) {
    console.log(user.username);
    document.getElementById("submenuUser").style.display = "block";
    document.getElementById("submenuUser").style.display = "flex";
    document.getElementById("submenuUser").style.alignContent = "flex-end";
  } else {
    document.getElementById("submenuUser").style.display = "none";
  }
}

function closeSubmenu() {
  document.getElementById("submenuUser").style.display = "none";
}
