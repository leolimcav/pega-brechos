function showPwd(id, eye) {
  const pwd = document.getElementById(id);
  const olho = document.getElementById(eye);

  if (pwd.type === "password") {
    pwd.type = "text";
    olho.src = "../assets/icons/olhoaberto.svg";
  } else {
    pwd.type = "password";
    olho.src = "../assets/icons/olhofechado.svg";
  }
}
