import React, { Component } from "react";

export default class ActivityView extends Component {

    constructor(props) {
        super(props);
        this.currentActivity = this.props.currentActivity;
        
    }

    componentDidUpdate(prevProps, prevState){
        //Checar se os props que eu recebi realmente sao diferentes dos props que eu ja tinha
        //isto evita recursao
        if(prevState.currentActivity !== this.props.currentActivity){
            this.setState({
                currentActivity: this.props.currentActivity,
            });
        }
    }


    render() {
        console.log(`From ActivityView ${this.props}`);
        return (
            <div className="container">
                <RegisteredFences />
                <RegisteredSnapshots />

            </div>
        )
    }

}