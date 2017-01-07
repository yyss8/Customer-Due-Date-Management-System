const routers = require('express').Router();
const services = require('../services/User.Service');
const userSrv = new services.User_Svc();
const userApi = new services.User_Api();

routers.get('/',(req,res,next) =>{
    res.send("fuck you");
    next();
});

routers.get('/login',(req,res,next) => {
    let loginResult = new services.User_Svc();
    userSrv.user_auth(req.query.username,req.query.password,(result) =>{
        next();
        res.send(result);
    },(error) => {
        next();
        res.send(error);
    });
});

routers.post('/signup',(req,res,next) => {
    res.writeHead(200, {"Content-Type": "application/json"});
    userSrv.user_signup(req.body.username,req.body.password,req.body.email,"C",(result) =>{
        res.write(JSON.stringify(result));
        res.end();
        next();
    });
});

//get user infos
routers.get('/users/byusername',(req,res,next) =>{
    userApi.get_users_byUsername(req.query.kyWrds,(result) => { 
        res.send(result);
        next();
    });
});

routers.get('/users/byemail',(req,res,next) =>{
    userApi.get_users_byEmail(req.query.kyWrds,(result) =>   { 
        res.send(result);
        next();
    });
});

routers.get('/users/byusertype',(req,res,next) =>{
    userApi.get_users_byUserType(req.query.kyWrds,(result) => { 
        res.send(result);
        next();
    });
});

//update user infos

routers.put('/users/password',(req,res,next) =>{
    userSrv.confirm_password(req.body.username,req.body.oldPw,(r) => {
        if (r){
            userSrv.update_password(req.body.username,req.body.newPw,(result) => {
                res.send(result);
                next();
            });
        }else{
            res.send({"status":"pw","content":"In-correct Password"});
            next();
        }
    });

})

routers.put('/users/email'),(req,res,next) =>{
    userSrv.update_email(req.body.username,req.body.email),(result) => {
        res.send(result);
        next();
    }
}

module.exports = routers;