import React, { Component } from 'react';
import './App.css';
import ActivityEdit from './ActivityEdit';


export default class Activity extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: this.props.activityClass,
            packet: this.props.activityPacket,
            fences: [],
            snapshots: [],
        };
        this._callActivityEdit = this._callActivityEdit.bind(this);
    }
    _callActivityEdit(ev){
        var settings = document.getElementById(this.props.id+"-activity-edit")
        //settings.className = "d-block";
        var classTags = settings.className.split(" ");
        classTags = classTags.map((tag) =>{
            if(tag === "d-none"){
                tag = "d-block";
            }
        });
        settings.className = classTags.join(" ");
    }
    render() {
        return (
            <div className="col-sm-4">
                <div className="card text-white bg-info mb-3" style={{ "maxWidth": "18rem" }}>
                    <div className="card-header">
                        <div className="row">
                            
                            <span className=" ml-auto pull-right">
                                <button className="btn close"><i className="align-middle material-icons">close</i></button>
                            </span>                            
                        </div>

                    </div>
                    <div className="card-body">
                        <p className="">{this.props.activityPacket}</p>
                        <h5 className="card-title">{this.props.activityClass}</h5>
                        <p className="card-text">{this.props.text}</p>
                        <button className="btn btn-secondary" id={this.props.id} onClick={this._callActivityEdit}>Edit</button>
                        <ActivityEdit modalId="activityEdit" id={`${this.props.id}-activity-edit`} fences={this.state.fences} snapshots={this.state.snapshots} />
                    </div>
                </div>
            </div>
        )
    }

}