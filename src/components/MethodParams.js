import React, { Component } from 'react';
import FenceForm from '../FenceForm';

export default class MethodParams extends Component {
    constructor(props) {
        super(props);

        this.state = {
            method: this.props.method,
            params: new Object(),
        }
        this.aggregate1 = {};
        this.aggregate2 = {};
        //this._onChange = this.props.onChange;
        this._onChange = this._onChange.bind(this);
        this._agregateChange1 = this._agregateChange1.bind(this);
        this._agregateChange2 = this._agregateChange2.bind(this);
        this._renderParams = this._renderParams.bind(this);

    }


    componentDidUpdate(prevProps, prevState) {
        //Checar se os props que eu recebi realmente sao diferentes dos props que eu ja tinha
        //isto evita recursao
        if (prevState.method !== this.props.method && prevState.type !== this.props.type) {
            this.setState({
                method: this.props.method,
            }, () => {
                this._onChange();
            })
        }

    }
    _agregateChange1(fence) {
        this.aggregate1 = fence;
        this.props.aggregateChange1(fence);

    }
    _agregateChange2(fence) {
        this.aggregate2 = fence;
        this.props.aggregateChange2(fence);
    }
    _onChange() {

        this.props.onChange();
    }

    _renderActivityDetectionParams() {
        return (
            <div>
                <label htmlFor="activityTypes" className="col-form-label text-secondary">Activity Types</label>
                <div class="form-check">
                    <input class="form-check-input" onChange={this._onChange} name={this.props.id +"activityTypes"} type="checkbox" value="IN_VEHICLE" id={this.props.id +"activityTypes"} />
                    <label class="form-check-label" for="defaultCheck1">
                        In Vehicle
                            </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" onChange={this._onChange} name={this.props.id +"activityTypes"} type="checkbox" value="ON_BICYCLE" id={this.props.id +"activityTypes"}/>
                    <label class="form-check-label" for="defaultCheck1">
                        On Bicycle
                            </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" onChange={this._onChange} name={this.props.id +"activityTypes"} type="checkbox" value="ON_FOOT" id={this.props.id +"activityTypes"} />
                    <label class="form-check-label" for="defaultCheck1">
                        On Foot
                            </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" onChange={this._onChange} name={this.props.id +"activityTypes"} type="checkbox" value="RUNNING" id={this.props.id +"activityTypes"} />
                    <label class="form-check-label" for="defaultCheck1">
                        Running
                            </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" onChange={this._onChange} name={this.props.id +"activityTypes"} type="checkbox" value="STILL" id={this.props.id +"activityTypes"} />
                    <label class="form-check-label" for="defaultCheck1">
                        Still
                            </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" onChange={this._onChange} name={this.props.id +"activityTypes"} type="checkbox" value="WALKING" id={this.props.id +"activityTypes"} />
                    <label class="form-check-label" for="defaultCheck1">
                        Walking
                            </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" onChange={this._onChange} name={this.props.id +"activityTypes"} type="checkbox" value="UNKNOWN" id={this.props.id +"activityTypes"} />
                    <label class="form-check-label" for="activityTypes">
                        Unknown
                            </label>
                </div>
            </div>
        )
    }
    _renderLocationParams() {
        return (
            <div>
                <div className="form-group">
                    <label htmlFor="latitude" className="col-form-label text-secondary">Latitude</label>
                    <input type="number" step="0.0000001" min="-180" max="180" onChange={this._onChange} className="form-control" placeholder="51.5009082" id={this.props.id +"latitude"} name="latitude" />
                </div>
                <div className="form-group">
                    <label htmlFor="longitude" className="col-form-label text-secondary">Longitude</label>
                    <input type="number" step="0.0000001" min="-90" max="90" onChange={this._onChange} className="form-control" placeholder="-0.1217433" id={this.props.id +"longitude"} name="longitude" />
                </div>
                <div className="form-group">
                    <label htmlFor="radius" className="col-form-label text-secondary">Radius (m)</label>
                    <input type="number" step="1" min="1" onChange={this._onChange} className="form-control" placeholder="300" id={this.props.id +"radius"} name="radius" />
                </div>
            </div>
        )
    }
    _renderParams() {
        var m = this.state.method;
        if (m === "Headphone.DURING") {
            return (
                <div>
                    <label htmlFor="headphoneState" className="col-form-label text-secondary">Headphone State</label>
                    <select className="form-control" onChange={this._onChange} name="headphoneState" id={this.props.id +"headphoneState"}>
                        <option value="PLUGGED_IN">Plugged In</option>
                        <option value="UNPLUGGED">Unplugging</option>
                    </select>
                </div>

            )
        } else if (m === "Headphone.PLUGGING_IN") { //no parameters!
            return (
                <div></div>
            )
        } else if (m === "Headphone.UNPLUGGING") {//no parameters!
            return (
                <div></div>
            )

        } else if (m === "ActivityDetection.DURING") {
            return this._renderActivityDetectionParams();

        } else if (m === "ActivityDetection.STARTING") {
            return this._renderActivityDetectionParams();

        } else if (m === "ActivityDetection.STOPPING") {
            return this._renderActivityDetectionParams();

        } else if (m === "Location.ENTERING") {
            return (
                <div>
                    {this._renderLocationParams()}

                    <div class="form-check">
                        <input class="form-check-input" name="locationDataset" type="checkbox" value="" id={this.props.id +"defaultCheck1"} />
                        <label class="form-check-label" for="defaultCheck1">
                            From dataset
                    </label>
                    </div>
                </div>
            )


        } else if (m === "Location.EXITING") {
            return (
                <div>
                    {this._renderLocationParams()}
                    <div class="form-check">
                        <input class="form-check-input" name="locationDataset" type="checkbox" value="" id={this.props.id +"defaultCheck1"} />
                        <label class="form-check-label" for="defaultCheck1">
                            From dataset
                    </label>
                    </div>
                </div>
            )

        } else if (m === "Location.IN") {
            return (
                <div>
                    {this._renderLocationParams()}
                    <div className="form-group">
                        <label htmlFor="dwellTimeMillis" className="col-form-label text-secondary">Dwell Time (Milliseconds)</label>
                        <input type="number" step="1" onChange={this._onChange} className="form-control" placeholder="my_fence_name" id={this.props.id +"latitude"} name="dwellTime" />
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" name="locationDataset" type="checkbox" value="" id={this.props.id +"defaultCheck1"} />
                        <label class="form-check-label" for="defaultCheck1">
                            From dataset
                    </label>
                    </div>

                </div>

            )

        } else if (m === "Time.AROUND_TIME_INSTANT") {
            return (
                <div>
                    <div className="form-check">
                        <input class="form-check-input" onChange={this._onChange} type="radio" name="time_instant" id={this.props.id +"time_instant"} value="sunrise" checked />
                        <label class="form-check-label" for="exampleRadios1">
                            Sunrise
                            </label>
                    </div>
                    <div className="form-check">
                        <input class="form-check-input" onChange={this._onChange} type="radio" name="time_instant" id={this.props.id +"time_instant"} value="sunset" />
                        <label class="form-check-label" for="exampleRadios1">
                            Sunset
                            </label>
                    </div>
                    <div className="form-group">
                        <label htmlFor="start_offset" className="col-form-label text-secondary">Start Offset (Milliseconds)</label>
                        <input type="number" step="1" onChange={this._onChange} className="form-control" placeholder="10800000" id={this.props.id +"start_offset"} name="start_offset" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="stop_offset" className="col-form-label text-secondary">Stop Offset (Milliseconds)</label>
                        <input type="number" step="1" onChange={this._onChange} className="form-control" placeholder="18000000" id={this.props.id +"stop_offset"} name="stop_offset" />
                    </div>
                </div>
            )

        } else if (m === "Time.IN_DAILY_INTERVAL") {
            return (
                <div>
                    <div className="form-group">
                        <label htmlFor="timezone" className="col-form-label text-secondary">Timezone</label>
                        <input type="text" step="1" onChange={this._onChange} className="form-control" placeholder="Europe/London" id={this.props.id +"timezone"} name="timezone" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="start_time" className="col-form-label text-secondary">Start Time of Day (Milliseconds)</label>
                        <input type="number" step="1" onChange={this._onChange} className="form-control" placeholder="10800000" id={this.props.id +"start_time"} name="start_time" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="stop_time" className="col-form-label text-secondary">Stop Time of Day (Milliseconds)</label>
                        <input type="number" step="1" onChange={this._onChange} className="form-control" placeholder="18000000" id={this.props.id +"stop_time"} name="stop_time" />
                    </div>
                </div>
            )

        } else if (m === "Time.IN_INTERVAL_OF_DAY") {
            return (
                <div>
                    <div className="form-group">
                        <label htmlFor="day_of_week" className="col-form-label text-secondary">Timezone</label>
                        <select onChange={this._onChange} name="day_of_week" id={this.props.id +"day_of_week"}>
                            <option value="1">Sunday</option>
                            <option value="2">Monday</option>
                            <option value="3">Tuesday</option>
                            <option value="4">Wednesday</option>
                            <option value="5">Thursday</option>
                            <option value="6">Friday</option>
                            <option value="7">Saturday</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="timezone" className="col-form-label text-secondary">Timezone</label>
                        <input type="text" step="1" onChange={this._onChange} className="form-control" placeholder="Europe/London" id={this.props.id +"timezone"} name="timezone" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="start_time" className="col-form-label text-secondary">Start Time of Day (Milliseconds)</label>
                        <input type="number" step="1" onChange={this._onChange} className="form-control" placeholder="10800000" id={this.props.id +"start_time"} name="start_time" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="stop_time" className="col-form-label text-secondary">Stop Time of Day (Milliseconds)</label>
                        <input type="number" step="1" onChange={this._onChange} className="form-control" placeholder="18000000" id={this.props.id +"stop_time"} name="stop_time" />
                    </div>
                </div>
            )

        } else if (m === "Time.IN_INTERVAL") {
            return (
                <div>
                    <div className="form-group">
                        <label htmlFor="start_time" className="col-form-label text-secondary">Start Time</label>
                        <input type="number" step="1" onChange={this._onChange} className="form-control" placeholder="10800000" id={this.props.id +"start_time"} name="start_time" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="stop_time" className="col-form-label text-secondary">Stop Time</label>
                        <input type="number" step="1" onChange={this._onChange} className="form-control" placeholder="18000000" id={this.props.id +"stop_time"} name="stop_time" />
                    </div>
                </div>
            )

        } else if (m === "Time.IN_TIME_INTERVAL") {
            return (
                <div>
                    <label htmlFor="time_interval">Time Interval</label>
                    <select onChange={this._onChange} name="time_interval" id={this.props.id +"time_interval"}>
                        <option value="1">Weekday</option>
                        <option value="2">Weekend</option>
                        <option value="3">Holiday</option>
                        <option value="4">Morning</option>
                        <option value="5">Afternoon</option>
                        <option value="6">Evening</option>
                        <option value="7">Night</option>
                    </select>
                </div>
            )

        } else if (m === "Aggregate.AND") {
            return (
                <div className="row">
                    <div className="col-s6"><FenceForm onChange={this._agregateChange1} onSave={this._agregateChange1} id={Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 10)}/></div>
                    <div className="col-s6"><FenceForm onChange={this._agregateChange2} onSave={this._agregateChange2} id={Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 10)}/></div>
                </div>
            )

        } else if (m === "Aggregate.OR") {
            return (
                <div className="row">
                    <div className="col-s12 col-m6"><FenceForm onChange={this._agregateChange1} onSave={this._agregateChange1} id={Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 10)}/></div>
                    <div className="col-s12 col-m6"><FenceForm onChange={this._agregateChange2} onSave={this._agregateChange2} id={Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 10)}/></div>
                </div>
            )
        }
    }



    render() {
        return (
            <div className="form-group">

                {this._renderParams()}
            </div>
        )
    }
}