const AWS = require("aws-sdk");
const qURL = require("./qURL");
AWS.config.loadFromPath("./config.json");

// SQS 객체 생성
const sqs = new AWS.SQS();
const timeout = 1000;

const go = () => {
    setInterval(() => {
        const PARAMS = {
            QueueUrl: qURL,
            MessageBody: new Date().getTime().toString(),
            DelaySeconds: 0,
            MessageGroupId: new Date()
                .getTime()
                .toString()
                .replace(/ /gi, "")
        };
        sqs.sendMessage(PARAMS)
            .promise()
            .then(() => {
                console.log("Message 전송 성공");
            })
            .catch(error => {
                console.error(error);
            });
    }, timeout);
};

const num = 10;
for (let i = 0; i < num; i++) {
    go();
}
