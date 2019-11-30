$(function() {
  $("#picture").change(function() {
    const input = this;
    const url = $(this).val();
    const ext = url.substring(url.lastIndexOf(".") + 1).toLowerCase();
    if (
      input.files &&
      input.files[0] &&
      (ext == "gif" || ext == "png" || ext == "jpeg" || ext == "jpg")
    ) {
      const reader = new FileReader();

      reader.onload = function(e) {
        $("#imgThumb").attr("src", e.target.result);
      };
      reader.readAsDataURL(input.files[0]);
    } else {
      $("#imgThumb").attr("src", "../assets/icons/camera.svg");
    }
  });
});
