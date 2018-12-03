import React, { Component } from 'react';
import Activity from './Activity'
import AddActivity from './AddActivity'
import './App.css';

export default class RegisteredActivities extends Component {
    constructor(props){
        super(props);
        this.state = {
            activitiesList: props.activities
        };
        console.log(this.props);
        this._handleOnNewActivity = this._handleOnNewActivity.bind(this);
        this._renderActivity = this._renderActivity.bind(this);
        this._onActivitySelected = this.props.onActivitySelected;
        this._onActivityRemoved = this._onActivityRemoved.bind(this);

    }
    
    componentDidUpdate(prevProps, prevState){
        if(prevState.activitiesList !== this.props.activities){
            this.setState({
                activitiesList: this.props.activities
            });
        }
    }
    /**
     * Adiciona a nova activity na lista dentro do props.
     */
    _handleOnNewActivity(activity){
        this.setState((state, props) => ({
            activitiesList: [...state.activitiesList, activity]
        }));

        this.props.onActivityAdded(activity);
    }
    _onActivityRemoved(activity){
        this.props.onActivityRemoved(activity);
    }
    _renderActivity(activity){
        let text = "Using ";
        let fenceNumber =0
        let snapshotNumber = 0;
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
                    text += 's';
                }
                text += " ";
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
            <Activity key ={`${activity.packet}.${activity.class}`} 
            id={`${activity.packet}.${activity.class}`} 
            activityPacket={activity.packet} 
            activityClass={activity.name} 
            fences={activity.fences}
            snapshots={activity.snapshots}
            text={text} 
            onActivitySelected={this._onActivitySelected}
            onActivityRemoved={this._onActivityRemoved}/>
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