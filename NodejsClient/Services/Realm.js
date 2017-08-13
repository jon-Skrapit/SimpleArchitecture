const Realm = require('realm')
const NetworkConfig = require ('../Config/NetworkConfig')
const Schema = require('../Model')
const getRealm = (accessToken) =>{
    return new Promise((resolve,reject)=>{
        Realm.Sync.User.registerWithProvider(
        NetworkConfig.realmHost,//realm服务器的ip地址，端口
        NetworkConfig.realmCustomLogin,//realm服务器上的自定义登陆
        accessToken,
        (error, user) => { 
            if(error){
                reject(error)
            }else{
                var realm = new Realm({
                    sync: {
                        user: user,
                        url: NetworkConfig.realmSyncURl,
                    },
                    schema: [Schema.DataSchema]
                });
                resolve({realm:realm,realmUser:user})
            }
        })
    })
}
module.exports = {
    getRealm
}