# SimpleArchitecture
Realm、API、consumer分别搭建在ec2上，database为rds，queue为sqs

前端要完成的功能：
客户端有四个按钮，分别为1 2 3 4，有8个数字显示，分别为自己按的4个按钮的次数，所有人按的4个按钮的次数总和
![架构图](https://github.com/jon-Skrapit/SimpleArchitecture/blob/master/img/1.png)
## Server
### APIServer
* Usage
1. 需要先搭建好`Nodejs`环境
2. 在`APIServer/`中执行`npm install`
3. 使用`npm install -g forever`安装`forever`，让`apiserver`程序可以在后台运行
4. 在`config/index.js`中设置好`mysql`和`sqs`等参数
5. 在`APIServer/`中执行`forever start index.js`运行程序
#### 1.login
* URL:

`54.68.36.38:3000/users/login`
* Method:

`POST`
* Data Params:

`username=[string] password=[string]`
* Sample Call:
```
curl -X POST -H "Content-Type: application/json"      -d '{"username":"jon","password":"123"}'      "54.68.36.38:3000/users/login"
```
* Success Response:
```
{
  status:200,
  success:true, 
  message:'密码正确',
  data:token
}
```
* Error Response:
```
{
  status:404, 
  success:false, 
  message:'没有此用户'
}
```
#### 2.register
* URL:

`54.68.36.38:3000/users/register`
* Method:

`POST`
* Data Params:

`username=[string] password=[string]`
* Sample Call:
```
curl -X POST -H "Content-Type: application/json"      -d '{"username":"jon","password":"123"}'      "54.68.36.38:3000/users/register"
```
* Success Response:
```
{
  status:200, 
  success:true, 
  message:"注册成功",
  data:token
}
```
* Error Response:
```
{
  status:500, 
  success:false, 
  message:"该用户已存在"
}
```
#### 3.name
* URL:

`54.68.36.38:3000/users/name`
* Method:

`GET`
* Data Params:

`token=[string]`
* Sample Call:
```
curl 54.68.36.38:3000/users/name?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImpvbiIsImV4cGlyZXMiOjE1MDMyMTM2NTk2NjN9.gNXMMFSBjkCGEr-_-kVBgMerYhTvA2TmrvwOKP0AX9k
```
* Success Response:
```
{
  status:200, 
  success:true, 
  message:"token 正确",
  data:username
}
```
* Error Response:
```
{
  status:500, 
  success:false, 
  message:"something wrong"
}
```
#### 4.update
* URL:

`54.68.36.38:3000/datas/update`
* Method:

`POST`
* Data Params:

`token=[string] data=[object]`
* Sample Call:
```
curl -X POST -H "Content-Type: application/json"      -d '{"token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImpvbiIsImV4cGlyZXMiOjE1MDMwMzAzMzQ1NjJ9.oPUeDgM07YKCeeFZoTEdQ0GY0U-rZ9X_wJThUHo6Dh4","data":{"one":1,"two":1,"three":1,"four":1}}'      "54.68.36.38:3000/datas/update"
```
* Success Response:
```
{
  status:200,
  success:true,
  message:"send message successful"
}
```
* Error Response:
```
{
  status:500,
  success:false,
  message:"send message fail"
}
```
#### 5.allData
* URL:

`54.68.36.38:3000/datas/allData`
* Method:

`POST`
* Data Params:

`token=[string]`
* Sample Call:
```
curl -X POST -H "Content-Type: application/json"      -d '{"token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImpvbiIsImV4cGlyZXMiOjE1MDMwMzAzMzQ1NjJ9.oPUeDgM07YKCeeFZoTEdQ0GY0U-rZ9X_wJThUHo6Dh4"}'      "54.68.36.38:3000/datas/allData"
```
* Success Response:
```
{
  status: 200, 
  success:true, 
  message:"查询成功", 
  data:result
}
```
* Error Response:
```
{
  status:400, 
  success:false, 
  message:"token错误"
}
```
### RealmServer
在服务器上面部署`realm object server`的时候使用自定义登陆，`custom_login`就是自定义需要验证模块，在`/etc/realm/configuration.yml`中设置`realm`的自定义登陆
自定义登陆`custom_login`会根据用户登陆之后获得的`token`去访问`api server`,来验证用户身份
### Consumer
使用`sqs-consumer`从`sqs`中接收`message`，并将`message`中`update`的内容写入到`database`中
* Usage
1. 需要先搭建好`Nodejs`环境
2. 在`Consumer/`中执行`npm install`
3. 使用`npm install -g forever`安装`forever`，让`consumer`程序可以在后台运行
4. 在`config.js`中设置好`mysql`和`sqs`等参数
5. 在`Consumer/`中执行`forever start index.js`运行程序
### QueueTest
为了测试队列使用,写了如何从`sqs`中接收`message`, 如何向`sqs`发送`message`
## Client
前端要实现的功能：
客户端有四个按钮，分别为1 2 3 4，有8个数字显示，分别为自己按的4个按钮的次数，所有人按的4个按钮的次数总和
### NodejsClient
使用nodejs完成的一个简单的前端，只有终端字符界面，用来完成👆指定的功能
* Usage:
1. 需要先搭建好`Nodejs`环境
2. 在`NodejsClient/`中执行`npm install`
5. 在`NodejsClient/`中执行`node index.js`运行程序
