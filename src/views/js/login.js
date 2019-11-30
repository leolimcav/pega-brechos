localStorage.clear();

$(function() {
  $("#logarBtn").click(function(e) {
    e.preventDefault();

    const email = document.getElementById("emailLogin");
    const pwd = document.getElementById("pwd");

    const data = {};
    data.email = email.value;
    data.senha = pwd.value;

    console.log(email.value, pwd.value);
    $.ajax({
      type: "POST",
      data: JSON.stringify(data),
      contentType: "application/json",
      url: "/session",
      success(data) {
        if (typeof Storage !== "undefined") {
          // Store
          localStorage.setItem("data", data);
          location.href = "/";

          // Retrieve
        } else {
          console.log("Sorry, your browser does not support Web Storage...");
        }
      }
    });
  });
});
