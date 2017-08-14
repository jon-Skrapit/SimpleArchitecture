const connection = require('../services/mysql')
const moment = require('moment')
const jwt = require('jwt-simple')
const config = require('../config')
const jwtTokenSecret = config.jwtTokenSecret
const logger = require('../util/logs');

const update = function(token,data){
    return new Promise((resolve, reject)=>{
        let sqlCommand = 'select * from `users` where `token`=?'
        connection.query(sqlCommand,[token],(err,result)=>{
            if(err){
                resolve({status:500, success:false, message:"something wrong"})
                logger.error("something wrong",err)
            }else{
                let user = result[0]
                if(user){
                    if(token && data && data.one>=0 && data.two>=0 && data.three>=0 && data.four>=0){
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
}