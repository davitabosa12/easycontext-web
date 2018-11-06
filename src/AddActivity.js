import React, { Component } from 'react';
import './App.css';
import './AddActivityModal';
import ActivityModal from './AddActivityModal';


export default class AddActivity extends Component {
    constructor(props){
        super(props);
        this._handleNewActivity = this._handleNewActivity.bind(this);
    }
    _handleNewActivity(activity){
        let resp = {
            class: activity.class.value,
            packet: activity.packet.value
        }
        console.log(`From AddActivity: ${activity.packet.value}.${activity.class.value}`);
        this.props.onNewActivity(resp);
    }
    render(){
        return(
            <div className="col-sm-4">
                <div className="card text-white bg-secondary mb-3" style={{"maxWidth": "18rem"}}>
                    <div className="card-header">Add an Activity</div>
                    <div className="card-body">
                        <h5 className="card-title"></h5>
                        <p className="card-text"></p>
                        <button className="btn btn-block btn-secondary" data-toggle="modal" data-target="#addActivity"><i className="material-icons align-middle">add</i></button>
                    </div>
                </div>
            <ActivityModal modalId="addActivity" onNewActivity={this._handleNewActivity} />
            </div>
        )
    }
}