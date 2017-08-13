# SimpleArchitecture
## Server
### APIServer
#### 1.login
* URL

`54.68.36.38:3000/users/login`
* Method:

`POST`
* Sample Call:
```
curl -X POST -H "Content-Type: application/json"      -d '{"username":"jon","password":"123"}'      "54.68.36.38:3000/users/login"
```
#### 2.register
* URL

`54.68.36.38:3000/users/register`
* Method:

`POST`
* Sample Call:
```
curl -X POST -H "Content-Type: application/json"      -d '{"username":"jon","password":"123"}'      "54.68.36.38:3000/users/register"
```
#### 3.name
* URL

`54.68.36.38:3000/users/name`
* Method:

`GET`
* Sample Call:
```
curl 54.68.36.38:3000/users/name?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImpvbiIsImV4cGlyZXMiOjE1MDMyMTM2NTk2NjN9.gNXMMFSBjkCGEr-_-kVBgMerYhTvA2TmrvwOKP0AX9k
```
#### 4.update
* URL

`54.68.36.38:3000/datas/update`
* Method:

`POST`
* Sample Call:
```
curl -X POST -H "Content-Type: application/json"      -d '{"token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImpvbiIsImV4cGlyZXMiOjE1MDMwMzAzMzQ1NjJ9.oPUeDgM07YKCeeFZoTEdQ0GY0U-rZ9X_wJThUHo6Dh4","data":{"one":1,"two":1,"three":1,"four":1}}'      "54.68.36.38:3000/datas/update"

```
#### 5.allData
* URL

`54.68.36.38:3000/datas/allData`
* Method:

`POST`
* Sample Call:
```
curl -X POST -H "Content-Type: application/json"      -d '{"token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImpvbiIsImV4cGlyZXMiOjE1MDMwMzAzMzQ1NjJ9.oPUeDgM07YKCeeFZoTEdQ0GY0U-rZ9X_wJThUHo6Dh4"}'      "54.68.36.38:3000/datas/allData"
```
### RealmServer
在服务器上面部署`realm object server`的时候使用自定义登陆，`custom_login`就是自定义需要验证模块，在`/etc/realm/configuration.yml`中设置`realm`的自定义登陆
自定义登陆`custom_login`会根据用户登陆之后获得的`token`去访问`api server`,来验证用户身份
## Client
前端要实现的功能：
客户端有四个按钮，分别为1 2 3 4，有8个数字显示，分别为自己按的4个按钮的次数，所有人按的4个按钮的次数总和
### NodejsClient
使用nodejs完成的一个简单的前端，只有终端字符界面，用来完成👆指定的功能
