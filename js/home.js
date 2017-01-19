function takePhoto() {
  document.getElementById("photo_taken").innerHTML = "✗";

  $.ajax({
    type: "POST",
    url: "~/take_pic.py"
  }).done(function( o ) {
    document.getElementById("photo_taken").innerHTML = "✓";
  });
}

function takeVideo() {
  document.getElementById("video_taken").innerHTML = "✗";

  $.ajax({
    type: "POST",
    url: "~/take_vid.py"
  }).done(function( o ) {
    document.getElementById("video_taken").innerHTML = "✓";
  });
}