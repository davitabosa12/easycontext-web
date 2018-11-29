import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import SnapshotComponent from './components/SnapshotComponent'

export default class RegisteredSnapshots extends Component {
    constructor(props) {
        super(props);
        this.snapshots = this.props.snapshots;

        this.state = {
            snapshotList: this.snapshots
        }
    }
    _renderSnapshotsList(snapshots) {
        if (snapshots === undefined)
            return (<Redirect to="/" />)
        return snapshots.map(this._renderSnapshot)
    }
    _renderSnapshot(snapshot) {
        return (
            <SnapshotComponent snapshotName={snapshot.snapshotName} />
        )

    }
    render() {

        return (
            <div className="container">
                <div className="row">
                    {this._renderSnapshotsList(this.state.snapshotList)}
                </div>
            </div>
        )
    }
}
