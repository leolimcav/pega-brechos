$(function() {
  const availableTags = [
    "Feminino",
    "Masculino",
    "Roupa",
    "Acessório",
    "Calçado",
    "Camisa",
    "Calça",
    "Chinelo",
    "Regata",
    "Vestido",
    "Short",
    "Saia",
    "Sapato",
    "Sandália",
    "Bolsa",
    "Brinco",
    "Colar",
    "Pulseira",
    "Short saia",
    "Jaqueta",
    "Cropped"
  ];
  function split(val) {
    return val.split(/,\s*/);
  }
  function extractLast(term) {
    return split(term).pop();
  }

  $("#tags")
    // don't navigate away from the field on tab when selecting an item
    .on("keydown", function(event) {
      if (
        event.keyCode === $.ui.keyCode.TAB &&
        $(this).autocomplete("instance").menu.active
      ) {
        event.preventDefault();
      }
    })
    .autocomplete({
      minLength: 0,
      source(request, response) {
        // delegate back to autocomplete, but extract the last term
        response(
          $.ui.autocomplete.filter(availableTags, extractLast(request.term))
        );
      },
      focus() {
        // prevent value inserted on focus
        return false;
      },
      select(event, ui) {
        const terms = split(this.value);
        // remove the current input
        terms.pop();
        // add the selected item
        terms.push(ui.item.value);
        // add placeholder to get the comma-and-space at the end
        terms.push("");
        this.value = terms.join(", ");
        return false;
      }
    });
});
