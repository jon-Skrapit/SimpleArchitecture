const connection = require('../services/mysql')
const moment = require('moment')
const jwt = require('jwt-simple')
const config = require('../config')
const jwtTokenSecret = config.jwtTokenSecret

const update = function(token,data){
    return new Promise((resolve, reject)=>{
        if(token && data.one && data.two && data.three && data.three){
            try{
                let decode = jwt.decode(token,jwtTokenSecret)
                if(decode.expires<=Date.now()){
                    //token过期
                    resolve({message:"token过期"})
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
                        console.log(err)
                        resolve({message:"something wrong"})
                    }else{
                        resolve(result)
                        }
                    })
                }
            }catch(err){
                console.log(err)
                resolve({message:"something wrong"})
            }
        }else{
            resolve({message:"格式错误"})
        }
    })  
}
const inquireAllData = function(token){
    return new Promise((resolve,reject)=>{
        if(token){
            try{
                let decode = jwt.decode(token,jwtTokenSecret)
                if(decode.expires<=Date.now()){
                    resolve({message:"token 过期"})
                }else{
                    sqlCommand = 'select sum(one) as one,sum(two) as two,sum(three) as three,sum(four) as four from `datas`'
                    connection.query(sqlCommand,(err,result,fields)=>{
                        if(err){
                            console.log(err)
                            resolve({message:"something wrong"})
                        }else{
                            resolve(result)
                        }
                    })
                }
            }catch(err){
                console.log(err)
                resolve({message:"something wrong"})
            }
        }else{
            resolve({message:"请提交token"})
        }
    })
}
module.exports={
    update,
    inquireAllData
}