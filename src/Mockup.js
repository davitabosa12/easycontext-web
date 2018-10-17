import React, { Component } from 'react';
import logo from './logo.svg';
import Activity from './Activity'
import AddActivity from './AddActivity'
import './App.css';


export default class Mockup extends Component {
    render(){
        return (
            <div className="container">
                <div className="row">
                    <Activity title="MainActivity" text="Using 2 Fences, 1 Snapshot" />
                    <Activity title="LocationActivity" text="Using 1 Snapshot" />
                    <AddActivity/>
                </div>
            </div>
        )
    }
}