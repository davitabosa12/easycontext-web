import React, { Component } from "react";
import RegisteredFences from './RegisteredFences'
import RegisteredSnapshots from './RegisteredSnapshots'
import ReturnButton from './components/ReturnButton'
import { Redirect } from 'react-router-dom'

export default class ActivityView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentActivity: this.props.currentActivity || new Object(),
            isReturning: false,
        }

        this._handleActivityEdit = this._handleActivityEdit.bind(this);
        this._handleFenceListUpdate = this._handleFenceListUpdate.bind(this);

    }

    componentDidUpdate(prevProps, prevState) {
        //Checar se os props que eu recebi realmente sao diferentes dos props que eu ja tinha
        //isto evita recursao
        if (prevState.currentActivity !== this.props.currentActivity) {
            this.setState({
                currentActivity: this.props.currentActivity,
            });
        }

    }

    _handleActivityEdit() {
        this.props.onActivityEdited(this.state.currentActivity);
        setTimeout(() => {
            this.setState({
                isReturning: true,
            });
        }, 500)
    }
    _handleFenceListUpdate(fenceList) {
        var edited = this.state.currentActivity;
        edited.fences = fenceList;
        this.setState({
            currentActivity: edited
        }, () => {
            console.log("ActivityView: Fence updated! " + edited.fences);
        });
    }
    _renderRedirect() {
        if(this.state.isReturning)
        return (
                <Redirect to="/" />
        )
        else return(<span></span>);
    }


    render() {

        console.log(`From ActivityView ${this.props}`);
        return (
            <div>
                {this._renderRedirect()}
                <ReturnButton to="/" onClick={this._handleActivityEdit} />
                <h1>Editing {this.state.currentActivity.name}</h1>
                <RegisteredFences fences={this.state.currentActivity.fences}
                    onFenceListUpdate={this._handleFenceListUpdate}
                />
                <RegisteredSnapshots snapshots={this.state.currentActivity.snapshots} />

            </div>
        );
    }

}