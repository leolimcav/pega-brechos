localStorage.clear();

$(function() {
  $("#logarBtn").click(function(e) {
    e.preventDefault();

    const email = document.getElementById("emailLogin");
    const pwd = document.getElementById("pwd");

    const data = {};
    data.email = email.value;
    data.senha = pwd.value;

    const request = $.ajax({
      type: "POST",
      data: JSON.stringify(data),
      contentType: "application/json",
      url: "/session"
    });
    request.done(function(data) {
      localStorage.setItem("id", data.id);

      if (data.id === undefined) {
        alert("email/senha inválidos");
        localStorage.clear();
      } else {
        localStorage.setItem("nome", data.nome);
        localStorage.setItem("email", data.email);
        localStorage.setItem("cpf", data.cpf);
        localStorage.setItem("rg", data.rg);
        localStorage.setItem("tel", data.telefone);
        localStorage.setItem("data_nascimento", data.data_nascimento);
        localStorage.setItem("sexo", data.sexo);
        localStorage.setItem("is_brecho", data.is_brecho);
        localStorage.setItem("senha", data.hash_senha);
        location.href = "/";
      }
    });

    request.fail(function(jqXHR, textStatus) {
      console.log(textStatus.err);
    });
  });
});
