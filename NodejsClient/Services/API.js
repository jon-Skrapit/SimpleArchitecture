const apisauce =  require('apisauce')
const NetworkConfig = require('../Config/NetworkConfig')
const createAPIClient = (baseURL = NetworkConfig.baseAPIDomain) => {

    const api = apisauce.create({
        baseURL,
        headers: {
        'Cache-Control': 'no-cache',
        'Content-Type':'application/json',
        },
        timeout: 30000
    })

    if (AppConfig.enableReactotron && console.tron) {
        api.addMonitor(console.apisauce)
        // if you just wanted to track on 500's
        // api.addMonitor(response => {
        //   if (response.problem === 'SERVER_ERROR')
        //     Reactotron.apisauce(response)
        // })
    }
    const loginRequest = (data,loginType) => {

        var thirdParties = ['facebook','weibo','google','wechat'];

        let param = {}
        param[loginType] = data

        if(loginType == 'phone' || loginType == 'email'){
        return api.post('/login', param);
        }
        else if(loginType=='google'){
        let {accessToken, id} = data
        return api.post('/' + loginType + '/login', {token:accessToken, uid:id});
        }
        else if(loginType=='facebook'){
        let {accessToken, userID} = data
        return api.post('/facebook/login', {token:accessToken, uid: userID});
        }
        else if(loginType=='weibo'){
        let {accessToken, userID} = data
        return api.post('/weibo/login', {accessToken,uid: userID})
        }
        else if(loginType==='wechat'){
        let {code,state} = data
        return api.post('/wechat/login', {code, state})
        }
        else{
        console.debug('third party doesnt exist')
        return null;
        }
    }
    return {
        loginRequest
    }
}
module.exports={
    createAPIClient
}