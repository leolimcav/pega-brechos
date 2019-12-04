document.getElementById("submenuUser").style.display = "none";

function openNav() {
  document.getElementById("mySideNav").style.display = "block";
  document.getElementById("mySideNav").style.display = "flex";
}
function closeNav() {
  document.getElementById("mySideNav").style.display = "none";
}
const user = localStorage.getItem("nome").split(" ");
const usuario = document.getElementById("usuario");
if (user) {
  usuario.innerHTML = `Olá, <strong> ${user[0]}!</strong>`;
}
function openSubmenu() {
  if (user) {
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

function abrirSubMenu(id) {
  document.getElementById(id).style.display = "block";
  document.getElementById(id).style.display = "flex";
}

function fecharSubMenu(id) {
  document.getElementById(id).style.display = "none";
}
