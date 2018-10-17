import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


export default class AddActivity extends Component {
    render(){
        return(
            <div className="col-sm-4">
                <div class="card text-white bg-secondary mb-3" style={{"max-width": "18rem"}}>
                    <div class="card-header">Add a Activity</div>
                    <div class="card-body">
                        <h5 class="card-title"></h5>
                        <p class="card-text"></p>
                        <button className="btn btn-block btn-secondary"><i className="material-icons align-middle">add</i></button>
                    </div>
                </div>
            </div>
        )
    }
}