import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createBrowserHistory from "history/createBrowserHistory";

import RegisteredActivities from './RegisteredActivities'
import './App.css';
import Root from './Root';
import ActivityView from './ActivityView';
import {selectText} from './Utils'

const history = createBrowserHistory();
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activities: new Array()
    }
    this._onActivityAdded = this._onActivityAdded.bind(this);
    this._onActivityEdited = this._onActivityEdited.bind(this);
    this._onActivityRemoved = this._onActivityRemoved.bind(this);
    this._onActivitySelected = this._onActivitySelected.bind(this);
    this._handleExport = this._handleExport.bind(this);
  }

  _onActivitySelected(activity) {
    this.setState({
      currentActivity: activity
    }, () => {
      console.log("Selected activity: " + activity.name);
    })
  }
  _onActivityAdded(activity) {
    this.setState({
      activities: [...this.state.activities, activity]
    }, () => {
      console.log(this.state);
    });

  }
  _onActivityRemoved(activity) {
    console.log("removing activity " + activity);
    const indexToRemove = this.state.activities.findIndex((value, index, array) => {
      return value.activityName === activity.activityName;
    });
    if (indexToRemove < 0) {
      throw new Error("Tried to remove a not existing activity!");
    }
    this.setState({
      activities: this.state.activities.splice(indexToRemove, 1)
    })
  }
  _onActivityEdited(activity) {
    var activityDebug = activity;

    var findEqualName = function (value) {

      return value.name === activity.name && value.packet === activity.packet;
    }


    console.log("From app: OnActivityEdited: " + activity);
    var list = this.state.activities;
    const indexToEdit = this.state.activities.findIndex(findEqualName);
    if (indexToEdit < 0) {
      list.splice(list.length - 1, 0, activity);
    } else {
      list.splice(indexToEdit, 1, activity);
    }
    this.setState({
      activities: list,
    }, () => {
      console.log("Activity edited! " + activity);
    })



  }
  _handleExport() {
    var exp = {
      activities: this.state.activities,
    };
    console.log(JSON.stringify(exp));
    document.getElementById("btn_modal").click();
  }

  
  selectAndCopy() {
    var elem = document.getElementById("output");
    
      const el = document.createElement('textarea');
      el.value = elem.innerHTML;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    
    
    document.execCommand("copy");
    alert("Copied");
  }

  result() {
    var exp = {
      activities: this.state.activities,
    };
    return (
      <div id="selectTarget">
        <pre style={{ textAlign: "left" }} id="output" onClick={this.selectAndCopy}>
          {JSON.stringify(exp, null, 2)}
        </pre>
      </div>

    )
  }

  render() {
    console.log(this.state.activities);
    return (
      <Root onExport={this._handleExport}>
        <Router history={history}>
          <Switch>
            <Route
              exact path={"/"}
              render={props => <RegisteredActivities {...props}
                activities={this.state.activities}
                onActivityAdded={this._onActivityAdded}
                onActivityEdited={this._onActivityEdited}
                onActivityRemoved={this._onActivityRemoved}
                onActivitySelected={this._onActivitySelected} />}
            />
            <Route path={"/editFence"}
              render={props => <ActivityView {...props}
                currentActivity={this.state.currentActivity}
                onActivityEdited={this._onActivityEdited} />}
            />
          </Switch>

        </Router>
        <button type="button" style={{ display: "none" }} id="btn_modal" class="btn btn-primary" data-toggle="modal" data-target="#resultado">Large modal</button>

        <div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" id="resultado" aria-labelledby="myLargeModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              {this.result()}
            </div>
          </div>
        </div>

        <input type="textarea" style={{display: "none"}} id="hidden_textarea" />
      </Root>
    );
  }
}


export default App;
