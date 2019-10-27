var express = require('express')

var app = require('express')(),
 server = require('http').Server(app);
//  io = require('socket.io')(server);
// var server = express();

var bodyParser = require('body-parser');
var data = require('./faceAtt/faceAtt-API');
var socketIO = require('./faceAtt/socketIO')



// const socket = http.createServer(server);
// const io = socketIO.listen(socket)
let port = 8888;



app.use(bodyParser.json({ limit: '5mb' })); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true, limit: '5mb' })); // support encoded bodies
process.env.PWD = process.cwd()

app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', '*');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

app.use("/in", data)

server.listen(port, () => {
  console.log('Start server at port http://192.168.137.1:' + port);

});
app.use(express.static(process.env.PWD + '/upload'));



// io.origins('*:*');
// รอการ connect จาก client
// io.listen(9000, (err)=>{
//   console.log("IO start at port : ",port)
// })
var io = socketIO.io(server)
app.use(function (req,res,next){
  res.io = io ;
  next();
})


//server.use(_config.image_public_path, express.static(__dirname + '/upload'));
