const AWS = require('aws-sdk')
AWS.config.loadFromPath('/Users/jon/.aws/credentials')
var sqs = new AWS.SQS();
var data={
    token:'mytoken',
    data:{
        one:1,
        two:1,
        three:1,
        four:1
    }
}
var params = {
    MessageBody: JSON.stringify(data),
    QueueUrl: 'https://sqs.us-west-2.amazonaws.com/783706475927/sk-jon-queue', /* required */
    DelaySeconds: 0,
  };
  sqs.sendMessage(params, function(err, data) {
    if (err){
        console.log(err, err.stack); // an error occurred
    }
    else{
        console.log(data)
    }
});