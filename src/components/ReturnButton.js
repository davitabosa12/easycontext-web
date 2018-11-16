import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class RegisteredFences extends Component {


    render() {
        return (
            <Link to={this.props.to} className="btn float-left btn-light">
                <i className="material-icons align-middle">keyboard_backspace</i>Return
            </Link>
        )
    }
}