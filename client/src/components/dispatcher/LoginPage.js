import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import LoginService from './LoginService';
import {connect, PromiseState} from 'react-refetch';
let config = require('../../config');

class LoginPage extends Component {

    constructor(props) {
        super(props);

        let now = Date.now();

        this.state = {pickup:"BSC", dropoff:"BSC", received:now};
        this.addLoginService = new LoginService();

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addLoginService.sendData = this.addLoginService.sendData.bind(this);
    }

    validateForm() {
        let emailPattern = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
        if(!emailPattern.test(this.state.email)){
            alert("Please enter a valid email address.");
            return false;
        }
        else if(this.state.pickup === this.state.password) {
            alert("Wrong Password Field.")
            return false;
        }
        else{
            return true;
        }
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const fieldName = target.name;

        this.setState({[fieldName]: value});
    }

    handleSubmit(event) {
        event.preventDefault();
        if(this.validateForm()) {
            this.addLoginService.sendData(this.state);
            console.log(this.state.id)
            this.props.history.push('/complete/');
        }
    }
    render() {
        return(
            <div className="login-content">
                <img src="/img/dispatcher.png" alt="SLU Ride" height="100px" className="logo" /> <br />
                <div className="intro">
                    <h3>SLU Ride Dispatcher Login:</h3><hr />
                    <form onSubmit={this.handleSubmit}>
                        <center>Email:</center>
                        <center> <input name="email" type="text" value={this.state.email} placeholder="Email" onChange={this.handleInputChange}  /></center>
                        <center>Password:</center>
                        <center> <input name="password" type="password" pattern="\d*" value={this.state.password} placeholder="Password" onChange={this.handleInputChange}  /></center>
                        <br/>
                        <center><Link to={"/dispatcher/index"} className="submit-button" style={{color: 'white', textDecoration:'none'}}>Login</Link></center>
                    </form>
                </div>
            </div>
        );
    }
}

export default LoginPage;