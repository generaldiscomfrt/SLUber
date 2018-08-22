import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Riders extends Component {

    render() {
        return(
            <div className="main-content" padding="5">
                <img src="/img/logo.png" alt="SLU Ride" height="100px" className="logo" />
                <h1 className="request-header">Request a Ride!</h1>
                <h3>How many people are riding today? (including yourself)</h3>
                <hr />
                <select name="riders" value={this.props.riders} onChange={this.handleInputChange} className="form-control" required>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                </select>
                <button onClick={this.props.changeScreen("pickup")} className="button" style={{color: 'white', textDecoration:'none'}}>Next Step!</button>
            </div>
        )
    }

}

export default Riders;