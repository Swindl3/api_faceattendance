const mysql = require('mysql');
var util = require('util');

const connection = mysql.createConnection({
    host            : "localhost",
    user            : "root",
    password        : "00000000",
    database        : "facedetect",
    dateStrings: true
});
connection.connect((err)=>{
    if(err) throw err;
    console.log("Database Connected")
})
connection.query = util.promisify(connection.query);
module.exports = connection;



