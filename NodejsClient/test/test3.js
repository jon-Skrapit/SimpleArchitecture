const API = require('../Services/API')
username = 'jon'
password = '123'
API.login({username:username,password:password}).then((response)=>{
    if(response.success){
      global.token = response.data
      console.log(token)
    }else{
      console.log('注册失败')
    }
  })