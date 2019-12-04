const id = localStorage.getItem("id");
// let id_endereco;
// let bairro;
// let cep;
// let logradouro;
// let cidade;
// let uf;
// let complemento;
// let numero;

const request = $.ajax({
  type: "GET",
  contentType: "application/json",
  url: `/users/addresses/${id}`
});
request.done(function(data) {
  console.log(data.enderecos);

  data.enderecos.forEach(element => {
    cep = element.cep;
    logradouro = element.logradouro;
    cidade = element.cidade;
    uf = element.uf;
    bairro = element.bairro;
    numero = element.numero;
    complemento = element.complemento;
    const addressList = document.getElementById("addressList");

    const address = document.createElement("div");
    address.setAttribute("class", "address");

    const columnAddress = document.createElement("div");
    columnAddress.setAttribute("class", "columnAddress");

    const strong = document.createElement("strong");

    const p = document.createElement("p");
    const span = document.createElement("span");
    span.setAttribute("id", "name");
    const nome = localStorage.getItem("nome");
    span.appendChild(document.createTextNode(nome));
    p.innerHTML = `Quem recebe: `;
    p.appendChild(span);

    strong.appendChild(p);

    const detailsAddress = document.createElement("p");
    detailsAddress.setAttribute("id", "detailsAddress");
    detailsAddress.innerHTML = `${element.logradouro}, ${element.numero} - ${element.cidade}, ${element.uf}`;

    columnAddress.appendChild(strong);
    columnAddress.appendChild(detailsAddress);

    const rowAddress = document.createElement("div");
    rowAddress.setAttribute("id", "rowAddress");

    const end = {
      id_endereco: element.id,
      cep: element.cep,
      logradouro: element.logradouro,
      cidade: element.cidade,
      uf: element.uf,
      bairro: element.bairro,
      numero: element.numero,
      complemento: element.complemento
    };
    const editIMG = document.createElement("img");
    editIMG.setAttribute("src", "../assets/icons/edit.svg");
    editIMG.setAttribute("width", "18.5%");
    editIMG.setAttribute("onclick", `editAddress(${JSON.stringify(end)})`);

    const deleteIMG = document.createElement("img");
    deleteIMG.setAttribute("src", "../assets/icons/cancel.svg");
    deleteIMG.setAttribute("onclick", `deleteAddress(${element.id})`);

    rowAddress.appendChild(editIMG);
    rowAddress.appendChild(deleteIMG);

    address.appendChild(columnAddress);
    address.appendChild(rowAddress);

    addressList.appendChild(address);
  });
});
request.fail(function(jqXHR, textStatus) {
  console.log(textStatus.err);
});

function editAddress(end) {
  console.log(end);
  const {
    id_endereco,
    cep,
    cidade,
    uf,
    logradouro,
    numero,
    bairro,
    complemento
  } = end;
  localStorage.setItem("id_endereco", id_endereco);
  localStorage.setItem("cep", cep);
  localStorage.setItem("cidade", cidade);
  localStorage.setItem("uf", uf);
  localStorage.setItem("logradouro", logradouro);
  localStorage.setItem("numero", numero);
  localStorage.setItem("bairro", bairro);
  localStorage.setItem("complemento", complemento);
  location.href = "/editAddress";
}

function deleteAddress(id) {
  const req = $.ajax({
    type: "DELETE",
    contentType: "application/json",
    url: `/users/addresses/${id}`
  });
  req.done(function(data) {
    alert("Endereço excluido! :)");
    localStorage.removeItem("cep");
    localStorage.removeItem("logradouro");
    localStorage.removeItem("bairro");
    localStorage.removeItem("cidade");
    localStorage.removeItem("uf");
    localStorage.removeItem("numero");
    localStorage.removeItem("complemento");
    location.href = "/address";
  });
  req.fail(function(jqXHR, textStatus) {
    console.log(textStatus.err);
  });
}
