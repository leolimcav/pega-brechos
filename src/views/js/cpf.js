$(document).ready(function() {
  const $campo = $("#cpf");
  $campo.mask("000.000.000-00", { reverse: true });
});

$(document).ready(function() {
  const $campo = $("#rg");
  $campo.mask("0000000000-0", { reverse: true });
});

$(document).ready(function() {
  const $campo = $("#telefone");
  $campo.mask("00 0 00000000", { reverse: true });
});
