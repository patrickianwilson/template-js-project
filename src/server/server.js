const port = 8080

var express = require('express')

var app = express();

app.get('/', function(req, resp){
    resp.send("Hello World")
})


app.use(express.static('../app/'))

app.listen(port, function () {
    console.log("Starting server on port: " + port)
})