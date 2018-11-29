import React, { Component } from 'react';

export default class MethodForm extends Component {
    constructor(props) {
        super(props);
        this.fenceType = this.props.type;
        this.state ={
            fenceType: "1",
            fenceMethod: "Headphone.DURING",
        }
        //this._onChange = this.props.onChange;
        this._onChange = this._onChange.bind(this);

    }
    
    
    componentDidUpdate(prevProps, prevState){
        //Checar se os props que eu recebi realmente sao diferentes dos props que eu ja tinha
        //isto evita recursao
        if(prevState.fenceType !== this.props.type){
            this.setState({
                fenceType: this.props.type,
            }, () => {
                this._onChange();
            })
        }
        
    }
    _onChange(){
        
        this.props.onChange();
    }
   

    render() {
        var t = this.state.fenceType;
        if (t === "1") { //headphone
            return (
                <div className="form-group">
                    <label htmlFor="fenceType" className="col-form-label text-secondary">Fence Method</label>
                    <select className="form-control" onChange={this._onChange} name="fenceMethod" id="fenceMethod">
                        <option value="Headphone.DURING">During</option>
                        <option value="Headphone.PLUGGING_IN">Plugging In</option>
                        <option value="Headphone.UNPLUGGING">Unplugging</option>
                    </select>
                </div>
            );
        } else if (t === "2") { //activity detection
            return (
                <div className="form-group">
                    <label htmlFor="fenceType"  className="col-form-label text-secondary">Fence Method</label>
                    <select className="form-control" onChange={this._onChange} name="fenceMethod" id="fenceMethod">
                        <option value="ActivityDetection.DURING">During</option>
                        <option value="ActivityDetection.STARTING">Starting</option>
                        <option value="ActivityDetection.STOPPING">Stopping</option>
                    </select>
                </div>
            );
        } else if (t === "3") { //beacon
            return (
                <div className="form-group">
                    <label htmlFor="fenceType"  className="col-form-label text-secondary">Fence Method</label>
                    <select className="form-control" onChange={this._onChange} name="fenceMethod" id="fenceMethod">
                        <option disabled value="Beacons.UNSUPPORTED">Beacons are not supported yet.</option>
                    </select>
                </div>
            );
        } else if (t === "4") { //location
            return (
                <div className="form-group">
                    <label htmlFor="fenceType"  className="col-form-label text-secondary">Fence Method</label>
                    <select className="form-control" onChange={this._onChange} name="fenceMethod" id="fenceMethod">
                        <option value="Location.ENTERING">Entering</option>
                        <option value="Location.EXITING">Exiting</option>
                        <option value="Location.IN">In</option>
                    </select>
                </div>
            )
        } else if (t === "5") { //time
            return (
                <div className="form-group">
                    <label htmlFor="fenceType" className="col-form-label text-secondary">Fence Method</label>
                    <select className="form-control" onChange={this._onChange} name="fenceMethod" id="fenceMethod">
                        <option value="Time.AROUND_TIME_INSTANT">Around Time Instant</option>
                        <option value="Time.IN_DAILY_INTERVAL">In Daily Interval</option>
                        <option value="Time.IN_INTERVAL">In Interval</option>
                        <option value="Time.IN_TIME_INTERVAL">In Time Interval</option>
                    </select>
                </div>
            );
        } else if (t === "6"){ //aggregate rule
            return(
                <div className="form-group">
                    <label htmlFor="fenceType"  className="col-form-label text-secondary">Fence Method</label>
                    <select className="form-control" onChange={this._onChange} name="fenceMethod" id="fenceMethod">
                        <option value="Aggregate.AND">AND</option>
                        <option value="Aggregate.OR">OR</option>
                        
                    </select>
                </div>
            )
        }
    }
}