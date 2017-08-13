# SimpleArchitecture
## Server
### APIServer
#### 1.login
* URL

`54.68.36.38:3000/users/login`
* Sample Call:
```
curl -X POST -H "Content-Type: application/json"      -d '{"username":"jon","password":"123"}'      "54.68.36.38:3000/users/login"
```
#### 2.register
* URL

`54.68.36.38:3000/users/register`
* Sample Call:
```
curl -X POST -H "Content-Type: application/json"      -d '{"username":"jon","password":"123"}'      "54.68.36.38:3000/users/register"
```
#### 3.name
* URL

`54.68.36.38:3000/users/name`
* Sample Call:
```
curl -X POST -H "Content-Type: application/json"      -d '{"token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImpvbiIsImV4cGlyZXMiOjE1MDMwNDYyNzg4NTl9.HHh9ZhBni_O70DDX4JhbTf2vpX8u7RnQIdB0kNFQVhQ"}'      "54.68.36.38:3000/users/name"
```
#### 4.update
* URL

`54.68.36.38:3000/datas/update`
* Sample Call:
```
curl -X POST -H "Content-Type: application/json"      -d '{"token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImpvbiIsImV4cGlyZXMiOjE1MDMwMzAzMzQ1NjJ9.oPUeDgM07YKCeeFZoTEdQ0GY0U-rZ9X_wJThUHo6Dh4","data":{"one":1,"two":1,"three":1,"four":1}}'      "54.68.36.38:3000/datas/update"

```
#### 5.allData
* URL

`54.68.36.38:3000/datas/allData`
* Sample Call:
```
curl -X POST -H "Content-Type: application/json"      -d '{"token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImpvbiIsImV4cGlyZXMiOjE1MDMwMzAzMzQ1NjJ9.oPUeDgM07YKCeeFZoTEdQ0GY0U-rZ9X_wJThUHo6Dh4"}'      "54.68.36.38:3000/datas/allData"
```
### RealmServer
## Client
### NodejsClient
