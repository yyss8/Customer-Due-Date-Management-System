const routers = require('express').Router();


routers.get('/',function(req,res){
    res.sendFile(__dirname + "/test.html")
});

module.exports = routers;