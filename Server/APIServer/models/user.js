const connection = require('../services/mysql')
const crypto = require('crypto');
const moment = require('moment')
const jwt = require('jwt-simple');
const config = require('../config')
const jwtTokenSecret = config.jwtTokenSecret
const logger = require('../util/logs');

const login = function(username,password){
    return new Promise((resolve, reject)=>{
        let sqlCommand = 'SELECT * FROM `users` where `username`=?'
        connection.query(sqlCommand,[username],(err,result,fields)=>{
            if(err){
                resolve({status:500, success:false, message:"something wrong"})
                logger.error("something wrong",err)
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
                        resolve({status:200,success:true, message:'密码正确',data:token})
                        logger.info('密码正确', {status:200,success:true,data:token})
                        sqlCommand = 'update `users` set `token`=? where `username`=?'
                        connection.query(sqlCommand,[token,username],(err,result)=>{
                            logger.error(err)
                        })
                    }else{
                        resolve({status:401, success:false, message:'密码错误'})
                        logger.info('密码错误',{status:401, success:false})
                    }
                }else{
                    resolve({status:404, success:false, message:'没有此用户'})
                    logger.info('没有此用户',{status:404, success:false})
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
                logger.error(err)
                sqlCommand = 'select * from `users` where `username`=?'
                connection.query(sqlCommand,[username],(err,result)=>{
                    if(err){
                        resolve({status:500, success:false, message:"注册失败"})
                        logger.error(err)
                    }else{
                        let user = result[0]
                        if(user){
                            resolve({status:500, success:false, message:"该用户已存在"})
                            logger.info("该用户已存在",{status:500, success:false})
                        }
                    }
                })
            }else{
                //在这里生成一个token，记录到数据库中，并返回
                var expires = moment().add('days',7).valueOf()
                var token = jwt.encode({
                    username: username,
                    expires:expires
                },jwtTokenSecret)
                sqlCommand = 'update `users` set `token`=? where `username`=?'
                connection.query(sqlCommand,[token,username],(err,result)=>{
                    logger.error(err)
                })
                resolve({status:200, success:true, message:"注册成功",data:token})
                logger.info('注册成功', {status:200, success:true, data:token})
            }
        })
    })
}
const getName = function(token){
    return new Promise((resolve,reject)=>{
        if(token){
            try{
                let decode = jwt.decode(token,jwtTokenSecret)
                if(decode.expires<=Date.now()){
                    resolve({status:401, success:false, message:"token 过期"})
                    logger.info("token 过期",{status:401, success:false})
                }else{
                    resolve({status:200, success:true, message:"token 正确",data:decode.username})
                    logger.info("token 正确",{status:200, success:true, data:decode.username})
                }
            }catch(err){
                resolve({status:500, success:false, message:"something wrong"})
                logger.error("something wrong",err)
            }
        }else{
            resolve({status:400,success:false, message:"请提交token"})
            logger.info("请提交token",{status:400,success:false})
        }
    })
}
module.exports={
    login,
    register,
    getName
}