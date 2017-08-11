const Realm =  require('./Services/Realm')
const Readline = require('readline')
const sleep = require('sleep')
const ReadlineSync = require('readline-sync')
//----------使用realm
var questions=['name:','password:']
var type = ReadlineSync.question('login or register?(input 1 or 2):',{hideEchoBack: false,limit: ['1','2']})
if(type === '1'){
  type = 'login'
}else{
  type = 'register'
}
let answer = []
var username = ReadlineSync.question('username:',{hideEchoBack:false})
var password = ReadlineSync.question('password:', {hideEchoBack:false})
if(type==='register'){
  Realm.getRealmWithRegister('jon','password').then((object)=>{
    global.realm = object.realm
    global.realmUser = object.realmUser
  }).catch((err)=>{
    console.log(err)
  })
}else{
  Realm.getRealmWithLogin('jon','password').then((object)=>{
    global.realm = object.realm
    global.realmUser = object.realmUser
  }).catch((err)=>{
    console.log(err)
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
  global.realmUser.logout()
  console.log('bye bye')
  process.exit(0)
})
function addOne(index){
  let realm = global.realm
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