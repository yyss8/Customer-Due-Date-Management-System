const mongodb = require("mongodb")
const assert = require("assert")

const url = "mongodb://scitnet.com:5333/vue"; //database url
const dbName = 'user' //database table name
const errorCodes = {
    '11000':"Username Or E-mail Already Existed"
}

class UserService{
    user_auth(username,password,callback,error){
        mongodb.connect(url,(err,db) =>{
            assert.equal(null, err);
            let collection = db.collection(dbName); 
            collection.findOne({"A_Username":username}).then((doc) => {
                if (doc === null){
                    callback({"status":"un","content":"In-correct Username"}); 
                }else if (doc.A_Password != password){
                    callback({"status":"pw","content":"In-correct Password"});
                }else{
                    callback({"status":"ok","content":"Sucessful Login"});
                }
            },(err)=>{
                error({"status":"err","content":"Error Happened"});
            });
            db.close();
        })
    }

    user_signup(username,password,email,type,callback){
        mongodb.connect(url, (err, db) => {
            assert.equal(null, err);
            let collection = db.collection(dbName);
            collection.insertOne({"A_Username":username,"A_Password":password,"A_Email":email,"A_Type":type}).then((doc)=>{
                callback({"status":"ok","content":"Successful Sign Up"}); 
            },(err)=>{
                callback({"status":"err","content":errorCodes[err.code]});
            });
            db.close();
        });
    }

    user_create(body,callback){

        mongodb.connect(url, (err, db) => {
            assert.equal(null, err);
            let collection = db.collection(dbName);
            collection.insertOne(body).then((doc)=>{
                callback({"status":"ok","content":"User Created"}); 
            },(err)=>{
                callback({"status":"err","content":errorCodes[err.code]});
            });
            db.close();
        });        
    }

    confirm_password(username,oldPw,callback){
        mongodb.connect(url, (err, db) => {
            assert.equal(null, err);
            let collection = db.collection(dbName);
            collection.findOne({"A_Username":username}).then((doc)=>{
                if (doc.A_Password == oldPw){
                    callback(true)
                }else{
                    callback(false)
                }
            },(err)=>{
                callback(false);
            });
            db.close();
        });
    }

    update_password(username,password,callback){
        mongodb.connect(url, (err, db) => {
            assert.equal(null, err);
            let collection = db.collection(dbName);
            collection.update({"A_Username":username},{"$set":{"A_Password":password}}).then((doc)=>{
                callback({"status":"ok","content":"Password Has Been Modified"}); 
            },(err)=>{
                callback({status:"err",content:"Error Happened"});
            });
            db.close();
        });
    }

    update_email(username,email,callback){
        mongodb.connect(url, (err, db) => {
            assert.equal(null, err);
            let collection = db.collection(dbName);
            collection.update({"A_Username":username},{"$set":{"A_Email":email}}).then((doc)=>{
                callback({"status":"ok","content":"E-mail Has Been Modified"}); 
            },(err)=>{
                callback({status:"err",content:"Error Happened"});
            });
            db.close();
        });        
    }

    update_all(body,callback){
        mongodb.connect(url, (err, db) => {
            assert.equal(null, err);
            let collection = db.collection(dbName);
            collection.update({"A_Username":body.A_Username},{$set:{
                "A_Username":body.A_Username,
                "A_Email":body.A_Email,
                "A_Name":body.A_Name,
                "A_Phone":body.A_Phone,
                "A_Name":body.A_Name,
                "A_address":body.A_Address,
                "A_Events":body.A_Events
            }}).then((doc)=>{
                callback({"status":"ok","content":"User Has Been Modified"}); 
            },(err)=>{
                callback({status:"err",content:"Error Happened"});
            });
            db.close();
        });           
    }
}

class GetUsersInfoService{

    get_users_byUsername(kyWrds,callback){
        var _str = new RegExp("^" + kyWrds,"i");
        mongodb.connect(url,(err,db) => {
            assert.equal(null,err);
            let collection = db.collection(dbName);
            collection.find({"A_Username":_str}).toArray((err,doc)=>{
                let result = {'results':doc};
                callback(result); 
            },(err)=>{
                callback({status:"err",content:"Error Happened"});
            });
            db.close()
        });
    }

    get_users_byEmail(callback){
        mongodb.connect(url,(err,db) => {
            assert.equal(null,err);
            let collection = db.collection(dbName);
            collection.findOne({"A_Username":this.query}).then((doc) => {
                if (doc == null){
                    callback({"status":"un","content":"Username Is Not Found"}); 
                }else{
                    callback(doc); 
                }
            },(err)=>{
                callback({status:"err",content:"Error Happened"});
            });
            db.close()
        });
    }

    get_users_byUserType(callback){
        
    }

    get_users_byName(callback){
        
    }

    get_users_byPhone(callback){
        
    }

}

module.exports = {"User_Svc":UserService,"User_Api":GetUsersInfoService};