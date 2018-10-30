import React, { Component } from 'react';
import './App.css';
import './ActivityModal';
import ActivityModal from './ActivityModal';


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
                <div class="card text-white bg-secondary mb-3" style={{"maxWidth": "18rem"}}>
                    <div class="card-header">Add an Activity</div>
                    <div class="card-body">
                        <h5 class="card-title"></h5>
                        <p class="card-text"></p>
                        <button className="btn btn-block btn-secondary" data-toggle="modal" data-target="#addActivity"><i className="material-icons align-middle">add</i></button>
                    </div>
                </div>
            <ActivityModal modalId="addActivity" onNewActivity={this._handleNewActivity} />
            </div>
        )
    }
}