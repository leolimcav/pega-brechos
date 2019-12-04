const imagem = document.getElementById("imagem");
imagem.setAttribute("src", `files/${localStorage.getItem("imagem")}`);

const imgzim = document.getElementById("imgzim");
imgzim.setAttribute("src", `files/${localStorage.getItem("imagem")}`);

const desc = document.getElementById("desc");
desc.innerHTML = localStorage.getItem("desc");

const name = document.getElementById("name");
name.innerHTML = localStorage.getItem("titulo");

const status = document.getElementById("status");
status.innerHTML = localStorage.getItem("estado");

const now = document.getElementById("now");
now.innerHTML = `R$ ${localStorage.getItem("valor")}`;

const payments = document.getElementById("payments");
const pagamento = localStorage.getItem("pagamento");
const paymentss = document.createElement("IMG");
paymentss.setAttribute("id", "paymentss");
const p = document.createElement("p");
p.style.fontSize = "1.1em";

if (pagamento === "paypal") {
  paymentss.setAttribute("src", "../assets/logopag/Paypal.png");
  payments.appendChild(paymentss);
} else if (pagamento === "Dinheiro") {
  p.innerHTML = "Dinheiro";
  payments.appendChild(p);
} else {
  p.innerHTML = "Boleto";
  payments.appendChild(p);
}

const tamanho = document.getElementById("tamanho");
tamanho.innerHTML = localStorage.getItem("tamanho");

const marcaproduto = document.getElementById("marcaproduto");
if (localStorage.getItem("marca") === "") {
  marcaproduto.innerHTML = "GENÉRICA";
} else {
  marcaproduto.innerHTML = localStorage.getItem("marca");
}

const cor = document.getElementById("cor");
cor.innerHTML = localStorage.getItem("cor");

const qr = $.ajax({
  type: "GET",
  contentType: "application/json",
  url: `/users/${localStorage.getItem("usuario_id")}`
});
qr.done(function(data) {
  console.log(data);
  const nameOwner = document.getElementById("nameOwner");
  if (data.is_brecho === "S") {
    nameOwner.innerHTML = data.nome;
  } else {
    let d;
    if (data.sexo === "M") {
      d = "do";
      nameOwner.innerHTML = `Brechó ${d} ${data.nome}`;
    } else {
      d = "da";
      nameOwner.innerHTML = `Brechó ${d} ${data.nome}`;
    }
  }
  const vendedor = document.getElementById("vendedor");
  vendedor.setAttribute("href", "/myprofile");
});
