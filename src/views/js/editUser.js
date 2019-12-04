const nome = document.getElementById("nome");
const is_brecho = document.querySelector('input[name="brecho"]');
const cpf = document.getElementById("cpf");
const rg = document.getElementById("rg");
const data_nascimento = document.getElementById("date");
const telefone = document.getElementById("telefone");
const sexo = document.querySelector('input[name="sex"]');
const email = document.getElementById("email");
const email_novo = document.getElementById("email2");
const senha = document.getElementById("pwd");
const senha_nova = document.getElementById("newPwd");

nome.value = localStorage.getItem("nome");
if (localStorage.getItem("is_brecho") === "S") {
  $("input:radio[name=brecho][value=S]").click();
} else {
  $("input:radio[name=brecho][value=N]").click();
}

cpf.value = localStorage.getItem("cpf");
rg.value = localStorage.getItem("rg");
data_nascimento.value = localStorage.getItem("data_nascimento");
const getTel = localStorage.getItem("tel");
if (getTel !== "" && getTel !== undefined && getTel !== "null") {
  telefone.value = getTel;
} else {
  telefone.value = "";
}
const getSexo = localStorage.getItem("sexo");
if (getSexo === "F") {
  $("input[name=sex][value=F]").attr("checked", "checked");
} else if (getSexo === "M") {
  $("input[name=sex][value=M]").attr("checked", "checked");
} else if (getSexo === "O") {
  $("input[name=sex][value=O]").attr("checked", "checked");
}
email.value = localStorage.getItem("email");

$(function() {
  $("#att").click(function(e) {
    e.preventDefault();
    if (senha.value === "") {
      alert("Você precisa confirmar sua senha no campo 'Senha Atual'");
    }
    if (senha.value === senha_nova.value) {
      alert("A nova senha precisa ser diferente da senha atual.");
    }
    if (email.value === email_novo.value) {
      const p = document.createElement("p");
      p.style.color = "red";
      p.innerHTML = "O email novo precisa ser diferente do anterior";
      document.getElementById("erro").appendChild(p);
    } else {
      const data = {};
      data.nome = nome.value;
      if (email_novo !== "") {
        data.email = email_novo.value;
      } else {
        data.email = email.value;
      }
      if (senha_nova !== "") {
        data.senha = senha_nova.value;
      } else {
        data.senha = senha.value;
      }
      data.telefone = telefone.value;
      data.rg = rg.value;
      data.cpf = cpf.value;
      data.data_nascimento = data_nascimento.value;
      data.sexo = sexo.value;
      data.is_brecho = is_brecho.value;

      const id = localStorage.getItem("id");

      const request = $.ajax({
        type: "PUT",
        data: JSON.stringify(data),
        contentType: "application/json",
        url: `/users/${id}`
      });

      request.done(function(data) {
        localStorage.setItem("id", data.id);
        localStorage.setItem("nome", data.nome);
        localStorage.setItem("email", data.email);
        localStorage.setItem("cpf", data.cpf);
        localStorage.setItem("rg", data.rg);
        localStorage.setItem("tel", data.telefone);
        localStorage.setItem("data_nascimento", data.data_nascimento);
        localStorage.setItem("sexo", data.sexo);
        localStorage.setItem("is_brecho", data.is_brecho);

        location.href = "/";
      });

      request.fail(function(jqXHR, textStatus) {
        console.log(textStatus.err);
      });
    }
  });
});
