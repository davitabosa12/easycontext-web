import React, { Component } from 'react';
import './App.css';
import {Link} from 'react-router-dom';


export default class Activity extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: this.props.activityClass,
            packet: this.props.activityPacket,
            fences: this.props.fences || new Array(),
            snapshots: this.props.snapshots || new Array(),
        };
        this._callActivityEdit = this._callActivityEdit.bind(this);
        this._remove = this._remove.bind(this);
        this._onActivitySelected = props.onActivitySelected;
    }
    _callActivityEdit(ev){
        var selectedActivity = {
            name: this.state.name,
            packet: this.state.packet,
            fences: this.state.fences,
            snapshots: this.state.snapshots,
        }
        this._onActivitySelected(selectedActivity);
    }
    _remove(){
        var selectedActivity = {
            name: this.state.name,
            packet: this.state.packet,
            fences: this.state.fences,
            snapshots: this.state.snapshots,
        }
        this.props.onActivityRemoved(selectedActivity);
    }
    render() {
        return (
            <div className="col-sm-4">
                <div className="card text-white bg-info mb-3" style={{ "maxWidth": "18rem" }}>
                    <div className="card-header">
                        <div className="row">
                            
                            <span className=" ml-auto pull-right">
                                <button className="btn close" onClick={this._remove}><i className="align-middle material-icons">close</i></button>
                            </span>                            
                        </div>

                    </div>
                    <div className="card-body">
                        <p className="">{this.props.activityPacket}</p>
                        <h5 className="card-title">{this.props.activityClass}</h5>
                        <p className="card-text">{this.props.text}</p>
                        <Link to="/editFence" className="btn btn-block btn-secondary" onClick={this._callActivityEdit}>Edit</Link>                                                
                    </div>
                </div>
            </div>
        )
    }

}