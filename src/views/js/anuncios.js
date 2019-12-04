const id = localStorage.getItem("id");
let id_produto;
const request = $.ajax({
  type: "GET",
  contentType: "application/json",
  url: `/announcements/users/${id}`
});
request.done(function(data) {
  const main = document.getElementById("main");

  let v = 0;
  let i = 0;
  // data.forEach(element =>
  for (let j = 0; j < data.length; j += 4) {
    const section = document.createElement("section");
    section.style.marginTop = "5%";
    const items = document.createElement("div");
    items.setAttribute("class", "items");

    for (i = v; i < v + 4; i++) {
      id_produto = data[i].anuncio_produto.id;
      const titulo_produto = data[i].anuncio_produto.titulo;
      const valor_produto = data[i].anuncio_produto.valor;

      const item = document.createElement("div");
      item.setAttribute("class", "item");

      const rowAnuncio = document.createElement("div");
      rowAnuncio.setAttribute("class", "rowAnuncio");

      const prod = {
        id: id_produto,
        titulo: data[i].anuncio_produto.titulo,
        descricao: data[i].anuncio_produto.descricao,
        estado: data[i].anuncio_produto.estado,
        tamanho: data[i].anuncio_produto.tamanho,
        valor: valor_produto,
        imagem: data[i].anuncio_produto.imagem,
        cor: data[i].anuncio_produto.cor,
        marca: data[i].anuncio_produto.marca
      };
      const edit = document.createElement("p");
      edit.setAttribute("class", "edit");
      edit.setAttribute("onclick", `editar(${JSON.stringify(prod)})`);
      edit.innerHTML = "Editar";

      const anuncio = document.createElement("label");
      anuncio.setAttribute("for", "anuncio");
      const inputAnuncio = document.createElement("input");
      inputAnuncio.setAttribute("type", "checkbox");
      inputAnuncio.setAttribute("name", "anuncio");
      inputAnuncio.setAttribute("value", `${id_produto}`);

      anuncio.appendChild(inputAnuncio);
      rowAnuncio.appendChild(edit);
      rowAnuncio.appendChild(anuncio);

      const a = document.createElement("a");
      a.setAttribute("onclick", `verproduto(${data[i].id})`);

      const img = document.createElement("img");
      img.setAttribute("src", `files/${data[i].anuncio_produto.imagem}`);

      const info = document.createElement("div");
      info.setAttribute("class", "info");

      const row = document.createElement("div");
      row.setAttribute("class", "row");

      const price = document.createElement("div");
      price.setAttribute("class", "price");
      price.innerHTML = `R$ ${valor_produto}`;

      row.appendChild(price);

      const name = document.createElement("div");
      name.setAttribute("class", "name");
      name.innerHTML = titulo_produto;

      info.appendChild(row);
      info.appendChild(name);

      a.appendChild(img);
      a.appendChild(info);

      item.appendChild(rowAnuncio);
      item.appendChild(a);
      items.appendChild(item);
      section.appendChild(items);
      main.appendChild(section);
    }
    v += 4;
  }
});
request.fail(function(jqXHR, textStatus) {
  console.log(textStatus.err);
});

// const prod = {
//   id: id_produto,
//   titulo: titulo_produto,
//   descricao: element.descricao,
//   estado: element.estado,
//   tamanho: element.tamanho,
//   valor: valor_produto
// imagem:data[i].anuncio_produto.imagem
// cor: data[i].anuncio_produto.cor,
// marca: data[i].anuncio_produto.marca,
// categoria: categorias
// };

function editar(prod) {
  const {
    id,
    titulo,
    descricao,
    estado,
    tamanho,
    valor,
    imagem,
    cor,
    marca
  } = prod;
  localStorage.setItem("id_produto", id);
  localStorage.setItem("titulo", titulo);
  localStorage.setItem("descricao", descricao);
  localStorage.setItem("estado", estado);
  localStorage.setItem("tamanho", tamanho);
  localStorage.setItem("valor", valor);
  localStorage.setItem("imagem", imagem);
  localStorage.setItem("cor", cor);
  localStorage.setItem("marca", marca);

  location.href = "/editad";
}

function excluir() {
  const id_products = [];
  $.each($("input[name='anuncio']:checked"), function() {
    id_products.push($(this).val());
  });
  console.log(id_products);
  for (let i = 0; i <= id_products.length; i++) {
    const req = $.ajax({
      type: "DELETE",
      contentType: "application/json",
      url: `/products/${id_products[i]}`
    });
    req.done(function(data) {
      location.href = "/myprofile";
    });
    req.fail(function(jqXHR, textStatus) {
      console.log(textStatus.err);
    });
  }
}

function verproduto(id_prod) {
  const qr = $.ajax({
    type: "GET",
    contentType: "application/json",
    url: `/announcements/${id_prod}/users/${localStorage.getItem("id")}`
  });
  qr.done(function(prod) {
    console.log(prod);
    localStorage.setItem("titulo", prod.anuncio_produto.titulo);
    localStorage.setItem("estado", prod.anuncio_produto.estado);
    localStorage.setItem("valor", prod.anuncio_produto.valor);
    localStorage.setItem("pagamento", prod.tipo_pagamento);
    localStorage.setItem("tamanho", prod.anuncio_produto.tamanho);
    localStorage.setItem("marca", prod.anuncio_produto.marca);
    localStorage.setItem("cor", prod.anuncio_produto.cor);
    localStorage.setItem("desc", prod.anuncio_produto.descricao);
    localStorage.setItem("imagem", prod.anuncio_produto.imagem);
    localStorage.setItem("usuario_id", prod.usuario_id);

    location.href = "/product";
  });
}
