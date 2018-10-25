import React, { Component } from 'react';


class CommentComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
    }

  
    // Voorbeeld: https://reactjs.org/docs/forms.html

    handleChange = (event) => {
        alert(event.target.value);
        this.setState({ value: event.target.value });
    }

    handleClick = (event) => {
      
        alert('An essay was submitted: ' + this.state.value);
        event.preventDefault();
    };


    render() {
        return (
            <div class="input-group mb-3">

                <select className="form-control js-DisplayOn valid">
                </select>
                <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroup-sizing-default">Add</span>
                </div>
                <input type="text" value={this.state.value} onChange={this.handleChange} class="form-control" />
                <div class="input-group-append">
                    <button type="button" onClick={this.handleClick} class="btn btn-primary" >Save comment</button>
                </div>
            </div>


        );
    }
}
export default CommentComponent;