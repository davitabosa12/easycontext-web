import React, { Component } from 'react';
import Activity from './Activity'
import AddActivity from './AddActivity'
import './App.css';

export default class RegisteredActivities extends Component {
    constructor(props){
        super(props);
        this.state = {
            activitiesList: [{packet:"lopl", class:"teste"}]
        };
        this._handleOnNewActivity = this._handleOnNewActivity.bind(this);

    }
    
    componentDidMount(){
       
    }
    /**
     * Adiciona a nova activity na lista dentro do props.
     */
    _handleOnNewActivity(activity){
        this.setState((state, props) => ({
            activitiesList: [...state.activitiesList, activity]
        }));
    }
    _renderActivity(activity){
        let text = "Using ";
        let fenceNumber = Math.floor(Math.random() * 10);
        let snapshotNumber = Math.floor(Math.random() * 10);
         try{
            fenceNumber = activity.fences.length || 0;
        } catch(err) {}

        try{
            snapshotNumber = activity.snapshots.length || 0;
        } catch(err) {}
        
        if(fenceNumber > 0 || snapshotNumber > 0){
            if(fenceNumber > 0){
                text = text + `${fenceNumber} Fence`;
                if(fenceNumber > 1){
                    text += 's ';
                }
            }
            if(snapshotNumber > 0){
                if(fenceNumber > 0){
                    text += "and ";
                }
                text = text + `${snapshotNumber} Snapshot`;
                if(snapshotNumber > 1){
                    text += 's ';
                }
            }
        } else {
            text = "Empty!";
        }
        
        
        return (
            <Activity key ={`${activity.packet}.${activity.class}`} id={`${activity.packet}.${activity.class}`} activityPacket={activity.packet} activityClass={activity.class} text={text}/>
        )
    }
    _renderActivitiesList(activitiesList){
        //activitiesList.forEach(element => {
        //    this._renderActivity(element);
        //});
        return activitiesList.map(this._renderActivity)
    }
    render(){
        console.log(this.state)
        
        return(
            <div className="container">
                <div className="row">
                    {this._renderActivitiesList(this.state.activitiesList)}
                    <AddActivity onNewActivity={this._handleOnNewActivity}/>
                </div>
            </div>
        )
    }
}