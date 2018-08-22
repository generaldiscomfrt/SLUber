import React, {Component} from 'react';
import axios from 'axios';
import RideService from './RideService';
import {Link} from 'react-router-dom';
let config = require('../config');
let locations = require('../locations');

class EditRide extends Component {

    constructor(props){
        super(props);
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
                pickup: response.data.pickup,
                dropoff: response.data.dropoff,
                dispatched: response.data.dispatched,
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
        let dispatchedPattern = new RegExp("[0-9]{3}");

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
        else if(this.state.pickup === this.state.dropoff){
            alert("Pickup and dropoff locations may not be the same.");
            return false;
        }
        else if(this.state.dispatched && (!dispatchedPattern.test(this.state.dispatched) && this.state.dispatched.length !== 0)){
            alert("Unit must be 3 numbers long.");
            return false;
        }
        else{
            return true;
        }
    }

    populateLocations() {
        return locations.map(function(location, i){
            return <option value={location} key={i}>{location}</option>;
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
            this.props.history.push('/');
        }
    }

    render() {
        return(
                <div className="container">
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Name:
                            <input name="name" type="text" value={this.state.name} onChange={this.handleInputChange} className="form-control"/>
                            Banner ID:
                            <input name="banner" type="text" value={this.state.banner} onChange={this.handleInputChange} className="form-control"/>
                            Phone Number:
                            <input name="phone" type="text" value={this.state.phone} onChange={this.handleInputChange} className="form-control"/>
                            Email:
                            <input name="email" type="text" value={this.state.email} onChange={this.handleInputChange} className="form-control"/>
                            Pickup Location:
                            <select name="pickup" value={this.state.pickup} onChange={this.handleInputChange} className="form-control">
                                {this.populateLocations()}
                            </select>
                            Dropoff Location:
                            <select name="dropoff" value={this.state.dropoff} onChange={this.handleInputChange} className="form-control">
                                {this.populateLocations()}
                            </select>
                            Unit Dispatched:
                            <input name="dispatched" type="text" value={this.state.dispatched} onChange={this.handleInputChange} className="form-control" />
                        </label><br />
                        <input type="submit" value="Update" className="update-button" style={{color: 'white', textDecoration:'none'}}/>
                        <Link to={"/"} className="cancel-button" style={{color: 'white', textDecoration:'none'}}>Cancel</Link>
                     </form>
                </div>
        );
    }
}

export default EditRide;
