const { Consumer } = require("sqs-consumer");
const AWS = require("aws-sdk");
AWS.config.loadFromPath("./config.json");
const qURL = require("./qURL.js");
const app = Consumer.create({
    queueUrl: qURL,
    handleMessage: async message => {
        // ...
        console.log(message);
    },
    sqs: new AWS.SQS()
});

app.on("error", err => {
    console.error(err.message);
});

app.on("processing_error", err => {
    console.error(err.message);
});

app.on("timeout_error", err => {
    console.error(err.message);
});

app.start();
