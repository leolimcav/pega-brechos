const nome = document.getElementById("nome");
if (localStorage.getItem("is_brecho") === "S") {
  nome.innerHTML = localStorage.getItem("nome");
} else {
  let name;
  let d;
  name = localStorage.getItem("nome").split(" ");
  if (localStorage.getItem("sexo") === "F") {
    d = "da";
  } else {
    d = "do";
  }
  nome.innerHTML = `Brechó ${d} ${name[0]}`;
}
