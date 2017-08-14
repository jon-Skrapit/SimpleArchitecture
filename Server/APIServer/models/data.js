const connection = require('../services/mysql')
const moment = require('moment')
const jwt = require('jwt-simple')
const config = require('../config')
const jwtTokenSecret = config.jwtTokenSecret
const logger = require('../util/logs');
const AWS = require('aws-sdk')
AWS.config.loadFromPath(config.sqs.credentialsPath)
var sqs = new AWS.SQS();

const update = function(token,data){
    return new Promise((resolve, reject)=>{
        let message = {
            token:token,
            data:data
        }
        let params = {
            MessageBody: JSON.stringify(message),
            QueueUrl: config.sqs.queueUrl,
            DelaySeconds: 0,
        }
        sqs.sendMessage(params, function(err, data) {
            if (err){
                logger.error("sendMessage error",err)
                resolve({status:500,success:false,message:"send message fail"})
            }
            else{
                logger.info("sendMessge",data)
                resolve({status:200,success:true,message:"send message successful"})
            }
        });
    })  
}
const inquireAllData = function(token){
    return new Promise((resolve,reject)=>{
        let sqlCommand = 'select * from `users` where `token`=?'
        connection.query(sqlCommand,[token],(err,result)=>{
            if(err){
                resolve({status:500, success:false, message:"something wrong"})
                logger.error("something wrong",err)
            }else{
                let user = result[0]
                if(user){
                    if(token){
                        try{
                            let decode = jwt.decode(token,jwtTokenSecret)
                            if(decode.expires<=Date.now()){
                                resolve({status:401, success:false, message:"token 过期"})
                                logger.info("token 过期",{status:401, success:false})
                            }else{
                                sqlCommand = 'select sum(one) as one,sum(two) as two,sum(three) as three,sum(four) as four from `datas`'
                                connection.query(sqlCommand,(err,result,fields)=>{
                                    if(err){
                                        resolve({status:500, success:false, message:"something wrong"})
                                        logger.error("something wrong",err)
                                    }else{
                                        resolve({status: 200, success:true, message:"查询成功", data:result})
                                        logger.info("查询成功",{status: 200, success:true, data:result})
                                    }
                                })
                            }
                        }catch(err){
                            resolve({status:500, success:false, message:"something wrong"})
                            logger.error("something wrong",err)
                        }
                    }else{
                        resolve({status:400,success:false, message:"请提交token"})
                        logger.info("请提交token",{status:400,success:false})
                    }
                }else{
                    resolve({status:400, success:false, message:"token错误"})
                    logger.info("token错误",{status:400, success:false})
                }
            }
        })
    })
}
module.exports={
    update,
    inquireAllData
}