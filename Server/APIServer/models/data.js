const connection = require('../services/mysql')
const moment = require('moment')
const jwt = require('jwt-simple')
const config = require('../config')
const jwtTokenSecret = config.jwtTokenSecret
const logger = require('../util/logs');

const update = function(token,data){
    return new Promise((resolve, reject)=>{
        if(token && data.one && data.two && data.three && data.three){
            try{
                let decode = jwt.decode(token,jwtTokenSecret)
                if(decode.expires<=Date.now()){
                    //token过期
                    resolve({status:401, success:false, message:"token过期"})
                    logger.info("token过期",{status:401, success:false})
                }else{
                    sqlCommand = 'INSERT INTO `datas` (`username`,`one`,`two`,`three`,`four`) \
                    VALUES (?,?,?,?,?) \
                    ON DUPLICATE KEY UPDATE \
                    one = VALUES(one), \
                    two = VALUES(two), \
                    three = VALUES(three), \
                    four = VALUES(four)'
                    connection.query(sqlCommand,[decode.username,data.one,data.two,data.three,data.four],(err,result)=>{
                        if(err){
                            resolve({status:500, success:false, message:"something wrong"})
                            logger.error("something wrong",err)
                        }else{
                            resolve({status: 200, success:true, message:"更新成功", data:result})
                            logger.info("更新成功",{status: 200, success:true, data:result})
                        }
                    })
                }
            }catch(err){
                resolve({status:500, success:false, message:"something wrong"})
                logger.error("something wrong",err)
            }
        }else{
            resolve({status:400,success:false, message:"格式错误"})
            logger.info("格式错误",{status:400,success:false})
        }
    })  
}
const inquireAllData = function(token){
    return new Promise((resolve,reject)=>{
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
    })
}
module.exports={
    update,
    inquireAllData
}