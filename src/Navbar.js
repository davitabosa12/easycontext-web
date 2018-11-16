import React, { Component } from 'react';
import './App.css';


export default class Navbar extends Component {
    constructor(props){
        super(props);
        this._handleExport = this._handleExport.bind(this);
    }

    _handleExport(){
        this.props.onExport();
    }
    render() {
        return(
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="#">EasyContext</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                
                    <button className="btn btn-outline-success ml-auto" type="submit" onClick={this._handleExport}>Export Configuration</button>
                </div>
            </nav>
        )
    }
}