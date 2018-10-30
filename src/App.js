import React, { Component } from 'react';
import logo from './logo.svg';
import Navbar from './Navbar'
import Mockup from './Mockup'
import RegisteredActivities from './RegisteredActivities'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App w-100 h-100">
        <Navbar/>
        <div className="container">
          <RegisteredActivities/>
        </div>
        
      </div>
    );
  }
}

export default App;
