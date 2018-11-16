import React, { Component } from 'react';
import './App.css';

export default class AddActivityModal extends Component {
    constructor(props) {
        super(props);
        this._newActivity = this._newActivity.bind(this);
    }
    _cleanData() {
        var activityPacket = document.getElementsByName("activityPacket")[0];
        var activityClass = document.getElementsByName("activityClass")[0];
        activityClass.value = "";
        activityPacket.value = "";
    }
    _newActivity() {
        var activityPacket = document.getElementsByName("activityPacket")[0];
        var activityClass = document.getElementsByName("activityClass")[0];
        this.props.onNewActivity({ packet: activityPacket, name: activityClass });

    }
    render() {
        return (
            <div className="modal fade" id={this.props.modalId} tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Add a new Activity</h5>
                            <button type="button" className="close" onClick={this._cleanData} data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="activityPacket" className="col-form-label">Packet Name</label>
                                    <input type="text" className="form-control" placeholder="com.example.myapp" id="activityPacket" name="activityPacket" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="activityClass" className="col-form-label">Activity Name</label>
                                    <input type="text" className="form-control" placeholder="MainActivity" id="activityClass" name="activityClass" />
                                </div>

                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={this._cleanData} data-dismiss="modal">Close</button>
                            <button type="button" data-dismiss="modal" className="btn btn-primary" onClick={this._newActivity}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}