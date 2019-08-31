const AWS = require("aws-sdk");
const qURL = require("./qURL");
AWS.config.loadFromPath("./config.json");

// SQS 객체 생성
const sqs = new AWS.SQS();
const PARAMS = {
    QueueUrl: qURL,
    MessageBody: new Date().toString(),
    DelaySeconds: 0,
    MessageGroupId: new Date().toString().replace(/ /gi, "")
};

// sqs.sendMessage(PARAMS)
//     .promise()
//     .then(() => {
//         console.log("Message 전송 성공");
//     })
//     .catch(error => {
//         console.error(error);
//     });

const timeout = 1000;

const infinit = () => {
    sqs.sendMessage(PARAMS)
        .promise()
        .then(() => {
            console.log("Message 전송 성공");
            setTimeout(() => {
                infinit();
            }, timeout);
        })
        .catch(error => {
            console.error(error);
        });
};

infinit();
