import React, { Component } from 'react';
import Navbar from './Navbar';
import RegisteredActivities from './RegisteredActivities';
import './App.css';

export default class Root extends Component {
    constructor(props){
        super(props);
        this._handleExport = this._handleExport.bind(this);
    }
    _handleExport(){
        this.props.onExport();
    }
    render() {
        return (
            <div className="App w-100 h-100">
                <Navbar onExport={this._handleExport}/>
                <div className="container">
                    {this.props.children}
                </div>

            </div>
        )

    }
}