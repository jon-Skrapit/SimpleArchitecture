const Realm =  require('./Services/Realm')
const Readline = require('readline')
const sleep = require('sleep')
const ReadlineSync = require('readline-sync')
const API = require('./Services/API')
//----------使用realm
let questions=['name:','password:']
let type = ReadlineSync.question('login or register?(input 1 or 2):',{hideEchoBack: false,limit: ['1','2']})
if(type === '1'){
  type = 'login'
}else{
  type = 'register'
}
let answer = []
let username = ReadlineSync.question('username:',{hideEchoBack:false})
let password = ReadlineSync.question('password:', {hideEchoBack:false})
if(type==='register'){
  //注册
  API.register({username:username,password:password}).then((response)=>{
    if(response.success){
      global.token = response.data
      Realm.getRealm(token).then((resutl)=>{
        global.realm = resutl.realm
        global.realmUser = resutl.realmUser
      }).catch((err)=>{

      })
    }else{

    }
  })
}else{
  //登陆
  API.login({username:username,password:password}).then((response)=>{
    if(response.success){
      global.token = response.data
      console.log(global.token)
      Realm.getRealm(token).then((resutl)=>{
        global.realm = resutl.realm
        global.realmUser = resutl.realmUser
      }).catch((err)=>{
        console.log(err)
      })
    }else{
      console.log('登陆失败')
    }
  })
}
//-----------使用readline
var completer = function(line){
  var completions = ['close','showAll','showMime'];

  var shots = completions.filter(function(s){
    return s.indexOf(line) == 0;
  });
  return [shots, line];
}
var readline = Readline.createInterface({
  input:process.stdin,
  output:process.stdout,
  completer: completer})
readline.setPrompt('client>')
readline.prompt();
readline.on('line',function(line){
  switch(line.trim()){
    case '1':
      addOne('1')
      break;
    case '2':
      addOne('2')
      break;
    case '3':
      addOne('3')
      break;
    case '4':
      addOne('4')
      break;
    case 'showMime':
      showMime()
      break;
    case 'showAll':
      console.log('showAll')
      break;
    case 'close':
      readline.close()
      break;
  }
  readline.prompt();
})
readline.on('close',function(){
  if(global.realmUser){
    global.realmUser.logout()
  }
  console.log('bye bye')
  process.exit(0)
})
function addOne(index){
  let realm = global.realm
  if(!!realm){
    let datas = realm.objects('Data').slice(0, 1)
    let data = datas[0]
    if(data){
      realm.write(()=>{
        if(index==='1'){
          data.one = data.one+1
        }else if(index==='2'){
          data.two = data.two+1
        }else if(index==='3'){
          data.three = data.three+1
        }else if(index==='4'){
          data.four = data.four+1
        }
      })
    }else{
      realm.write(()=>{
        if(index==='1'){
          realm.create('Data', {id:1, one: 1});
        }else if(index==='2'){
          realm.create('Data', {id:1, two: 1});
        }else if(index==='3'){
          realm.create('Data', {id:1, three: 1});
        }else if(index==='4'){
          realm.create('Data', {id:1, four: 1});
        }
      })
    }
  }else{
    console.log('无法连接到realm服务器')
    readline.close()
  }
}
function showMime(){
  let realm = global.realm
  let datas = realm.objects('Data').slice(0, 1)
  let data = datas[0]
  console.log('mime:',{
    one:data.one,
    two:data.two,
    three:data.three,
    four:data.four
  })
}