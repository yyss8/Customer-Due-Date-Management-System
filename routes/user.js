const services = require('../services/User.Service');
const routers = require('express').Router();
const userSrv = new services.User_Svc();
const userApi = new services.User_Api();

routers.get('/loginStatus',(req,res,next) =>{
    if (req.session.auth){
        res.send({'status':'ok',user:req.session.user});
        next();
    }else{
        res.send({'status':'none'});
        next();
    }
});

routers.get('/login',(req,res,next) => {
    userSrv.user_auth(req.query.username,req.query.password,(result) =>{
        if (result.status == "ok"){
            req.session.regenerate(() => {
                req.session.auth = true;
                req.session.user = req.query.username;
                result['user'] = req.session.user;
                res.send(result);
             });
        }else{
            res.send(result);
            next();
        }
    });
});

routers.post('/signup',(req,res,next) => {
    res.writeHead(200, {"Content-Type": "application/json"});
    let signUpResult = new services.Signup();
    userSrv.user_signup(req.body.username,req.body.password,req.body.email,"C",(result) =>{
        res.write(JSON.stringify(result));
        if (result.status == "ok"){
            req.session.regenerate(() => {
                req.session.auth = true;
                req.session.user = req.query.username;
                result['user'] = req.session.user;      
                res.end();
            });
        }else{
            res.end();
            next();
        }
    });
});

routers.post('/:username',(req,res,next) => {
    res.writeHead(201, {"Content-Type": "application/json"});
    if (req.session.auth){   
        userSrv.user_create(req.body,(result) => {
            res.write(JSON.stringify(result));
            res.end();
            next();
        });
    }
});

routers.put('/:username',(req,res,next) =>{
    res.writeHead(200, {"Content-Type": "application/json"});
    if (req.session.auth){   
        userSrv.update_all(req.body,(result) => {
            res.write(JSON.stringify(result));
            res.end();
            next();
        });
    }
});

routers.get('/logout',(req,res,next) => {
    req.session.destroy(() => {
        res.redirect('../');
        next();
    });
});



module.exports = routers;