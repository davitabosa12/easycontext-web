import React, { Component } from "react";
import RegisteredFences from './RegisteredFences'
import RegisteredSnapshots from './RegisteredSnapshots'
import ReturnButton from './components/ReturnButton'

export default class ActivityView extends Component {

    constructor(props) {
        super(props);
        this.currentActivity = this.props.currentActivity;
        this.state = {
            currentActivity: this.props.currentActivity,
        }
        
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
            <div>
                <ReturnButton to="/" />
            <h1>Editing {this.state.currentActivity.name}</h1>
                <RegisteredFences fences={this.currentActivity.fences}/>
                <RegisteredSnapshots snapshots={this.currentActivity.snapshots}/>

            </div>
        )
    }

}