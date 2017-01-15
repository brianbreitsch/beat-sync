var express = require('express')
var app = express()

app.get('/', function (req, res) {
  res.send('Hello World!<br>GOTO: `index.html` for test application.')
})

app.use(express.static('client'));

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
