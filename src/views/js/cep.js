$(document).ready(function() {
  const $campo = $("#cep");
  $campo.mask("00000-000", { reverse: true });
});

$(document).ready(function() {
  function limpa_formulário_cep() {
    // Limpa valores do formulário de cep.
    $("#rua").val("");
    $("#bairro").val("");
    $("#cidade").val("");
    $("#uf").val("");
  }

  // Quando o campo cep perde o foco.
  $("#cep").blur(function() {
    // Nova variável "cep" somente com dígitos.
    const cep = $(this)
      .val()
      .replace(/\D/g, "");

    // Verifica se campo cep possui valor informado.
    if (cep != "") {
      // Expressão regular para validar o CEP.
      const validacep = /^[0-9]{8}$/;

      // Valida o formato do CEP.
      if (validacep.test(cep)) {
        // Preenche os campos com "..." enquanto consulta webservice.
        $("#rua").val("...");
        $("#bairro").val("...");
        $("#cidade").val("...");
        $("#uf").val("...");
        $("#ibge").val("...");

        // Consulta o webservice viacep.com.br/
        $.getJSON(`https://viacep.com.br/ws/${cep}/json/?callback=?`, function(
          dados
        ) {
          if (!("erro" in dados)) {
            // Atualiza os campos com os valores da consulta.
            $("#rua").val(dados.logradouro);
            $("#bairro").val(dados.bairro);
            $("#cidade").val(dados.localidade);
            $("#uf").val(dados.uf);
            $("#ibge").val(dados.ibge);
          } // end if.
          else {
            // CEP pesquisado não foi encontrado.
            limpa_formulário_cep();
            alert("CEP não encontrado.");
          }
        });
      } // end if.
      else {
        // cep é inválido.
        limpa_formulário_cep();
        alert("Formato de CEP inválido.");
      }
    } // end if.
    else {
      // cep sem valor, limpa formulário.
      limpa_formulário_cep();
    }
  });
});

function calcular() {
  const frete = require("frete");

  frete()
    .cepOrigem("60866450")
    .peso(1)
    .formato(1)
    .comprimento(16)
    .altura(2)
    .largura(11)
    .diametro(1)
    .maoPropria("N")
    .valorDeclarado(50)
    .avisoRecebimento("S")
    .servico(frete.codigos.sedex)
    .precoPrazo("60866450", function(err, results) {
      console.log(err);
      console.log(results);
    });
}
