const express = require('express');
const User = require('../models/user');
const config = require('../config');
const router = express.Router();
const logger = require('../util/logs');
const expire_time = 3600
const UserModel = require('../models/user')
// 登陆
/**
 * 
curl -X POST -H "Content-Type: application/json"      -d '{"username":"jon","password":"123"}'      "localhost:3000/users/login"
 */
router.post('/login', function (req, res) {
    username = req.body.username
    password = req.body.password
    console.log(username,password)
    UserModel.login(username,password).then((result)=>{
        res.json(result)
    })
});
/**
 * 
curl -X POST -H "Content-Type: application/json"      -d '{"username":"jon","password":"123"}'      "localhost:3000/users/register"
 */
router.post('/register',function (req,res){
    username = req.body.username
    password = req.body.password
    console.log(username,password)
    UserModel.register(username,password).then((result)=>{
        res.json(result)
    })
})
/**
 * 
curl -X POST -H "Content-Type: application/json"      -d '{"token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImpvbiIsImV4cGlyZXMiOjE1MDMwNDYyNzg4NTl9.HHh9ZhBni_O70DDX4JhbTf2vpX8u7RnQIdB0kNFQVhQ"}'      "localhost:3000/users/name"
 */
router.get('/name',function (req,res){
    token = req.query.token
    UserModel.getName(token).then((result)=>{
        res.json(result)
    })
})
module.exports = router;