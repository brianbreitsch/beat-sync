var express = require('express')
var app = express()

app.get('/', function (req, res) {
  res.send('Hello World!<br>GOTO: `index.html` for test application.')
})

app.post('/upload', function(req, res) {
  var sampleFile;

  if (!req.files) {
    res.send('No files were uploaded.');
    return;
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  sampleFile = req.files.sampleFile;

  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv('/somewhere/on/your/server/filename.jpg', function(err) {
    if (err) {
      res.status(500).send(err);
    }
    else {
      res.send('File uploaded!');
    }
  });
});

app.use(express.static('client'));

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
