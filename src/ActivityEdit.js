/**
 * UM CONTAINER PARA FENCES E OUTRAS CONFIGURAÇÕES
 */

import React, { Component } from 'react';
import './App.css';
import FenceAttribute from './FenceAttibute';
import FenceForm from './FenceForm'

export default class ActivityEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fencesList: this.props.fences,
            snapshotList: this.props.snapshots,
            hidden: true,
        };
        this._handleOnNewFence = this._handleOnNewFence.bind(this);

    }

    _toggle() {
        this.setState({
            hidden: !this.state.hidden,
        })
    }

    componentDidMount() {

    }
    /**
     * Adiciona a nova activity na lista dentro do props.
     */
    _handleOnNewFence(activity) {
        this.setState((state, props) => ({
            fencesList: [...state.fencesList, activity]
        }));
    }
    _renderFence(fence) {
        return (
            <FenceAttribute name={fence.name} action={fence.action} type={fence.type} method={fence.method} params={fence.params} />
        )
    }
    _renderSnapshot(snapshot) {
        return (
            <span>aya</span>
        )
    }
    _renderFencesList(fencesList) {
        return fencesList.map(this._renderFence)
    }
    _renderSnapshotsList(snapshotList) {
        return snapshotList.map(this._renderSnapshot)
    }
    render() {
        //TODO: Add  new fence
        var display = " d-inline-block ";
        if (this.state.hidden) {
            display = " d-none ";
        }
        return (
            <div id={this.props.id} className={display}>
                {this._renderFencesList(this.state.fencesList)}
                {this._renderSnapshotsList(this.state.snapshotList)}
                <button className="btn btn-block btn-secondary" data-toggle="modal" data-target="#addRule">Add Rule</button>
                <FenceForm modalId="addRule" />
            </div>

        )


    }
}