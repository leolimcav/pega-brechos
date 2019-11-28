$(document).ready(function() {
  const $campo = $("#cpf");
  $campo.mask("00000000000", { reverse: true });
});

$(document).ready(function() {
  const $campo = $("#rg");
  $campo.mask("00000000000", { reverse: true });
});

$(document).ready(function() {
  const $campo = $("#telefone");
  $campo.mask("00000000000", { reverse: true });
});
