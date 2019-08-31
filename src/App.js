import React from 'react';
import './App.css';

import QueueCount from './Components/QueueCount';
import UserCount from './Components/UserCount';
import ServerCount from './Components/ServerCount';

function App() {
  return (
    <div className="App">
      <QueueCount></QueueCount>
      <UserCount></UserCount>
      <ServerCount></ServerCount>
    </div>
  );
}

export default App;
