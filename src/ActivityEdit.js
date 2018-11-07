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
        };
        this._handleOnNewFence = this._handleOnNewFence.bind(this);

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
    _renderFencesList(fencesList) {
        return fencesList.map(this._renderFence)
    }
    render() {
        //TODO: Add  new fence
        return (
            <div class="modal fade bd-example-modal-lg" id={this.props.modalId} tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        { this._renderFencesList(this.state.fencesList) }
                        { this._renderSnapshotsList(this.state.snapshotList) }
                        <button className="btn btn-block btn-secondary" data-toggle="modal" data-target="#addRule">Add Rule</button>
                        <FenceForm />
                    </div>
                </div>
            </div>
          
                    
                
        )
    }
}