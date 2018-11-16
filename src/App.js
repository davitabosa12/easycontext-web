import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createBrowserHistory from "history/createBrowserHistory";

import RegisteredActivities from './RegisteredActivities'
import './App.css';
import Root from './Root';
import ActivityView from './ActivityView';

const history = createBrowserHistory();
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      activities: new Array()
    }
    this._onActivityAdded = this._onActivityAdded.bind(this);
    this._onActivityEdited = this._onActivityEdited.bind(this);
    this._onActivityRemoved = this._onActivityRemoved.bind(this);
    this._onActivitySelected = this._onActivitySelected.bind(this);
  }

  _onActivitySelected(activity){
    this.setState({
      currentActivity: activity
    }, () => {
      console.log("Selected activity: " + activity.name);
    })
  }
  _onActivityAdded(activity){
      this.setState({
        activities: [...this.state.activities, activity]
      }, () => {
        console.log(this.state);
      });
      
  }
  _onActivityRemoved(activity){
    const indexToRemove = this.state.activities.findIndex((value, index, array) =>{
      return value.activityName === activity.activityName;
    });
    if(indexToRemove < 0){
      throw new Error("Tried to remove a not existing activity!");
    }
    this.setState({
      activities: this.state.activities.splice(indexToRemove,1)
    })
  }
  _onActivityEdited(activity){
    console.log("From app: OnActivityEdited: " + activity);
    var list = this.state.activities;
    const indexToEdit = this.state.activities.findIndex((value, index, array) =>{
      return value.activityName === activity.activityName;
    });
    if(indexToEdit < 0){
      list.splice(list.length -1, 0, activity);
    } else {
      list.splice(indexToEdit, 1, activity);
    }
    this.setState({
      activities: list,
    }, () =>{
      console.log("Activity edited! " + activity);
    })

    
    
  }

  render() {
    console.log(this.state.activities);
    return (
      <Root>
        <Router history={history}>
          <Switch>
            <Route 
            exact path={"/"} 
            render={props => <RegisteredActivities {...props} 
            activities = {this.state.activities}
            onActivityAdded={this._onActivityAdded}
            onActivityEdited={this._onActivityEdited}
            onActivityRemoved={this._onActivityRemoved}
            onActivitySelected = {this._onActivitySelected}/>}
            />
            <Route path={"/editFence"}
            render={props => <ActivityView {...props} 
            currentActivity= {this.state.currentActivity}
            onActivityEdited={this._onActivityEdited} />} 
            />
          </Switch>

        </Router>
      </Root>
    );
  }
}

export default App;
