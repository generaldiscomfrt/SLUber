import React, {Component} from 'react';
import RideService from './RideService';
import {Link} from 'react-router-dom';
import {geolocated, geoPropTypes} from 'react-geolocated';

/*Used for Google Maps / location tracking*/
let locations = require('../locations');
let GoogleMapsLoader = require('google-maps');
const geolocation = require ('google-geolocation') ({
    key: 'AIzaSyA-fssqTd74LzLLZwA7YrCXbqOY0s_74DY'
});
let myMap;

class AddRide extends Component {

    constructor(props) {
        super(props);

        let now = Date.now();

        this.state = {pickupLoc:"Adorjan Hall", dropoffLoc:"Adorjan Hall", received:now, riders:"1", advice:"Use My Location",
        lat: 38.634804, long: -90.233378, status: "Active", screen: "start"};/*needed for default form values*/
        this.addRideService = new RideService();
        this.geoOptions = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };
        this.init = true;

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleGeolocate = this.handleGeolocate.bind(this);
        this.initMap = this.initMap.bind(this);
        this.findClosest = this.findClosest.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.populateLocations = this.populateLocations.bind(this);
        this.setId = this.setId.bind(this);
        this.addRideService.sendData = this.addRideService.sendData.bind(this);
    }

    componentWillMount(){/*Removable. Used just for testing*/
        alert("NOTICE: This site is for demo purposes only! SLU Ride does not monitor requests from this site.");
    }

    setId(id){/*used in RideService to return the id of the ride once it is entered in the database, allowing us to redirect to Complete*/
        this.props.history.push('/complete/' + id);
    }

// Validation is used to make sure user cannot enter certain characters. Various fields and their forbidden characters are here.
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

    populateLocations() {/*Populates dropdowns with SLU Ride's pickup/dropoff locations*/
        return locations.map(function(location, i){
            if(location[0] === "Frost Campus" || location[0] === "Medical Campus" || location[0] === "Off Campus" || location[0] === "Intersections"){
                return <option value={location[0]} key={i} disabled>{location[0]}</option>;
            }
            else{
                return <option value={location[0]} key={i}>{location[0]}</option>;
            }
        })
    }

    handleInputChange(event) {/*Update inputs when values are changed*/
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const fieldName = target.name;

        this.setState({[fieldName]: value});
    }

    handleSubmit(event) {/*Validates form & adds to DB*/
        event.preventDefault();
        if(this.validateForm()) {
            let newRide = this.addRideService.sendData(this.state);
        }
    }
// This function finds the closest building in a preset list of SLU buildings and nearby buildings and autofills the location with the button that calls this func.
    findClosest(pos){

//old lat/long input (used pos param)
        let lat = pos.coords.latitude;
        let long = pos.coords.longitude;
//        let lat = '38.634830';
//        let long = '-90.224989';

        let min = 99999;
        let closest;
        let index;

        for (index = 0; index < locations.length; ++index) {

            let lat2 = locations[index][1];
            if( lat2 !== 'NA') {

                let dif = getDist(lat, long, locations[index][1], locations[index][2]);
                if (dif < min) {
                    closest = index;
                    min = dif;
                }
            }
        }

        function getDist(lat1, long1, lat2, long2){
            let R = 6371; // Radius of the earth in km
            let dLat = degToRad(lat2-lat1);  // deg2rad below
            let dLon = degToRad(long2-long1);
            let a =
                Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(degToRad(lat1)) * Math.cos(degToRad(lat2)) *
                Math.sin(dLon/2) * Math.sin(dLon/2)
            ;
            let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
         //   let d = R * c; // Distance in km
            return R * c;
        }


        function degToRad(deg){
            return deg * (Math.PI/180);
        }

        const newText = locations[closest][0];
        const newLat = locations[closest][1];
        const newLong = locations[closest][2];
        this.setState({pickupLoc: newText});

        var marker;

        GoogleMapsLoader.load(function (google){
            var center = new google.maps.LatLng(lat, long)
            myMap.setCenter(center)
        });

        GoogleMapsLoader.load(function (google){
            marker = new google.maps.Marker({
                position: new google.maps.LatLng(lat, long),
                map: myMap
            })
        });

        GoogleMapsLoader.load(function (google){
            marker = new google.maps.Marker({
                position: new google.maps.LatLng(newLat, newLong),
                map: myMap
            })
        });

        GoogleMapsLoader.load(function (google){
            var bounds = new google.maps.LatLngBounds();
            var myLatLng = new google.maps.LatLng(lat, long);
            var pickupLatLng = new google.maps.LatLng(newLat, newLong);
            bounds.extend(myLatLng);
            bounds.extend(pickupLatLng);
            myMap.fitBounds(bounds);
        })

    }

    handleGeolocate() {

//html geolcation api code
        if ("geolocation" in navigator) {
        /* geolocation is available */

                    const geo = navigator.geolocation;

                    function fail(err) {
                        console.warn(`ERROR(${err.code}): ${err.message}`);
                        alert("Location failed.");
                    }

                    geo.getCurrentPosition( this.findClosest, fail , this.geoOptions );

                } else {
                    /* geolocation IS NOT available */
                    const newText = 'fail';
                    this.setState({advice: newText});
                }

        /* code for using google maps geolocation (wifi & cell towers)

                const params = {
                    wifiAccessPoints: [
                        {
                            macAddress: '00:25:9c:cf:1c:ac',
                            signalStrength: -65,
                            signalToNoiseRatio: 40
                        }
                    ]
                };

                geolocation (params, (err, data) => {
                    if (err) {
                        console.log (err);
                        return;
                    }

                    console.log (data);
                });

                let myLat = location.lat;
                let myLong = location.lng;

                this.findClosest(myLat, myLong);
        */



    }

    initMap() { /*Show the map on the screen*/
        //we only want the init to run once
        if (this.init === true) {

            let lat = this.state.lat;
            let long = this.state.long;
            let marker;

            GoogleMapsLoader.onLoad(function (google) {
                console.log('I just loaded google maps api');
            });

            GoogleMapsLoader.KEY = 'AIzaSyA-fssqTd74LzLLZwA7YrCXbqOY0s_74DY';

            GoogleMapsLoader.load(function (google) {
                    myMap = new google.maps.Map(document.getElementById('map'), {
                    center: {lat: lat, lng: long},
                    zoom: 15
                })
            });

            //setting the init flag to false after the first run
            this.init = false;
        }

    }


    render(){
        /*if(this.state.screen === "riders"){
            return(
                <Riders riders={this.state.riders} changeScreen={this.changeScreen} handleChange={this.handleInputChange}/>
            );
        }
        else{
            return(
                <Start name={this.state.name} banner={this.state.banner} phone={this.state.phone} email={this.state.email} changeScreen={this.changeScreen} handleChange={this.handleInputChange}/>
            );
        }*/

       return(
                <div className="main-content" padding="5">
                    <img src="/img/logo.png" alt="SLU Ride" height="100px" className="logo"/>
                    <h1 className="request-header">Request a Ride!</h1>
                    <form onSubmit={this.handleSubmit}>
                        <h4>Name:</h4>
                                <input name="name" type="text" value={this.state.name} placeholder="Full Name" onChange={this.handleInputChange} className="form-control" required />
                        <h4>Banner ID:</h4>
                                <input name="banner" type="text" pattern="\d*" value={this.state.banner} placeholder="000123456" onChange={this.handleInputChange} className="form-control" required />
                        <h4>Phone Number:</h4>
                                <input name="phone" type="text" pattern="\d*" value={this.state.phone} placeholder="3145555555" onChange={this.handleInputChange} className="form-control" required />
                        <h4>Email:</h4>
                                <input name="email" type="text" value={this.state.email} placeholder="first.last@slu.edu" onChange={this.handleInputChange} className="form-control" required />
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
                        <br />
                        <input type = "button" className = "button" value = {this.state.advice} onClick = {this.handleGeolocate} />
                        <br />
                        <br />
                        <div className="map" id = "map"></div>
                        <script type="text/javascript">
                            function codeAddress(){
                            this.initMap()};
                            window.onload = codeAddress;
                        </script>
                        <br />
                        <h4>Dropoff Location:</h4>
                                <select name="dropoffLoc" value={this.state.dropoffLoc} onChange={this.handleInputChange} className="form-control" required>
                                    {this.populateLocations()}
                                </select>
                        <br/>
                        <input type="submit" value="Submit" className="button"/>
                    </form>
							<br/>
					<Link to={"/"} className="button" style={{color: 'white', textDecoration:'none'}}>Back to Home</Link>
				</div>


        );

    }
}


//AddRide.propTypes = Object.assign({}, AddRide.propTypes, geoPropTypes);

//export default AddRide;
export default geolocated()(AddRide);