import React, { Component } from 'react';
import './App.css';


export default class Activity extends Component {
    render(){
        return(
            <div className="col-sm-4">
                <div class="card text-white bg-info mb-3" style={{"max-width": "18rem"}}>
                    <div class="card-header">{this.props.activityPacket}</div>
                    <div class="card-body">
                        <h5 class="card-title">{this.props.activityClass}</h5>
                        <p class="card-text">{this.props.text}</p>
                        <button className="btn btn-secondary">Edit</button>
                    </div>
                </div>
            </div>
        )
    }
    
}