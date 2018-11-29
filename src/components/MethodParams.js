import React, { Component } from 'react';

export default class MethodParams extends Component {
    constructor(props) {
        super(props);

        this.state = {
            method: this.props.method,
            params: new Object(),
        }
        //this._onChange = this.props.onChange;
        this._onChange = this._onChange.bind(this);
        this._renderParams = this._renderParams.bind(this);

    }


    componentDidUpdate(prevProps, prevState) {
        //Checar se os props que eu recebi realmente sao diferentes dos props que eu ja tinha
        //isto evita recursao
        if (prevState.method !== this.props.type) {
            this.setState({
                method: this.props.method,
            }, () => {
                this._onChange();
            })
        }

    }
    _onChange() {

        this.props.onChange();
    }

    _renderActivityDetectionParams() {
        return (
            <div>
                <label htmlFor="params" className="col-form-label text-secondary">Activity Types</label>
                <div class="form-check">
                    <input class="form-check-input" name="params" type="checkbox" value="" id="defaultCheck1" />
                    <label class="form-check-label" for="defaultCheck1">
                        In Vehicle
                            </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" name="params" type="checkbox" value="" id="defaultCheck1" />
                    <label class="form-check-label" for="defaultCheck1">
                        On Bicycle
                            </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" name="params" type="checkbox" value="" id="defaultCheck1" />
                    <label class="form-check-label" for="defaultCheck1">
                        On Foot
                            </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" name="params" type="checkbox" value="" id="defaultCheck1" />
                    <label class="form-check-label" for="defaultCheck1">
                        Running
                            </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" name="params" type="checkbox" value="" id="defaultCheck1" />
                    <label class="form-check-label" for="defaultCheck1">
                        Still
                            </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" name="params" type="checkbox" value="" id="defaultCheck1" />
                    <label class="form-check-label" for="defaultCheck1">
                        Walking
                            </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" name="params" type="checkbox" value="" id="defaultCheck1" />
                    <label class="form-check-label" for="defaultCheck1">
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
                    <input type="text" onChange={this._formChange} className="form-control" placeholder="my_fence_name" id="latitude" name="latitude" />
                </div>
                <div className="form-group">
                    <label htmlFor="latitude" className="col-form-label text-secondary">Longitude</label>
                    <input type="text" onChange={this._formChange} className="form-control" placeholder="my_fence_name" id="longitude" name="latitude" />
                </div>
                <div className="form-group">
                    <label htmlFor="latitude" className="col-form-label text-secondary">Radius</label>
                    <input type="text" onChange={this._formChange} className="form-control" placeholder="my_fence_name" id="radius" name="latitude" />
                </div>
            </div>
        )
    }
    _renderParams() {
        var m = this.state.method;
        if (m === "Headphone.DURING") {
            return (
                <div>
                    <label htmlFor="params" className="col-form-label text-secondary">Headphone State</label>
                    <select className="form-control" onChange={this._onChange} name="params" id="params">
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
            <div>
                {this._renderLocationParams()}

                <div class="form-check">
                    <input class="form-check-input" name="locationDataset" type="checkbox" value="" id="defaultCheck1" />
                    <label class="form-check-label" for="defaultCheck1">
                        From dataset
                    </label>
                </div>
            </div>



        } else if (m === "Location.EXITING") {
            <div>
                {this._renderLocationParams()}

            </div>

        } else if (m === "Location.IN") {
            return (
                <div>
                    {this._renderLocationParams()}
                    <div className="form-group">
                        <label htmlFor="dwellTimeMillis" className="col-form-label text-secondary">Dwell Time (Milliseconds)</label>
                        <input type="number" step="1" onChange={this._formChange} className="form-control" placeholder="my_fence_name" id="latitude" name="dwellTime" />
                    </div>

                </div>

            )

        } else if (m === "Time.AROUND_TIME_INSTANT") {
            return (
                <div></div>
            )

        } else if (m === "Time.IN_DAILY_INTERVAL") {
            return (
                <div></div>
            )

        } else if (m === "Time.IN_INTERVAL") {
            return (
                <div></div>
            )

        } else if (m === "Time.IN_TIME_INTERVAL") {
            return (
                <div></div>
            )

        } else if (m === "Aggregate.AND") {
            return (
                <div></div>
            )

        } else if (m === "Aggregate.OR") {
            return (
                <div></div>
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