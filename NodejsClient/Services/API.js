const request = require('request')
const NetworkConfig = require('../Config/NetworkConfig')
const timeout = 1500
const apiUrl = NetworkConfig.baseAPIDomain
const login = (param) => {
    return new Promise((resolve, reject)=>{
        request.post({url:apiUrl+'/users/login',form:param,timeout: timeout},(err,httpResponse,body)=>{
            if(err){
                console.log(err)
                reject(err)
            }else{
                resolve(JSON.parse(body))
            }
        })
    })
}
const register = (param) => {
    return new Promise((resolve,reject)=>{
        request.post({url:apiUrl+'/users/register',form:param,timeout: timeout},(err,httpResponse,body)=>{
            if(err){
                console.log(err)
                reject(err)
            }else{
                resolve(JSON.parse(body))
            }
        })
    })
}
const allData = (param) => {
    return new Promise((resolve,reject)=>{
        request.post({url:apiUrl+'/datas/allData',form:param,timeout: timeout},(err,httpResponse,body)=>{
            if(err){
                console.log(err)
                reject(err)
            }else{
                resolve(JSON.parse(body))
            }
        })
    })
}
const update = (param) => {
    return new Promise((resolve,reject)=>{
        let options = {
            headers: {"Connection": "close"},
            url: apiUrl+'/datas/update',
            method: 'POST',
            json: true,
            body: param
        }
        request(options,(err,httpResponse,body)=>{
            if(err){
                console.log(err)
                reject(err)
            }else{
                resolve(body)
            }
        })
    })
}
module.exports={
    login,
    register,
    allData,
    update
}