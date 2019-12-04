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

const rq = $.ajax({
  type: "GET",
  contentType: "application/json",
  url: `/announcements/users/${localStorage.getItem("id")}`
});
rq.done(function(data) {
  cont = 0;
  for (let x = 0; x < data.length; x += 1) {
    const status_produto = data[x].status;
    if (status_produto === "ATIVO") {
      cont += 1;
    }
  }
  const onSale = document.getElementById("onSale");
  onSale.innerHTML = cont;
});
