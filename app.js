const express = require("express");
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const mobile = require('./routes/mobile');
const user = require('./routes/user');
const test = require('./routes/test');
const event = require('./routes/event');
const rewrite = require('express-urlrewrite');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret:'scitnet',
  cookie:{ maxAge:60*60*1000*24 },
  resave:false,
  saveUninitialized:false
}));

app.use(express.static('static'))
app.use('/m', mobile);
app.use('/user', user);
app.use('/test', test);
app.use('/event', event);

app.get('/',(req,res,next) => {
  res.sendFile(path.resolve(__dirname, 'static', 'index.html'));
  next();
});

app.get("*",(req,res) =>{
  console.log(`${req.method} ${req.path} | From ${req.connection.remoteAddress.split(":").pop()} | At ${new Date().toLocaleTimeString()}`);
  res.sendFile(path.resolve(__dirname, 'static', 'index.html'));
});


const server = app.listen(8080, function () {

  const host = server.address().address;
  const port = server.address().port; 

  console.log("Server Started", host, port);

})