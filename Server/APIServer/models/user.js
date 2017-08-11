const connection = require('../services/mysql')
const crypto = require('crypto');
const moment = require('moment')
const jwt = require('jwt-simple');
const config = require('../config')
const jwtTokenSecret = config.jwtTokenSecret

const login = function(username,password){
    return new Promise((resolve, reject)=>{
        let sqlCommand = 'SELECT * FROM `users` where `username`=?'
        connection.query(sqlCommand,[username],(err,result,fields)=>{
            if(err){
                console.log(err)
                resolve({message:"something wrong"})
            }else{
                console.log(result)
                user = result[0]
                if(user){
                    let hash = crypto.createHash('md5');
                    let passwd = hash.update(password).digest('hex')
                    if(passwd === user.password){
                        //在这里生成一个token，记录到数据库中，并返回
                        var expires = moment().add('days',7).valueOf()
                        var token = jwt.encode({
                            username: username,
                            expires:expires
                        },jwtTokenSecret)
                        resolve({message:'密码正确',token})
                        sqlCommand = 'update `users` set `token`=? where `username`=?'
                        connection.query(sqlCommand,[token,username],(err,result)=>{
                            console.log(err)
                        })
                    }else{
                        resolve({message:'密码错误'})
                    }
                }else{
                    resolve({message:'没有此用户'})
                }
            }
        })
    })
}
const register = function(username,password){
    return new Promise((resolve,reject)=>{
        let sqlCommand = "INSERT INTO `users` (`username`, `password`) VALUES (?,?)"
        let hash = crypto.createHash('md5')
        password = hash.update(password).digest('hex')
        connection.query(sqlCommand,[username,password],(err,result)=>{
            if(err){
                console.log(err)
                resolve({message:"注册失败"})
            }else{
                resolve({message:"注册成功"})
            }
        })
    })
}
module.exports={
    login,
    register
}