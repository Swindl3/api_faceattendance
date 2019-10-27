var dateformate = require('dateformat');
var resp = {
    
     sending: function(req, res, {data, message, status, success},){
        let send = {};
        send.status = status;
        send.success = success;
        send.message = message;
        send.header = {};
        send.header.api = req.originalUrl;
        send.header.path = req.originalUrl;
        send.header.parameter = req.body;
        send.header.timestamp = dateformate(Date.now(), 'yyyy-mm-dd hh:MM:ss');
        if(data != undefined){
         send.header.token = data.token;
        }
        send.header.token = '';
        send.body = data;
        //console.log("Response :: ", send);
        res.end(JSON.stringify(send));
     },
     success: (data, message)=>{
        return {
            data: data, 
            message: message, 
            status: 'success',
            success: true
        }
     },
     error: (error)=>{
        return {
            message: 'Error => '  + error, 
            status: 'fail',
            success: false
        }
     }
}

module.exports = resp;