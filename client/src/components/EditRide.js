import React, {Component} from 'react';
import axios from 'axios';
import RideService from './RideService';
import {Link} from 'react-router-dom';
let config = require('../config');
let locations = require('../locations');

class EditRide extends Component {

    constructor(props){
        super(props);
        let now = Date.now();

        this.addRideService = new RideService();
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.populateLocations = this.populateLocations.bind(this);
        this.state={};
    }

    componentWillMount(){
        axios.get(config.backendURL + '/rides/edit/'+this.props.match.params.id)
        .then(response => {
            this.setState({
                name:response.data.name,
                banner:response.data.banner,
                phone:response.data.phone,
                email: response.data.email,
                pickupLoc: response.data.pickupLoc,
                dropoffLoc: response.data.dropoffLoc,
                status: response.data.status,
                riders: response.data.riders
            });
        })
        .catch(function(error){
            console.log(error);
        })
    }

    validateForm() {
        let bannerPattern = new RegExp("00[0-9]{7}");
        let phonePattern = new RegExp("[0-9]{10}");
        let emailPattern = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?");
        let riderPattern = new RegExp("[1-6]");

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
        else if(this.state.pickupLoc === this.state.dropoffLoc) {
            alert("Pickup and dropoff locations may not be the same.")
            return false;
        }
        else{
            return true;
        }
    }

    populateLocations() {
        return locations.map(function(location, i){
            if(location[0] === "Frost Campus" || location[0] === "Medical Campus" || location[0] === "Off Campus" || location[0] === "Intersections"){
                return <option value={location[0]} key={i} disabled>{location[0]}</option>;
            }
            else{
                return <option value={location[0]} key={i}>{location[0]}</option>;
            }
        })
    }

    handleInputChange(event){
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({[name]: value});
    }

    handleSubmit(event) {
        event.preventDefault();
        if(this.validateForm()) {
            this.addRideService.updateData(this.state, this.props.match.params.id);
            this.props.history.push('/complete/' + this.props.match.params.id);
        }
    }

    render() {
        return(
            <div className="main-content" padding="5">
                <img src="/img/logo.png" alt="SLU Ride" height="100px" className="logo"/>
                <h1 className="request-header">Edit Your Ride</h1>
                    <form onSubmit={this.handleSubmit}>

                        <h4>Name:</h4>
                            <input name="name" type="text" value={this.state.name} onChange={this.handleInputChange} className="form-control"/>
                        <h4>Banner ID:</h4>
                            <input name="banner" type="text" value={this.state.banner} onChange={this.handleInputChange} className="form-control"/>
                        <h4>Phone Number:</h4>
                            <input name="phone" type="text" value={this.state.phone} onChange={this.handleInputChange} className="form-control"/>
                        <h4>Email:</h4>
                            <input name="email" type="text" value={this.state.email} onChange={this.handleInputChange} className="form-control"/>
                        <h4>Number of Riders:</h4>
                            <select name="riders" value={this.state.riders} onChange={this.handleInputChange} className="form-control" required>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                            </select>
                        <h4>Pickup Location:</h4>
                            <select name="pickupLoc" value={this.state.pickupLoc} onChange={this.handleInputChange} className="form-control" required>
                                {this.populateLocations()}
                            </select>
                        <h4>Dropoff Location:</h4>
                            <select name="dropoffLoc" value={this.state.dropoffLoc} onChange={this.handleInputChange} className="form-control" required>
                                {this.populateLocations()}
                            </select>
                            <br />
                        <input type="submit" value="Update" className="button"/>
                     </form><br />
                <Link to={"/complete/" + this.props.match.params.id} className="button" style={{color: 'white', textDecoration:'none'}}>Go Back</Link>
                </div>
        );
    }
}

export default EditRide;
