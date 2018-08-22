import React, {Component} from 'react';
import RideService from './RideService';
import {Link} from 'react-router-dom';
let locations = require('../locations');

class AddRide extends Component {

    constructor(props) {
        super(props);

        let now = Date.now();

        this.state = {pickupLoc:"Adorjan Hall", dropoffLoc:"Adorjan Hall", received:now, riders: "1", status: "Active"};
        this.addRideService = new RideService();

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.populateLocations = this.populateLocations.bind(this);
    }

    validateForm() {
        let bannerPattern = new RegExp("00[0-9]{7}");
        let phonePattern = new RegExp("[0-9]{10}");
        let emailPattern = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")

        if(!bannerPattern.test(this.state.banner)){
            alert("Please enter a valid banner ID.");
            return false;
        }
        else if(!phonePattern.test(this.state.phone)){
            alert("Please enter a valid ten digit phone number.");
            return false;
        }
        else if(!emailPattern.test(this.state.email)){
            alert("Please enter a valid email address.");
            return false;
        }
        else if(this.state.pickupLoc === this.state.dropoffLoc){
            alert("Pickup and dropoff locations may not be the same.")
            return false;
        }
        else{
            return true;
        }
    }

    populateLocations() {
        return locations.map(function(location, i){
            if(location === "Frost Campus" || location === "Medical Campus" || location === "Off Campus" || location === "Intersections"){
                return <option value={location} key={i} disabled>{location}</option>;
            }
            else{
                return <option value={location} key={i}>{location}</option>;
            }
        })
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({[name]: value});
    }

    handleSubmit(event) {
        event.preventDefault();
        if(this.validateForm()) {
            this.addRideService.sendData(this.state);
            this.props.close();
            window.location.reload();
        }
    }

    render(){
        return(
                <div className="container" padding="5">
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Name:
                                <input name="name" type="text" value={this.state.name} placeholder="Full Name" onChange={this.handleInputChange} className="form-control" required />
                            Number of Riders:
                                <select name="riders" value={this.state.riders} onChange={this.handleInputChange} className="form-control" required>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                </select>
                            Banner ID:
                                <input name="banner" type="text" value={this.state.banner} placeholder="000123456" onChange={this.handleInputChange} className="form-control" required />
                            Phone Number:
                                <input name="phone" type="text" value={this.state.phone} placeholder="3145555555" onChange={this.handleInputChange} className="form-control" required />
                            Email:
                                <input name="email" type="text" value={this.state.email} placeholder="first.last@slu.edu" onChange={this.handleInputChange} className="form-control" required />
                            Pickup Location:
                                <select name="pickupLoc" value={this.state.pickupLoc} onChange={this.handleInputChange} className="form-control" required>
                                    {this.populateLocations()}
                                </select>
                            Dropoff Location:
                                <select name="dropoffLoc" value={this.state.dropoffLoc} onChange={this.handleInputChange} className="form-control" required>
                                    {this.populateLocations()}
                                </select>
                            Unit Dispatched: (optional)
                                <select name="dispatched" value={this.state.dispatched} onChange={this.handleInputChange} className="form-control">
                                    <option></option>
                                    <option value="815">815</option>
                                    <option value="816">816</option>
                                    <option value="817">817</option>
                                    <option value="800">800</option>
                                </select>
                        </label>
                        <br/>
                        <input type="submit" value="Submit" className="submit-button"/>
                        <button onClick={this.props.close} className="cancel-button">Cancel</button>
                    </form>
				</div>
        );
    }
}

export default AddRide;
