const availableTags = [
  "Feminino",
  "Masculino",
  "Roupa",
  "Acessório",
  "Calçado",
  "Camisa",
  "Calça",
  "Regata",
  "Vestido",
  "Short",
  "Saia",
  "Sapato",
  "Sandália",
  "Bolsa",
  "Brinco",
  "Colar",
  "Pulseira",
  "Jaqueta",
  "Cropped"
];

const title = document.getElementById("title");
const imgThumb = document.getElementById("imgThumb");
const img = document.getElementById("picture");
const desc = document.getElementById("desc");
let tags = document.getElementById("tags");
const valor = document.getElementById("valor");
const cor = document.getElementById("cor");
const cond = document.getElementById("condicao");
const tamanhoPeca = document.getElementById("tamanhoPeca");
const marca = document.getElementById("marca");
const pagamento = document.querySelector('input[name="pagamento"]:checked');

tags = tags.value.split(",");
tags.pop();
const categorias = tags.map(item => {
  const pos = availableTags.indexOf(item) + 1;
  return pos;
});

imgThumb.setAttribute("src", `files/${localStorage.getItem("imagem")}`);
title.value = localStorage.getItem("titulo");
desc.value = localStorage.getItem("descricao");
valor.value = localStorage.getItem("valor");
cor.value = localStorage.getItem("cor");

if (localStorage.getItem("estado") === "Novo") {
  cond.selectedIndex = 0;
} else {
  cond.selectedIndex = 1;
}
tamanhoPeca.value = localStorage.getItem("tamanho");
marca.value = localStorage.getItem("marca");
const condValue = cond.options[cond.selectedIndex].value;

$(function() {
  $("#btn").click(function(e) {
    e.preventDefault();

    const data = new FormData();
    data.append("titulo", title.value);
    data.append("descricao", desc.value);
    data.append("marca", marca.value);
    data.append("cor", cor.value);
    data.append("categoria", categorias);
    data.append("valor", valor.value);
    data.append("tamanho", tamanhoPeca.value);
    data.append("estado", condValue);
    console.log(img.files);
    data.append("imagem", img.files[0], img.files[0].name);

    const id = localStorage.getItem("id");
    const request = $.ajax({
      type: "PUT",
      data,
      processData: false,
      contentType: false,
      url: `/products/${localStorage.getItem("id_produto")}`
    });

    request.done(function(data) {
      console.log("ok");
      localStorage.removeItem("titulo");
      localStorage.removeItem("descricao");
      localStorage.removeItem("marca");
      localStorage.removeItem("cor");
      localStorage.removeItem("categoria");
      localStorage.removeItem("imagem");
      localStorage.removeItem("tamanho");
      localStorage.removeItem("valor");
      localStorage.removeItem("id_produto");
      localStorage.removeItem("estado");

      location.href = "/myprofile";
    });

    request.fail(function(jqXHR, textStatus) {
      console.log(textStatus.err);
    });
  });
});
