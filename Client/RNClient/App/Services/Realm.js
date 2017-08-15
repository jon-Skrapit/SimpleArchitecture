import Realm from 'realm'
import NetworkConfig from '../Config/NetworkConfig'
import Schema from '../Model'
export default {
    getRealm: function(accessToken){
        return new Promise((resolve,reject)=>{
            Realm.Sync.User.registerWithProvider(
                NetworkConfig.realm.host,
                NetworkConfig.realm.customLogin,
                accessToken,
                (error,user)=>{
                    if(error){
                        reject(error)
                    }else{
                        let realm = new Realm({
                            sync:{
                                user:user,
                                url:NetworkConfig.realm.syncURl
                            },
                            schema:[Schema.DataSchema]
                        })
                        resolve({realm:realm,realmUser:user})
                    }
                }
            )
        })
    }
}