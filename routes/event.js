const routers = require('express').Router();
const services = require('../services/Event.Service');
const eventSrv = new services.Event_Api();

routers.get('/',function(req,res,next){
    res.send("nothing here");
    next();
});

routers.get('/all',(req,res,next) =>{
    eventSrv.get_event_all(req.query.kyWrds,(result) => { 
        res.send(result);
        next();
    });
});

routers.post('/add/:username',(req,res,next) =>{
    res.writeHead(200, {"Content-Type": "application/json"});
    if (req.session.auth){   
        eventSrv.add_event(req.params.username,req.body,(result) =>{
            res.write(JSON.stringify(result));
            res.end();
            next();
        });
    }    
});

routers.delete('/del/:username/:evenid',(req,res,next) =>{
    res.writeHead(200, {"Content-Type": "application/json"});
    if (req.session.auth){
        eventSrv.del_event(req.params.username,req.params.eventid,(result) =>{
            res.write(JSON.stringify(result));
            res.end();
            next();
        })
    }
});

module.exports = routers;