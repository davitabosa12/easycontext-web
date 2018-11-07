/**
 * Um elemento que mostra uma regra contextual de uma activity
 * 
 *  PROPS:
 *      name
 *      action
 *      type
 *      method
 *      params
 */

import React, { Component } from 'react';
import './App.css';

export default class FenceAttribute extends Component {
    constructor(props) {
        super(props);
        this.fenceName = props.name;
        this.fenceAction = props.action;
        this.fenceType = props.type;
        this.fenceMethod = props.method;
        this.params = props.params;
        this.state = {
            fenceName: props.name,
            fenceAction: props.action,
            fenceType: props.type,
            fenceMethod: props.method,
            params: props.params,
        };

        this.onEdit = props.onEdit;




    }


    render() {
        return (
            <div className="col-sm-4">
                <div className="card text-white bg-info mb-3" style={{ "maxWidth": "18rem" }}>
                    <div className="card-header">
                        <div className="row">
                            <p>Fence</p>
                            <span className="ml-auto pull-right">
                                <button className="btn close"><i className="align-middle material-icons">close</i></button>
                            </span>
                        </div>

                    </div>
                    <div className="card-body">
                        <h5 className="card-title">{this.state.fenceName}</h5>

                        <p className="card-text">Action: <strong>{this.state.fenceAction}</strong></p>
                        <p className="card-text">Type:<strong>{this.state.fenceType}</strong></p>
                        <p className="card-text">Method:<strong>{this.state.fenceMethod}</strong></p>
                        <p className="card-text">Parameters:<strong>{this.state.params}</strong></p>

                        <button className="btn btn-secondary" onClick={this.callModal}>Edit</button>
                    </div>
                </div>
            </div>
        )
    }
}