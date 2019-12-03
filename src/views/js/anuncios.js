const id = localStorage.getItem("id");
// let id_endereco;
// let bairro;
// let cep;
// let logradouro;
// let cidade;
// let uf;
// let complemento;
// let numero;
// routes.get("/announcements/users/:user_id", AnuncioController.index);
// ;

const request = $.ajax({
  type: "GET",
  contentType: "application/json",
  url: `/announcements/users/${id}`
});
request.done(function(data) {
  console.log(data[0].anuncio_produto);
  data.forEach(element => {
    const id_produto = element.anuncio_produto.id;
    const titulo_produto = element.anuncio_produto.titulo;
    const valor_produto = element.anuncio_produto.valor;

    const main = document.getElementById("main");
    const section = document.createElement("section");
    section.style.marginTop = "5%";

    const items = document.createElement("div");
    items.setAttribute("class", "items");

    const item = document.createElement("div");
    item.setAttribute("class", "item");

    const rowAnuncio = document.createElement("div");
    rowAnuncio.setAttribute("class", "rowAnuncio");

    const prod = {
      id: id_produto,
      titulo: titulo_produto,
      descricao: element.descricao,
      estado: element.estado,
      tamanho: element.tamanho,
      valor: valor_produto
    };
    const edit = document.createElement("p");
    edit.setAttribute("class", "edit");
    edit.setAttribute("onclick", `editar(${prod})`);
    edit.innerHTML = "Editar";

    const anuncio = document.createElement("label");
    anuncio.setAttribute("for", "anuncio");
    const inputAnuncio = document.createElement("input");
    inputAnuncio.setAttribute("type", "checkbox");
    inputAnuncio.setAttribute("name", "anuncio");

    anuncio.appendChild(inputAnuncio);
    rowAnuncio.appendChild(edit);
    rowAnuncio.appendChild(anuncio);

    const a = document.createElement("a");
    a.setAttribute("onclick", `verproduto(${prod})`);

    const img = document.createElement("IMG");
    img.setAttribute("src", "");

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
  });
});
request.fail(function(jqXHR, textStatus) {
  console.log(textStatus.err);
});
