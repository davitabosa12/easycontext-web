import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import './App.css';
import FenceComponent from './components/FenceComponent'
import AddFence from './components/AddFence';

export default class RegisteredFences extends Component {
    constructor(props){
        super(props);
        this.state = {
            fencesList: this.props.fences
        }
        this._handleNewFence = this._handleNewFence.bind(this);
    }
    _renderFencesList(fences){
        if(fences === undefined)
            return (<Redirect to="/" />)
        return fences.map(this._renderFence);
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
    _handleNewFence(fence){
        if(this.alreadyExists(fence)){
            this.reject();
        }
        else {
            this.addFence(fence);
        }
    }
    alreadyExists(fence){
        let fenceName = fence.fenceName;
        let list = this.state.fencesList;
        list.forEach(element => {
            if(fenceName === element.fenceName)
                return true;
        });
        return false;
    }

    addFence(fence){
        this.setState({
            fencesList: [fence, ...this.state.fencesList]
        }, () =>{
            this._onFenceListUpdate(this.state.fencesList);
        });
    }
    reject(){
        //TODO: Tell user that fence already exists
        console.log("Fence already exists!");
    }

    _onFenceListUpdate(fenceList){
        this.props.onFenceListUpdate(fenceList);
    }

    render(){
        
        return(
            <div className="container">
                <div className="row">
                    {this._renderFencesList(this.state.fencesList)}
                    <AddFence onNewFence={this._handleNewFence}/>
                </div>
            </div>
        )
    }
}