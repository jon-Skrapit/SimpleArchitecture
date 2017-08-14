var path = require('path');
var config = {
    root: path.normalize(__dirname),
    env: 'server',
    mysql:{
        host:'sk-jon-rds.cxhxxyyxwqzj.us-west-2.rds.amazonaws.com',
        user: "root",
        password: "root",
        database: "db"
    },
    express:{
        port: process.env.PORT || 3000
    },
    jwtTokenSecret:'e5PRN3Is>x20',
    sqs:{
        queueUrl: 'https://sqs.us-west-2.amazonaws.com/783706475927/sk-jon-queue',
        credentialsPath: '/Users/jon/.aws/credentials'
    }
}
module.exports = config