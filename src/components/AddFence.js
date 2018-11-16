import React, { Component } from 'react';
import FenceForm from '../FenceForm';


export default class AddFence extends Component {
    constructor(props){
        super(props);
        this._handleNewFence = this._handleNewFence.bind(this);
        console.log("AddFence: props->>" + this.props.onNewFence );
    }
    _handleNewFence(activity){
        console.log(`From AddFence: ${activity.packet.value}.${activity.class.value}`);
        this.props.onNewActivity(activity);
    }
    _handleNewFence(fence){
        console.log(`From AddFence: ${fence.fenceName}`);
        this.props.onNewFence(fence);
    }
    render(){
        return(
            <div className="col-sm-4">
                <div className="card text-white bg-secondary mb-3" style={{"maxWidth": "18rem"}}>
                    <div className="card-header">Add a new Fence</div>
                    <div className="card-body">
                        <h5 className="card-title"></h5>
                        <p className="card-text"></p>
                        <button className="btn btn-block btn-secondary" data-toggle="modal" data-target="#addFence"><i className="material-icons align-middle">add</i></button>
                    </div>
                </div>
            <FenceForm onSave={this._handleNewFence} modalId="addFence"/>
            </div>
        )
    }
}