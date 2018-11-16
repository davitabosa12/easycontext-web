import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class ReturnButton extends Component {


    render() {
        return (
            <a onClick={this.props.onClick} className="btn float-left btn-light">
                <i className="material-icons align-middle">keyboard_backspace</i>Return
            </a>
        )
    }
}