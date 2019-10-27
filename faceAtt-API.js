var express = require('express');
var route = express.Router();
var data = require('./faceAtt-DATA');
var resp = require('../formatResponse');

route.post('/add', (req, res) => {
    data.add(req.body, (result) => {
        let response;
        if (result.error) {
            response = resp.error(result.error);
        } else {
            response = resp.success(result.data, 'Successed Added'); 
         
        }
        resp.sending(req, res, response);
    })
});
route.post('/check',async (req,res)=>{
    let [error,result] = await data.getDataRFID(req.body)
    let response
    if(error){
        response = resp.error(error)
    }else if(result === undefined || result.length == 0){
        console.log("Error No data")
        response = resp.error("Error No data Found")
    }else{
        response = resp.success(result[0],'Success Get User')
    }
    console.log("Response",response)
    resp.sending(req,res,response)
});
route.post('/checkstd',async (req,res)=>{
    let [error,result] = await data.getDataStudentID(req.body)
    let response
    if(error){
        response = resp.error(error)
    }else if(result === undefined || result.length == 0){
        console.log("Error No data")
        response = resp.error("Error No data Found")
    }else{
        response = resp.success(result[0],'Success Get User')
    }
    console.log("Response",response)
    resp.sending(req,res,response)
});
route.get('/getall', async (req,res)=>{
    let [error,result] = await data.getAll()
    let response
    if(error){
        response = resp.error(error)
    }else{
        response = resp.success(result,"Success Get All Data")
    }
    resp.sending(req,res,response)
})


module.exports = route;