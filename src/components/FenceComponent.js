import React, { Component } from 'react';

export default class RegisteredFences extends Component {

    constructor(props){
        super(props);
        this.fenceName = this.props.fenceName;
        this.fenceMethod = this.props.fenceMethod;
        this.fenceType = this.props.fenceType;
        this.fenceAction = this.props.fenceAction;
        this.params = this.props.params;
    }

    render(){
        return (
            <div className="col-sm-4">
                <div className="card text-white bg-success mb-3" style={{ "maxWidth": "18rem" }}>
                    <div className="card-header">
                        <div className="row">
                            
                            <span className=" ml-auto pull-right">
                                <button className="btn close"><i className="align-middle material-icons">close</i></button>
                            </span>                            
                        </div>

                    </div>
                    <div className="card-body">
                        <p className="">{this.props.fenceName}</p>
                        <h5 className="card-title">{this.props.fenceType}</h5>
                        <p className="card-text">{this.props.fenceMethod}</p>
                        <a href="#" className="btn btn-block btn-secondary" onClick={this._callActivityEdit}>Edit</a>
                        
                    </div>
                </div>
            </div>
        )
    }
}