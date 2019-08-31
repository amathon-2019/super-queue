const AWS = require("aws-sdk");
const qURL = require("./qURL");
AWS.config.loadFromPath("./config.json");

// SQS 객체 생성
const sqs = new AWS.SQS();
const timeout = 500;
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
        const Entries = num => {
            return {
                Id: num.toString(),
                MessageBody: new Date().getTime().toString() + num,
                DelaySeconds: 0,
                MessageGroupId:
                    new Date()
                        .getTime()
                        .toString()
                        .replace(/ /gi, "") + num
            };
        };
        const arr = [];
        for (let i = 0; i < 10; i++) {
            arr.push(Entries(i));
        }

        const batchParam = {
            QueueUrl: qURL,
            Entries: arr
        };
        sqs.sendMessageBatch(batchParam)
            .promise()
            .then(() => console.log("전송 성공"))
            .catch(error => {
                console.error(error);
            });
        /*
        sqs.sendMessage(PARAMS)
            .promise()
            .then(() => {
                console.log("Message 전송 성공");
            })
            .catch(error => {
                console.error(error);
            });*/
    }, timeout);
};

const num = 10;
for (let i = 0; i < num; i++) {
    go();
}
