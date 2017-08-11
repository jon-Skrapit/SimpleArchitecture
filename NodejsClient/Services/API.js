const request = require('request')
const NetworkConfig = require('../Config/NetworkConfig')
const timeout = 1500
const apiUrl = NetworkConfig.baseAPIDomain
const login = (param) => {
    return new Promise((resolve, reject)=>{
        request.post({url:apiUrl+'/users/login',form:param,timeout: timeout},(err,httpResponse,body)=>{
            if(err){
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
                reject(err)
            }else{
                resolve(JSON.parse(body))
            }
        })
    })
}
const update = (param) => {
    return new Promise((resolve,reject)=>{
        request.post({url:apiUrl+'/datas/update',form:param,timeout: timeout},(err,httpResponse,body)=>{
            if(err){
                reject(err)
            }else{
                resolve(JSON.parse(body))
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