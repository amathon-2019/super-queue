import React from 'react';

import AWS from 'aws-sdk';
import {accessKeyId, secretAccessKey, region} from '../Config/config';
AWS.config.update({credentials: {accessKeyId, secretAccessKey}, region});
const ecs = new AWS.ECS();
class ServerCount extends React.Component {
  state = {
    instances: 1,
  };

  componentDidMount() {
    const params = {
      cluster: 'superqueue',
    };
    const interval = 10000;
    setInterval(() => {
      ecs.listTasks(params, (err, data) => {
        this.setState({instances: data.taskArns.length});
      });
    }, interval);
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.instances === this.state.instances) return false;
    else return true;
  }
  render() {
    console.log('Server Count Render');
    return (
      <div
        style={{
          width: '50%',
          float: 'right',
          boxSizing: 'border-box',
        }}
      >
        <h1>Server {this.state.instances} instances</h1>
        <br></br>
      </div>
    );
  }
}

export default ServerCount;
