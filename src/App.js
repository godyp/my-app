import React, { Component } from 'react';
import './App.css';
import Top from './Top';
import Panel from './Panel';

class App extends Component {
  render() {
    return(
      <div>
        <Top />
        <Panel />
      </div>
    )
  }
}

export default App;