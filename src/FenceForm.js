import React, { Component } from 'react';
import './App.css';
import FenceAttribute from './FenceAttibute';
import MethodForm from './form/MethodForm';
import MethodParams from './components/MethodParams';

export default class FenceForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fenceType: "1",
        };

        this._formChange = this._formChange.bind(this);
        this._handleSave = this._handleSave.bind(this);
        this._aggregateChange1 = this._aggregateChange1.bind(this);
        this._aggregateChange2 = this._aggregateChange2.bind(this);
        this.aggregate1 = {};
        this.aggregate2 = {};
        this.id = this.props.id || Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 10);
        this.methodFormId = this.id;
        this.methodParamsId = this.id;
        
    }
    _aggregateChange1(fence) {
        this.aggregate1 = fence;
        this._updateParams(this.state.fenceType, this.state.fenceMethod);
    }
    _aggregateChange2(fence) {
        this.aggregate2 = fence;
        this._updateParams(this.state.fenceType, this.state.fenceMethod);
    }
    _updateParams(type, method) {
        if (type === "1") { //headphone
            if (method === "Headphone.UNPLUGGING") {
                //do nothing
            }
            if (method === "Headphone.PLUGGING_IN") {
                //do nothing
            }
            if (method === "Headphone.DURING") {
                console.log(this.methodParamsId+"headphoneState");
                const headphoneState = document.getElementById(this.methodParamsId+"headphoneState").value;
                this.setState({
                    params: {
                        headphoneState: headphoneState
                    }
                }, () => console.log(this.state));
            }
        } else if (type === "2") { //activity detection
            //all parameters are the same for each method
            //no need for separate functions
            //get the value of all selected checkboxes
            const activityTypes = document.getElementsByName(this.methodParamsId+"activityTypes");
            let selected = [];
            activityTypes.forEach(element => {
                if (element.checked)
                    selected.push(element.value);
            });
            //update state with current values.
            this.setState({
                params: {
                    activityTypes: selected
                }
            }, () => {
                console.log(this.state);
            })

        } else if (type === "3") { //beacon
            //beacons are not supported yet.
            this.setState({
                params: {}
            }, () => {
                console.error("Beacons are not supported yet");
                console.log(this.state);

            });
        } else if (type === "4") { //location
            const latitude = document.getElementById(this.methodParamsId+"latitude").value;
            const longitude = document.getElementById(this.methodParamsId+"longitude").value;
            const radius = document.getElementById(this.methodParamsId+"radius").value;
            let dwellTimeMillis = undefined;
            try {
                dwellTimeMillis = document.getElementById(this.methodParamsId+"dwellTime").value;
            } catch (error) {
                dwellTimeMillis = undefined;
            }

            this.setState({
                params: {
                    latitude: latitude,
                    longitude: longitude,
                    radius: radius,
                    dwellTimeMillis: dwellTimeMillis
                }
            }, () => {
                console.log(this.state);
            })
        } else if (type === "5") { //time
            if (method === "Time.AROUND_TIME_INSTANT") {
                let timeInstant = undefined;
                try{
                    timeInstant = document.querySelector("input[name=time_instant]:checked").value;
                } catch (err){

                }
                const startOffset = document.getElementById(this.methodParamsId+"start_offset").value;
                const stopOffset = document.getElementById(this.methodParamsId+"stop_offset").value;
                this.setState({
                    params: {
                        timeInstant: timeInstant,
                        startOffsetMillis: startOffset,
                        stopOffsetMillis: stopOffset
                    }
                }, () => {
                    console.log(this.state);
                });


            } else if (method === "Time.IN_DAILY_INTERVAL") {
                const timeZone = document.getElementById(this.methodParamsId+"timezone").value;
                const startTime = document.getElementById(this.methodParamsId+"start_time").value;
                const stopTime = document.getElementById(this.methodParamsId+"stop_time").value;
                this.setState({
                    params: {
                        timeZone: timeZone,
                        startTimeOfDayMillis: startTime,
                        stopTimeOfDayMillis: stopTime
                    }
                }, () => {
                    console.log(this.state);
                });

            } else if (method === "Time.IN_INTERVAL_OF_DAY") {
                const dayOfWeek = document.getElementById(this.methodParamsId+"day_of_week").value;
                const timeZone = document.getElementById(this.methodParamsId+"timezone").value;
                const startTime = document.getElementById(this.methodParamsId+"start_time").value;
                const stopTime = document.getElementById(this.methodParamsId+"stop_time").value;
                this.setState({
                    params: {
                        dayOfWeek: dayOfWeek,
                        timeZone: timeZone,
                        startTimeOfDayMillis: startTime,
                        stopTimeOfDayMillis: stopTime
                    }
                }, () => {
                    console.log(this.state);
                });
            } else if (method === "Time.IN_INTERVAL") {
                const startTime = document.getElementById(this.methodParamsId+"start_time").value;
                const stopTime = document.getElementById(this.methodParamsId+"stop_time").value;
                this.setState({
                    params: {
                        startTimeMillis: startTime,
                        stopTimeMillis: stopTime
                    }
                }, () => {
                    console.log(this.state);
                });

            } else if (method === "Time.IN_TIME_INTERVAL") {
                const timeInterval = document.getElementById(this.methodParamsId+"time_interval").value;
                this.setState({
                    params: {
                        timeInterval: timeInterval
                    }
                }, () => {
                    console.log(this.state);
                });
            }

        } else if (type === "6") { //aggregate rule
            if (method === "Aggregate.AND") {
                this.setState({
                    params: {
                        and: [this.aggregate1, this.aggregate2]
                    }
                })
            }
            if (method === "Aggregate.OR") {
                this.setState({
                    params: {
                        or: [this.aggregate1, this.aggregate2]
                    }
                })
            }
        }
    }

    _formChange() {
        const name = document.getElementById(this.id+"fenceName").value;
        const action = document.getElementById(this.id+"fenceAction").value;
        const type = document.getElementById(this.id+"fenceType").value;
        const method = document.getElementById(this.methodFormId+"fenceMethod").value;
        this.setState({
            fenceName: name,
            fenceAction: action,
            fenceType: type,
            fenceMethod: method,
            params: []
        }, () => {
            console.log(this.state);
            setTimeout(() => {
                this._updateParams(type, method);
            }, 500);

        })
    }



    _handleSave() {
        this.props.onSave(this.state);
    }


    render() {
        return (
            <div>
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
                                <input type="text" onChange={this._formChange} className="form-control" placeholder="my_fence_name" id={this.id +"fenceName"} name="fenceName" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="fenceAction" className="col-form-label text-secondary">Fence Action</label>
                                <input type="text" onChange={this._formChange} className="form-control" placeholder="com.example.MyFenceAction" id={this.id +"fenceAction"} name="fenceAction" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="fenceType" className="col-form-label text-secondary">Fence Type</label>
                                <select onChange={this._formChange} className="form-control" name="fenceType" defaultValue="1" id={this.id +"fenceType"}>
                                    <option value="1">Headphone</option>
                                    <option value="2">Activity Detection</option>
                                    <option value="3">Beacon</option>
                                    <option value="4">Location</option>
                                    <option value="5">Time</option>
                                    <option value="6">Aggregate Rule</option>
                                </select>
                            </div>
                            <MethodForm id={this.methodFormId} onChange={this._formChange} type={this.state.fenceType} ></MethodForm>
                            <div className="form-group">
                                <label htmlFor="params" onChange={this._formChange} className="col-form-label text-secondary">Params</label>
                                <input type="text" className="form-control" placeholder="???" id="params" name="params" />
                            </div>
                            <MethodParams 
                            id = {this.methodParamsId}
                            onChange={this._formChange} 
                            type={this.state.fenceType} 
                            method={this.state.fenceMethod}
                            aggregateChange1={this._aggregateChange1}
                            aggregateChange2={this._aggregateChange2} />
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" onClick={this._handleSave}>Save changes</button>
                    </div>
                </div>
            </div>
        )
    }
}