const Consumer = require('sqs-consumer')
const AWS = require('aws-sdk')
const logger = require('./util/logs')
const Model = require('./models')
const config = require('./config')
AWS.config.loadFromPath('/Users/jon/.aws/credentials')
const app = Consumer.create({
    queueUrl:config.sqs.queueUrl,
    handleMessage:(message,done)=>{
        logger.info(message.Body)
        try {
            let data = JSON.parse(message.Body)
            Model.update(data.token,data.data).then((response)=>{
                logger.info(response)
            }).catch((err)=>{
                logger.error(err)
            })
        } catch (error) {
            logger.error(err)
        }
        done()
    },
    sqs:new AWS.SQS()
})
app.on('error',(err)=>{
    logger.error(err.message)
})
app.start()