const request = require('request')
const API = require('../Services/API')
let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImpvbiIsImV4cGlyZXMiOjE1MDMyMTk1OTU0MjV9.R08_7v2kdIcD4-caynnGdW2yyeuAV4lPWy5yp-_euMI'
let data = {one:'ss',two:0,three:0,four:0}
var options = {
    headers: {"Connection": "close"},
    url: 'http://127.0.0.1:3000/datas/update',
    method: 'POST',
    json:true,
    body: {data:data,token:token}
}
request(options,(error,response,data)=>{
    if(error){
        console.log(err)
    }else{
        console.log(data)
    }
})