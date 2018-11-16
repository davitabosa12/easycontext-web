import React, { Component } from 'react';
import FenceForm from './FenceForm'
import './App.css';

export default class RegisteredFences extends Component {
    constructor(props){
        super(props);
    }
    _renderFencesList(fences){
        return fencesList.map(this._renderFence)
    }
    _renderFence(fence){

    }
    render(){
        
        return(
            <div className="container">
                <div className="row">
                    {this._renderFencesList(this.state.fencesList)}
                    <FenceForm />
                </div>
            </div>
        )
    }
}