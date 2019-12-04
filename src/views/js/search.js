function search() {
  const busca = document.getElementById("idSearch").value;
  if (busca === "") {
    alert("Opa! Parece que voce não digitou sua busca");
  } else {
    location.href = "/search";
  }
}
