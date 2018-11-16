import React, { Component } from 'react';



export default class RegisteredFences extends Component {

    constructor(props){
        super(props);
        this.snapshotName = this.props.snapshotName;
    }

    render(){
        return (
            <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="defaultCheck1"/>
            <label class="form-check-label" for="defaultCheck1">
              {this.props.snapshotName}
            </label>
          </div>
        )
    }
}