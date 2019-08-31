import React from 'react';

class ServerCount extends React.Component {
  state = {
    instances: 1,
  };

  render() {
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
