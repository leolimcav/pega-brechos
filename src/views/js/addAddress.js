$(function() {
  $("#submit").click(function(e) {
    e.preventDefault();

    const cep = document.getElementById("cep");
    const cidade = document.getElementById("cidade");
    const uf = document.getElementById("uf");
    const rua = document.getElementById("rua");
    const number = document.getElementById("number");
    const bairro = document.getElementById("bairro");
    const comp = document.getElementById("comp");

    if (
      cep.value === "" ||
      rua.value === "" ||
      bairro.value === "" ||
      cidade.value === "" ||
      uf.value === "" ||
      number.value === ""
    ) {
      alert("Preencha os campos obrigatórios para poder efetuar o cadastro");
    }
    if (comp.value === undefined) {
      comp.value = " ";
    }
    // cep,
    // logradouro,
    // bairro,
    // cidade,
    // uf,
    // numero,
    // complemento
    const data = {};
    data.cep = cep.value;
    data.logradouro = rua.value;
    data.bairro = bairro.value;
    data.cidade = cidade.value;
    data.uf = uf.value;
    data.numero = number.value;
    data.complemento = comp.value;

    const id = localStorage.getItem("id");

    const request = $.ajax({
      type: "POST",
      data: JSON.stringify(data),
      contentType: "application/json",
      url: `/users/addresses/${id}`
    });
    request.done(function(data) {
      location.href = "/";
    });
    request.fail(function(jqXHR, textStatus) {
      console.log(textStatus.err);
    });
  });
});
