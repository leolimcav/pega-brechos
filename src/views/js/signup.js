$(function() {
  $("#submit").click(function(e) {
    e.preventDefault();

    const nome = document.getElementById("nome");
    const email = document.getElementById("email");
    const email2 = document.getElementById("email2");
    const senha = document.getElementById("pwd");
    const telefone = document.getElementById("telefone");
    const rg = document.getElementById("rg");
    const cpf = document.getElementById("cpf");
    const date = document.getElementById("date");
    const sexo = document.querySelector('input[name="sex"]:checked');
    const is_brecho = document.querySelector('input[name="brecho"]:checked');

    // nome,
    // email,
    // senha,
    // telefone,
    // rg,
    // cpf,
    // data_nascimento,
    // sexo,
    // is_brecho
    if (
      nome.value === "" ||
      email.value === "" ||
      email2.value === "" ||
      senha.value === "" ||
      rg.value === "" ||
      cpf.value === "" ||
      date.value === "" ||
      is_brecho === "null"
    ) {
      alert("Preencha os campos obrigatórios para poder efetuar o cadastro");
    } else if (email.value !== email2.value) {
      alert("Os emails devem ser  o mesmo! :)");
    }
    if (telefone.value === "null") {
      telefone.value = "null";
    }
    const data = {};
    data.nome = nome.value;
    data.email = email.value;
    data.senha = senha.value;
    data.telefone = telefone.value;
    data.rg = rg.value;
    data.cpf = cpf.value;
    data.data_nascimento = date.value;
    data.sexo = sexo.value;
    data.is_brecho = is_brecho.value;

    const dName = data.nome;
    const dEmail = data.email;
    const dCpf = data.cpf;
    const dRG = data.rg;
    const dTel = data.telefone;
    const dDate = data.data_nascimento;
    const dSexo = data.sexo;

    const request = $.ajax({
      type: "POST",
      data: JSON.stringify(data),
      contentType: "application/json",
      url: "/users"
    });
    request.done(function(data) {
      localStorage.setItem("nome", dName);
      localStorage.setItem("email", dEmail);
      localStorage.setItem("cpf", dCpf);
      localStorage.setItem("rg", dRG);
      localStorage.setItem("tel", dTel);
      localStorage.setItem("data_nascimento", dDate);
      localStorage.setItem("sexo", dSexo);
      location.href = "/";
    });
    request.fail(function(jqXHR, textStatus) {
      console.log(textStatus.err);
    });
  });
});
