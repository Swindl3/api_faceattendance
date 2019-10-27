var connection = require('../connectDB');
var fs = require('fs')
var uuidv4 = require('uuidv4')

let insertDataAttend = async (data) => {
    let pathimg;
    console.log("BASE64" + data.imgpath)
    let base64Image = data.imgpath.split('BASE64').pop();
    picture_name = uuidv4() + ".jpg";
    pathimg = picture_name;
    fs.writeFile("./upload/" + picture_name, base64Image, { encoding: 'base64' }, function (err) {
        console.log(err)

    });
    let sql = 'INSERT INTO attend SET ?' 
    let values = {
        "rfid_id": data.rfid_id,
        "user_id": data.user_id,
        "imgpath": pathimg
    }
    let attend = await connection.query(sql, values)
    let attendid = attend.insertId
    console.log("ID :: " + attendid);
    return attendid;
}
var data = {
    add: (data, callback) => {
        connection.beginTransaction(async (err) => {
            if (err) throw err;
            let result;
            let error;
            try {
                let effects = await insertDataAttend(data);
                result = { success: true };

                connection.commit(async (err) => {
                    if (err) {
                        connection.rollback(async () => { console.log('RB 1') });
                        error = err;
                    } else {
                        console.log('COMMIT')
                        callback({ error: error, data: result })
                    }
                })
            } catch (err) {
                error = err;
                connection.rollback(async () => { console.log('RB 2' + err) })
            }
            callback({ error: error, data: result })
        })
    },
    getDataRFID: async (data, callback) => {
        console.log("data :: ", data)
        rfidNum = data.rfid_num
        let error
        let result
        try {
            let sql = `
            SELECT *
            FROM rfid
            INNER JOIN user
            ON rfid.user_id = user.user_id
            WHERE rfid.rfid_num = ?
        `
            result = await connection.query(sql, rfidNum)
            console.log("queryResult", result)
        } catch (err) {
            error = err
        }
        return [error, result]


    },
    getDataStudentID: async (data, callback) => {
        console.log("data :: ", data)
        rfidNum = data.rfid_num
        let error
        let result
        try {
            let sql = `
            SELECT *
            FROM rfid
            INNER JOIN user
            ON rfid.user_id = user.user_id
            WHERE rfid.student_id = ?
        `
            result = await connection.query(sql, rfidNum)
            console.log("queryResult", result)
        } catch (err) {
            error = err
        }
        return [error, result]


    },
    getAll: async (callback) => {
        let error
        let result
        try {
            let sql = `SELECT * 
                FROM attend
                INNER JOIN rfid
                ON attend.user_id = rfid.user_id
                INNER JOIN user
                ON user.user_id = rfid.user_id
                ORDER BY attend.attend_id DESC
            `
            result = await connection.query(sql)

        } catch (err) {
            error = err
        }
        return [error, result]
    }

}
module.exports = data;