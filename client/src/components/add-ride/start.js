import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Start extends Component {

    render() {
        return(
            <div className="main-content" padding="5">
                <img src="/img/logo.png" alt="SLU Ride" height="100px" className="logo" />
                <h1 className="request-header">Request a Ride!</h1>
                <h3>Let's get started!</h3>
                <hr />
                <h3>Tell us a little more about yourself:</h3>
                <br />
                <h4>Name:</h4>
                <input name="name" type="text" value={this.props.name} placeholder="Full Name" onChange={this.props.handleInputChange} className="form-control"  required />
                <h4>Banner ID:</h4>
                <input name="banner" type="text" pattern="\d*" value={this.props.banner} placeholder="000123456" onChange={this.props.handleInputChange} className="form-control" required />
                <h4>Phone Number:</h4>
                <input name="phone" type="text" pattern="\d*" value={this.props.phone} placeholder="3145555555" onChange={this.props.handleInputChange} className="form-control" required />
                <h4>Email:</h4>
                <input name="email" type="text" value={this.props.email} placeholder="first.last@slu.edu" onChange={this.props.handleInputChange} className="form-control" required />
                <br />
                <button onClick={this.props.changeScreen("riders")} className="button" style={{color: 'white', textDecoration:'none'}}>Next Step!</button>
            </div>
        )
    }

}

export default Start;