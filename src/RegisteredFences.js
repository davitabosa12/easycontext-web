import React, { Component } from 'react';
import FenceForm from './FenceForm'
import './App.css';
import FenceComponent from './components/FenceComponent'

export default class RegisteredFences extends Component {
    constructor(props){
        super(props);
        this.state = {
            fencesList: this.props.fences
        }
        this.fencesList = this.props.fences;
    }
    _renderFencesList(fences){
        return fences.map(this._renderFence)
    }
    _renderFence(fence){
        return (
            <FenceComponent 
            fenceName={fence.fenceName}
            fenceAction={fence.fenceAction}
            fenceMethod={fence.fenceMethod}
            fenceType={fence.fenceType}
            params={fence.params}/>
        )

    }
    render(){
        
        return(
            <div className="container">
                <div className="row">
                    {this._renderFencesList(this.state.fencesList)}
                    <FenceForm modalId={`randomId`}/>
                </div>
            </div>
        )
    }
}