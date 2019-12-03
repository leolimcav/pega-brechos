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

$(function() {
  $("#btn").click(function(e) {
    e.preventDefault();
    const title = document.getElementById("title");
    const img = document.getElementById("picture");
    const desc = document.getElementById("desc");
    let tags = document.getElementById("tags");
    const valor = document.getElementById("valor");
    const cor = document.getElementById("cor");
    const cond = document.getElementById("condicao");
    const condValue = cond.options[cond.selectedIndex].value;
    const tamanhoPeca = document.getElementById("tamanhoPeca");
    const marca = document.getElementById("marca");
    const pagamento = document.querySelector('input[name="pagamento"]:checked');

    tags = tags.value.split(",");
    tags.pop();
    console.log(tags);
    const categorias = tags.map(item => {
      const pos = availableTags.indexOf(item) + 1;
      return Number(pos);
    });
    console.log(categorias);
    if (
      img.value === "" ||
      title.value === "" ||
      desc.value === "" ||
      tags.value === "" ||
      valor.value === "" ||
      tamanhoPeca.value === "" ||
      pagamento.value === "" ||
      cor.value === ""
    ) {
      alert("Preencha os campos obrigatórios para poder efetuar o cadastro");
    }
    if (marca.value === undefined) {
      marca.value = "GENERICA";
    }

    const data = new FormData();
    data.append("titulo", title.value);
    data.append("descricao", desc.value);
    data.append("marca", marca.value);
    data.append("cor", cor.value);
    data.append("categoria", categorias);
    data.append("valor", valor.value);
    data.append("tamanho", tamanhoPeca.value);
    data.append("estado", condValue);
    data.append("imagem", img.files[0], img.files[0].name);

    const id = localStorage.getItem("id");
    const request = $.ajax({
      type: "POST",
      data,
      processData: false,
      contentType: false,
      url: `/products/${id}`
    });
    request.done(function(product) {
      const idproduto = product.id;
      console.log(product);
      const data_anuncio = {};
      data_anuncio.usuario_id = id;
      data_anuncio.product_id = idproduto;
      let dd = new Date();
      dd = `${dd.getFullYear()}-${dd.getMonth()}-${dd.getDate()}`;
      data_anuncio.data_anuncio = dd;
      data_anuncio.tipo_pagamento = pagamento.value;
      const req = $.ajax({
        type: "POST",
        data: JSON.stringify(data_anuncio),
        contentType: "application/json",
        url: `/announcements/products/${idproduto}/users/${id}`
      });
      req.done(function(ad) {
        console.log("ok");
      });
      req.fail(function(jqXHR, textStatus) {
        console.log(textStatus.err);
      });
    });
    request.fail(function(jqXHR, textStatus) {
      console.log(textStatus);
    });
  });
});
