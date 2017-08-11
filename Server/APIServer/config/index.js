var path = require('path');
var config = {
    root: path.normalize(__dirname),
    env: 'server',
    mysql:{
        host:'localhost',
        user: "root",
        password: "root",
        database: "test"
    },
    express:{
        port: process.env.PORT || 3000
    },
    jwtTokenSecret:'e5PRN3Is>x20'
}
module.exports = config