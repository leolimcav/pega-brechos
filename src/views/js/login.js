$(function() {
  $("#entrar").click(function(e) {
    e.preventDefault();

    const email = document.getElementById("emailLogin");
    const senha = document.getElementById("password");

    const data = {};
    data.email = email.value;
    data.senha = senha.value;

    $.get({
      }
    });
  });
});
