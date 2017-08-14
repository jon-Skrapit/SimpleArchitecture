const path = require('path')
module.exports={
    root: path.normalize(__dirname),
    env:'consumer-server',
    mysql:{
        host:'sk-jon-rds.cxhxxyyxwqzj.us-west-2.rds.amazonaws.com',
        user: "root",
        password: "root",
        database: "db"
    },
}