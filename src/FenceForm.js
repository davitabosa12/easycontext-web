import React, { Component } from 'react';
import './App.css';
import FenceAttribute from './FenceAttibute';
import MethodForm from './form/MethodForm';

export default class ActivityEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fenceType: "1",
        }
        
    }

    _formChange(){
        const name = document.getElementById("fenceName").value;
        const action = document.getElementById("fenceAction").value;
        const type = document.getElementById("fenceType").value;
        const method = document.getElementById("fenceMethod").value;
        this.setState({
            fenceName: name,
            fenceAction: action,
            fenceType: type,
            fenceMethod: method,
        }, () => {
            console.log(this.state);
        })
    }


    render() {
        //TODO: Add  new fence
        return (
            <div className="modal fade bd-example-modal-lg" id={this.props.modalId} tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLongTitle">Add a new Activity</h5>
                        <button type="button" className="close" onClick={this._cleanData} data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-content">
                        <form>
                            <div className="form-group">
                                <label htmlFor="fenceName" className="col-form-label">Fence Name</label>
                                <input type="text" className="form-control" placeholder="my_fence_name" id="fenceName" name="fenceName" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="fenceAction" className="col-form-label">Fence Action</label>
                                <input type="text" className="form-control" placeholder="com.example.MyFenceAction" id="fenceAction" name="fenceAction" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="fenceType" className="col-form-label">Fence Type</label>
                                <select className="form-control" name="fenceType" defaultValue="1" id="fenceType">
                                    <option value="1">Headphone</option>
                                    <option value="2">Activity Detection</option>
                                    <option value="3">Beacon</option>
                                    <option value="4">Location</option>
                                    <option value="5">Time</option>
                                </select>
                            </div>
                            <MethodForm type= {this.state.fenceType} ></MethodForm>
                            <div className="form-group">
                                <label htmlFor="params" className="col-form-label">Params</label>
                                <input type="text" className="form-control" placeholder="???" id="params" name="params" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}