function sendFile(file) {
  var uri = "/index.php";
  var xhr = new XMLHttpRequest();
  var fd = new FormData();

  xhr.open("POST", uri, true);
  xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200) {
          alert(xhr.responseText); // handle response.
      }
  };
  fd.append('myFile', file);
  // Initiate a multipart/form-data upload
  xhr.send(fd);
}

function sendFiles() {
  var imgs = document.querySelectorAll(".obj");

  for (var i = 0; i < imgs.length; i++) {
    new FileUpload(imgs[i], imgs[i].file);
  }
}

function stopEvent(e) {
  e.preventDefault();
  e.stopPropagation();
}

function onDrop(e) {
  e.stopPropagation();
  e.preventDefault();

  let dt = e.dataTransfer;
  let files = dt.files;
  console.log(files);
  console.log(files[0].name);
  for (let i = 0; i < files.length; ++i) {
    let file = files[i];
    console.log(i);
  }
  //for (var i=0; i < files.length; i++) {
  //  sendFile(files[i]);
  //}
}


window.onload = function() {
  var dropzone = document.getElementById("dropzone");
  dropzone.addEventListener("dragenter", stopEvent, false);
  dropzone.addEventListener("dragover", stopEvent, false);
  dropzone.addEventListener("drop", onDrop, false);
}



