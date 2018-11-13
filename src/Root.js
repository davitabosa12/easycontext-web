import React, { Component } from 'react';
import Navbar from './Navbar';
import RegisteredActivities from './RegisteredActivities';
import './App.css';

export default class Root extends Component {
    render() {
        return (
            <div className="App w-100 h-100">
                <Navbar />
                <div className="container">
                    {this.props.children}
                </div>

            </div>
        )

    }
}