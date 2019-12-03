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
    const categorias = tags.map(item => {
      const pos = availableTags.indexOf(item) + 1;
      return pos;
    });
    if (
      title.value === "" ||
      desc.value === "" ||
      tags.value === "" ||
      valor.value === "" ||
      tamanhoPeca.value === "" ||
      pagamento.value === ""
    ) {
      alert("Preencha os campos obrigatórios para poder efetuar o cadastro");
    }
    if (cor.value === undefined) {
      cor.value = " ";
    }
    if (marca.value === undefined) {
      marca.value = "Genérica";
    }

    const data = {};
    data.titulo = title.value;
    data.descricao = desc.value;
    data.categoria = categorias;
    data.valor = valor.value;
    data.tamanho = tamanhoPeca.value;
    data.estado = condValue;
    data.usuario_id = localStorage.getItem("id");

    const id = localStorage.getItem("id");

    const request = $.ajax({
      type: "POST",
      data: JSON.stringify(data),
      contentType: "application/json",
      url: `/products/${id}`
    });
    request.done(function(product) {
      idproduto = product.id;
      const data_anuncio = {};
      data_anuncio.usuario_id = id;
      data_anuncio.product_id = idproduto;
      let dd = new Date();
      dd = `${dd.getFullYear()}-${dd.getMonth()}-${dd.getDate()}`;
      data_anuncio.data_anuncio = dd;

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
      console.log(textStatus.err);
    });
  });
});
