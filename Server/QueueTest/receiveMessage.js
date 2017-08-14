const AWS = require('aws-sdk')
AWS.config.loadFromPath('/Users/jon/.aws/credentials')
var sqs = new AWS.SQS();
let params = {
    QueueUrl: 'https://sqs.us-west-2.amazonaws.com/783706475927/sk-jon-queue', /* required */
    MaxNumberOfMessages: 1,//建议设置为1，如果设置比较大，会导致message无法成功删除
    VisibilityTimeout: 0,
    WaitTimeSeconds: 0
};
let delete_params = {
    Entries:[],
    QueueUrl:'https://sqs.us-west-2.amazonaws.com/783706475927/sk-jon-queue'
}
sqs.receiveMessage(params,(err,data)=>{
    if(err){
        console.log(err,err.stack)
    }else{
        let messages = data.Messages
        if(messages){
            for(let i=0;i<messages.length;i++){
            console.log(messages[i].Body)
             delete_params.Entries.push({
                Id:i.toString(),
                ReceiptHandle:messages[i].ReceiptHandle
             })   
            }
            sqs.deleteMessageBatch(delete_params,(error,delete_data)=>{
                if(error){
                    console.log(error)
                }else{
                    console.log(delete_data)
                }
            })
        }
    }
})
