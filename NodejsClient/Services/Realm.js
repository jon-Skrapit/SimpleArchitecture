const Realm = require('realm')
const NetworkConfig = require ('../Config/NetworkConfig')
const Schema = require('../Model')
var getRealmWithLogin = (username,password) =>{
    return new Promise(function(resolve,reject){
        Realm.Sync.User.login(NetworkConfig.realmHost, username, password,(err,user)=>{
            if(!err){
                var realm = new Realm({
                    sync:{
                        user:user,
                        url: NetworkConfig.realmSyncURl
                    },
                    schema:[Schema.DataSchema]
                })
                resolve({realm:realm,realmUser:user})
            }else{
                reject(err)
            }
        })
    })
}
var getRealmWithRegister = (username,password) => {
    return new Promise(function(resolve,reject){
        Realm.Sync.User.register(NetworkConfig.realmHost, username, password,(err,user)=>{
            if(!err){
                var realm = new Realm({
                    sync:{
                        user:user,
                        url: NetworkConfig.realmSyncURl
                    },
                    schema:[Schema.DataSchema]
                })
                resolve(realm)
            }else{
                reject(err)
            }
        })
    })
}
module.exports = {
    getRealmWithLogin,
    getRealmWithRegister
}