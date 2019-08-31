import React from 'react';

import AWS from 'aws-sdk';
import {accessKeyId, secretAccessKey, region} from '../Config/config';
import qURL from '../Config/qURL';
AWS.config.update({credentials: {accessKeyId, secretAccessKey}, region});

const sqs = new AWS.SQS();

class UserCount extends React.Component {
  style = {
    width: '80%',
    background: '#ffffff',
    height: '100px',
  };
  state = {
    users: 1,
  };
  intervalFunc(time) {
    return setInterval(() => {
      const PARAMS = {
        QueueUrl: qURL,
        MessageBody: new Date().getTime().toString(),
        DelaySeconds: 0,
        MessageGroupId: new Date()
            .getTime()
            .toString()
            .replace(/ /gi, ''),
      };
      sqs
          .sendMessage(PARAMS)
          .promise()
          .then(() => {
            console.log('Message 전송 성공');
          })
          .catch((error) => {
            console.error(error);
          });
    }, time);
  }
  componentDidMount() {
    const intervalTime = 10000;
    this.interval = this.intervalFunc(intervalTime);
  }
  componentDidUpdate() {
    clearInterval(this.interval);
    this.interval = this.intervalFunc(4000 / this.state.users);
    console.log(this.state);
  }
  onInput(e) {
    this.setState({
      users: e.target.value,
    });
  }
  render() {
    console.log('user count render');
    return (
      <div
        style={{
          width: '50%',
          float: 'left',
          boxSizing: 'border-box',
        }}
      >
        <h1>{this.state.users} users / second</h1>
        <br></br>
        <input
          style={this.style}
          type="range"
          name="points"
          defaultValue="1"
          value={this.state.users}
          min="1"
          max="1000"
          step="1"
          ref="points"
          onInput={this.onInput.bind(this)}
        />
      </div>
    );
  }
}

export default UserCount;
