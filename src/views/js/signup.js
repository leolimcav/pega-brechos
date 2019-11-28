$("#cadastrar").submit(function(event) {
  // Stop form from submitting normally
  event.preventDefault();

  // Get some values from elements on the page:
  const $form = $(this);
  const nome = $form.find("input[id='nome']");
  const email = $form.find("input[id='email']");
  const senha = $form.find("input[id='senha']");
  const cpf = $form.find("input[id='cpf']");
  const rg = $form.find("input[id='rg']");
  const date = $form.find("input[id='date']");
  const sex = $form.find("input[name='sex']");
  const telefone = $form.find("input[id='telefone']");

  console.log(
    nome.value,
    email.value,
    senha.value,
    cpf.value,
    rg.value,
    date.value,
    sex.value,
    telefone.value
  );

  // Send the data using post
  const posting = $.post("/users", {
    nome: nome.value,
    email: email.value,
    senha: senha.value,
    telefone: telefone.value,
    rg: rg.value,
    cpf: cpf.value,
    date: date.value,
    sex: sex.value
  });

  // Put the results in a div
  posting.done(function(res) {
    console.log(res);
  });
});

// function addUser() {
//   const nome = document.getElementById("nome");
//   const email = document.getElementById("email");
//   const senha = document.getElementById("pwd");
//   const cpf = document.getElementById("cpf");
//   const rg = document.getElementById("rg");
//   const data_nascimento = document.getElementById("date");
//   const sexo = document.getElementsByName("sex");
//   const telefone = document.getElementById("telefone");
//   if (sexo.value === "") {
//     sexo.value = "null";
//   }
//   if (telefone.value === "") {
//     telefone.value = "null";
//   }

//   $.ajax({
//     method: "POST",
//     url: "/users",
//     async: true,
//     data: {
//       nome: nome.value,
//       email: email.value,
//       senha: senha.value,
//       telefone: telefone.value,
//       rg: rg.value,
//       cpf: cpf.value,
//       data_nascimento: data_nascimento.value,
//       sexo: sexo.value
//     }
//   }).then(res => {
//     console.log(res);
//   });
//   // console.log(
//   //   nome.value,
//   //   email.value,
//   //   senha.value,
//   //   telefone.value,
//   //   rg.value,
//   //   cpf.value,
//   //   data_nascimento.value,
//   //   sexo.value
//   // );
// }

// class Usuario {
//   constructor(
//     nome,
//     email,
//     cpf,
//     rg,
//     data_nascimento,
//     hash_senha,
//     sexo,
//     telefone
//   ) {
//     this.nome = nome;
//     this.email = email;
//     this.hash_senha = hash_senha;
//     this.cpf = cpf;
//     this.rg = rg;
//     this.data_nascimento = data_nascimento;
//     this.sexo = sexo;
//     this.telefone = telefone;
//     this.nota = "null";
//   }
// }
// // [nome, email, hash_senha, telefone, rg, cpf, data_nascimento, sexo]
// function salvar() {
//   const nome = document.getElementById("nome").value;
//   const email = document.getElementById("email").value;
//   const hash_senha = document.getElementById("pwd").value;
//   const cpf = document.getElementById("cpf").value;
//   const rg = document.getElementById("rg").value;
//   const data_nascimento = document.getElementById("date").value;
//   const sexo = document.getElementsByName("sex");
//   const telefone = document.getElementById("telefone");
//   if (sexo === "") {
//     sexo.value = "null";
//   }
//   if (telefone === "") {
//     telefone.value = "null";
//   }

//   const usuario = new Usuario(
//     nome,
//     email,
//     cpf,
//     rg,
//     data_nascimento,
//     hash_senha,
//     sexo,
//     telefone
//   );
//   const usuarioJSON = JSON.stringify(usuario);
//   enviar(usuarioJSON);
// }

// function enviar(usuarioJSON) {
//   const xhttp = new XMLHttpRequest();
//   xhttp.onreadystatechange = function() {
//     if (this.readyState == 4) {
//       if (this.status >= 200 && this.status < 300) {
//         location.href = "/index";
//         createstorage(usuarioJSON);
//       } else {
//         alert("erro");
//       }
//     }
//   };

//   xhttp.open("POST", "/user");
//   xhttp.setRequestHeader("Content-type", "application/json");
//   xhttp.send(usuarioJSON);
// }

// function createstorage(usuarioJSON) {
//   if (typeof Storage !== "undefined") {
//     // Store
//     localStorage.setItem("usuario", usuarioJSON);

//     // Retrieve
//   } else {
//     console.log("Sorry, your browser does not support Web Storage...");
//   }
// }
