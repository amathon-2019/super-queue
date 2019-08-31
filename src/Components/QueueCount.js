import React from 'react';
import AWS from 'aws-sdk';
import {accessKeyId, secretAccessKey, region} from '../Config/config';
import qURL from '../Config/qURL';
AWS.config.update({credentials: {accessKeyId, secretAccessKey}, region});

const sqs = new AWS.SQS();
const queueParam = {
  QueueUrl: qURL,
  AttributeNames: ['ApproximateNumberOfMessages'],
};

class QueueCount extends React.Component {
  state = {
    tasks: 0,
  };
  componentDidMount() {
    const interval = 100;
    setInterval(() => {
      sqs.getQueueAttributes(queueParam, (err, result) => {
        const tasks = result.Attributes.ApproximateNumberOfMessages;
        this.setState({
          tasks,
        });
      });
    }, interval);
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.tasks === this.state.tasks) return false;
    else return true;
  }
  render() {
    console.log('queue count render');
    return (
      <div
        style={{
          height: '400px',
          border: 'solid',
          borderWidth: '0 0 5px 0',
        }}
      >
        <h1>Queue {this.state.tasks} tasks</h1>
        <br></br>
        <br></br>
        <br></br>

        <meter
          style={{width: '70%', height: '20%'}}
          value={this.state.tasks}
          min="1"
          max="10000"
        ></meter>
        <div></div>
      </div>
    );
  }
}
export default QueueCount;
