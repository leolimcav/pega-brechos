$(function() {
  $("#submit").click(function(e) {
    e.preventDefault();

    const nome = document.getElementById("nome");
    const email = document.getElementById("email");
    const email2 = document.getElementById("email2");

    const senha = document.getElementById("pwd");
    const rg = document.getElementById("rg");
    const cpf = document.getElementById("cpf");
    const date = document.getElementById("date");
    const sexo = document.getElementsByName("sex");
    const telefone = document.getElementById("telefone");

    if (
      nome.value === "" ||
      email.value === "" ||
      senha.value === "" ||
      rg.value === "" ||
      cpf.value === "" ||
      date.value === ""
    ) {
      alert("Preencha os campos obrigatórios para poder efetuar o cadastro");
    } else if (email.value !== email2.value) {
      alert("Os emails devem ser  o mesmo! :)");
    } else {
      if (sexo === undefined) {
        // let newDate = new Date(date);
        sexo.value = "null";
      }
      if (telefone === undefined) {
        telefone.value = "null";
      }

      const data = {};
      data.nome = nome.value;
      data.email = email.value;
      data.senha = senha.value;
      data.rg = rg.value;
      data.cpf = cpf.value;
      data.data_nascimento = date.value;
      data.sexo = sexo.value;
      data.telefone = telefone.value;

      $.ajax({
        type: "POST",
        data: JSON.stringify(data),
        contentType: "application/json",
        url: "/users",
        success(data) {
          console.log("success");
          location.href = "/login";
        }
      });
    }
  });
});
