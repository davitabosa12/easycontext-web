import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router';
import createBrowserHistory from "history/createBrowserHistory";
import logo from './logo.svg';
import Navbar from './Navbar'
import Mockup from './Mockup'
import RegisteredActivities from './RegisteredActivities'
import './App.css';
import Root from './Root';
import ActivityEdit from './ActivityEdit';
import Activity from './Activity';

const history = createBrowserHistory();
class App extends Component {
  render() {
    return (
      <Root>
        <Router history={history}>
          <Switch>
            <Route path={"/"} component={RegisteredActivities} />
            <Route path={"/teste"} component={Activity} />
          </Switch>

        </Router>
      </Root>
    );
  }
}

export default App;
