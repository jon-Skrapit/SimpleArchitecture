'use strict'
var Realm = require('realm')
//定义TaskSchema
const TaskSchema= {
  name: 'Task',
  properties: {
    text:  'string',
    completed: 'bool',
  }
};
//accessToken是app登陆之后获取得到的token
const accessToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImpvbiIsImV4cGlyZXMiOjE1MDMyMTkyNjY1ODl9.I0HpW1w9fkYv3DKpJulAMciN1y0ScDQPt_PTtR7ZTmg'
const user = Realm.Sync.User.registerWithProvider(
  'http://52.43.33.213:9080//',//realm服务器的ip地址，端口
  'custom/login',//realm服务器上的自定义登陆
  accessToken,
  (error, user) => { 
      if(error){
          console.log(error)
      }else{
          //登陆成功后，可以获取得到用户的信息，存放在user中
          console.log(user)
          //通过user可以获取得到realm
          var realm = new Realm({
            sync: {
                user: user,
                url: 'realm://52.43.33.213:9080/~/realmtasks',
            },
            schema: [TaskSchema]
        });
        //往realm中写入数据
        try {
            realm.write(()=>{
                realm.create('Task',{text:'task5',completed:true})
            })
        } catch (error) {
            console.log(error)
        }
        //从realm中查询数据
        let tasks = realm.objects('Task')
        console.log(tasks.length)
      }
  }
)