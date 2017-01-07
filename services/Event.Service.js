const mongodb = require("mongodb")
const assert = require("assert")

const url = "mongodb://scitnet.com:5333/vue"; //database url
const dbName = 'user' //database table name
const errorCodes = {
    '11000':"Username Or E-mail Already Existed"
}

class EventService{
    
    get_event_all(kyWrds,callback){
        var _str = new RegExp("^" + kyWrds,"i");
        mongodb.connect(url, (err, db) => {
        assert.equal(null, err);
        var collection = db.collection(dbName);
        collection.find({"A_Username":_str},{"A_Username":1,"A_Events":1}).toArray((err,doc)=>{
            let events = [];
            doc.forEach(function (r){
                if (r.A_Events.length != 0){
                    r.A_Events.forEach(function(result){
                        let event = {username:r.A_Username};
                        event["date"] = result.date;
                        event["name"] = result.name;
                        event["note"] = result.note;
                        event["status"] = result.status;
                        events.push(event);
                    });
                }
            })
            let rs = {status:"ok",result:events,content:"Event Found"};
            callback(rs);
        },(err)=>{
            callback({status:"err",content:"Error Happened"});
        });
        db.close();
        });
    }

    add_event(username,event,callback){
        let A_Events = event;
        mongodb.connect(url, (err, db) => {
        assert.equal(null, err);
        var collection = db.collection("user");
        collection.update({"A_Username":username},{$push:{A_Events}}).then((err,doc)=>{
            callback({status:"ok",content:"Event Added"});
        },(err)=>{
            callback({status:"err",content:"Error Happened"});
        });
        db.close();
        });     
    }

    del_event(username,eventid,callback){
        mongodb.connect(url, (err, db) => {
        assert.equal(null, err);
        var collection = db.collection("user");
        collection.update({"A_Username":username},{$pull:{A_Events:{id:eventid}}}).then((err,doc)=>{
            callback({status:"ok",content:"Event Removed"});
        },(err)=>{
            callback({status:"err",content:"Error Happened"});
        });
        db.close();
        });          
    }
}

module.exports = {"Event_Api":EventService};