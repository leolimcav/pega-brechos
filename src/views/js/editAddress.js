const cep = document.getElementById("cep");
const cidade = document.getElementById("cidade");
const uf = document.getElementById("uf");
const logradouro = document.getElementById("rua");
const numero = document.getElementById("number");
const bairro = document.getElementById("bairro");
const complemento = document.getElementById("comp");

cep.value = localStorage.getItem("cep");
cidade.value = localStorage.getItem("cidade");
uf.value = localStorage.getItem("uf");
logradouro.value = localStorage.getItem("logradouro");
bairro.value = localStorage.getItem("bairro");
numero.value = localStorage.getItem("numero");
if (complemento.value === undefined) {
  complemento.value = " ";
} else {
  complemento.value = localStorage.getItem("complemento");
}
$(function() {
  $("#submit").click(function(e) {
    e.preventDefault();
    const data = {};
    data.cep = cep.value;
    data.logradouro = logradouro.value;
    data.bairro = bairro.value;
    data.cidade = cidade.value;
    data.uf = uf.value;
    data.numero = numero.value;
    data.complemento = complemento.value;

    const id_endereco = localStorage.getItem("id_endereco");
    console.log(id_endereco);
    const request = $.ajax({
      type: "PUT",
      data: JSON.stringify(data),
      contentType: "application/json",
      url: `/users/addresses/${id_endereco}`
    });

    request.done(function(data) {
      console.log(data.usuario_id);
      console.log("ok");
    });

    request.fail(function(jqXHR, textStatus) {
      console.log(textStatus.err);
    });
  });
});
