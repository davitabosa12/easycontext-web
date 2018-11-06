import React, { Component } from 'react';
import './App.css';


export default class Activity extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: this.props.activityClass,
            packet: this.props.activityPacket,
            fences: [],
            snapshots: [],
        };
    }
    callModal(){
        console.log("call a modal!");
    }
    render() {
        return (
            <div className="col-sm-4">
                <div className="card text-white bg-info mb-3" style={{ "maxWidth": "18rem" }}>
                    <div className="card-header">
                        <div className="row">
                            
                            <div className="float-right">
                                <button className="btn close"><i className="align-middle material-icons">close</i></button>
                            </div>                            
                        </div>

                    </div>
                    <div className="card-body">
                        <p className="">{this.props.activityPacket}</p>
                        <h5 className="card-title">{this.props.activityClass}</h5>
                        <p className="card-text">{this.props.text}</p>
                        <button className="btn btn-secondary" onClick={this.callModal}>Edit</button>
                    </div>
                </div>
            </div>
        )
    }

}