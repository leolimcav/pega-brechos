function addUser() {
  // const nome = document.getElementById("nome").value;
  // const email = document.getElementById("email").value;
  // const senha = document.getElementById("pwd").value;
  // const cpf = document.getElementById("cpf").value;
  // const rg = document.getElementById("rg").value;
  // const data_nascimento = document.getElementById("date").value;
  // const sexo = document.getElementsByName("sex");
  // const telefone = document.getElementById("telefone");
  // if (sexo.value === "") {
  //   sexo.value = "null";
  // }
  // if (telefone.value === "") {
  //   telefone.value = "null";
  // }
  $.ajax("/users/1", {
    method: "GET",
    async: true
  }).then(res => {
    console.log(res);
  });
  // $.ajax({
  //   method: "POST",
  //   url: "/users",
  //   data: {
  //     nome,
  //     email,
  //     senha,
  //     telefone,
  //     rg,
  //     cpf,
  //     data_nascimento,
  //     sexo
  //   },
  //   async: true
  // }).then(res => {
  //   console.log(res);
  // });
}

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
