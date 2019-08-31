const AWS = require("aws-sdk");
const qURL = require("./qURL");
AWS.config.loadFromPath("./config.json");

const PARAMS = {
    QueueUrl: qURL,
    MessageBody: new Date().toString(),
    DelaySeconds: 0,
    MessageGroupId: new Date().toString().replace(/ /gi, "")
};
// SQS 객체 생성
const sqs = new AWS.SQS();
const timeout = 1000;
setInterval(() => {
    sqs.sendMessage(PARAMS)
        .promise()
        .then(() => {
            console.log("Message 전송 성공");
        })
        .catch(error => {
            console.error(error);
        });
}, timeout);
