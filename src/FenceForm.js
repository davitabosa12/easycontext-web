import React, { Component } from 'react';
import './App.css';
import FenceAttribute from './FenceAttibute';
import MethodForm from './form/MethodForm';

export default class FenceForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fenceType: "1",
        };

        this._formChange = this._formChange.bind(this);

    }

    _formChange() {
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
            <div className="modal fade bd-example-modal-lg" id={this.props.modalId} tabindex="-1" role="document" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title text-secondary" id="exampleModalLongTitle">Add a new Fence</h5>
                            <button type="button" className="close" onClick={this._cleanData} data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="fenceName" className="col-form-label text-secondary">Fence Name</label>
                                    <input type="text" onChange={this._formChange} className="form-control" placeholder="my_fence_name" id="fenceName" name="fenceName" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="fenceAction" className="col-form-label text-secondary">Fence Action</label>
                                    <input type="text" onChange={this._formChange} className="form-control" placeholder="com.example.MyFenceAction" id="fenceAction" name="fenceAction" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="fenceType" className="col-form-label text-secondary">Fence Type</label>
                                    <select onChange={this._formChange} className="form-control" name="fenceType" defaultValue="1" id="fenceType">
                                        <option value="1">Headphone</option>
                                        <option value="2">Activity Detection</option>
                                        <option value="3">Beacon</option>
                                        <option value="4">Location</option>
                                        <option value="5">Time</option>
                                    </select>
                                </div>
                                <MethodForm onChange={this._formChange} type={this.state.fenceType} ></MethodForm>
                                <div className="form-group">
                                    <label htmlFor="params" onChange={this._formChange} className="col-form-label text-secondary">Params</label>
                                    <input type="text" className="form-control" placeholder="???" id="params" name="params" />
                                </div>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}