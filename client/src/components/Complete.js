import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect, PromiseState} from 'react-refetch';
import RideService from './RideService';
let config = require('../config');

/*
    This is the component that the user sees when the user finishes requesting their ride. This updates as the dispatcher changes status.
 */
class Complete extends Component {

    constructor(props){
        super(props);
        this.state={};
        this.getStatus = this.getStatus.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.rideButtons = this.rideButtons.bind(this);
        this.addRideService = new RideService();
    }

    getStatus(){ /*Checks current status of ride in DB using passed in ID and returns a message*/
        let numRides = parseInt(this.props.rideCount.value) - 1;

        if(this.props.rideFetch.value instanceof Object)
        {
            if(this.props.rideFetch.value.status === 'Active'){
                if(numRides !== 1) {
                    return (
                        <h4>Your ride is waiting to be dispatched.<br/><br/>There are currently {numRides.toString()} rides ahead of you.</h4>
                    );
                }
                else{
                    return (<h4>Your ride is waiting to be dispatched.<br/><br/>There is currently {numRides.toString()} ride ahead of you.</h4>)
                }
            }
            else if(this.props.rideFetch.value.status === 'Dispatched'){
                return(
                    <h4>Hooray! Your ride is on its way!
                    <br/><br/>Please wait outside at
                    <br/><br/>{this.props.rideFetch.value.pickupLoc}.</h4>
                )
            }
            else if(this.props.rideFetch.value.status === 'In Progress'){
                return(
                    <h4>Your ride is currently in progress.
                        <br/><br/>You will be dropped off at
                        <br/><br/>{this.props.rideFetch.value.dropoffLoc}.</h4>
                )
            }
            else if(this.props.rideFetch.value.status === 'Complete'){
                return(
                    <h4>Your ride has been completed.
                        <br/><br/>Thanks for using SLU Ride!</h4>
                )
            }
            else{
                return(
                    <h4>Could not determine ride status. This ride may have been deleted.</h4>
                );
            }
        }
        else{
            return(
                <h4>Could not determine ride status.<br /><br />This ride may have been deleted.</h4>
            );
        }
    }

    handleDelete(event) {/*Confirms ride deletion before deleting*/
        event.preventDefault();
        let del = window.confirm("Are you sure you want to delete your ride?");
        if(del){
            this.addRideService.deleteData(this.props.match.params.id);
            this.props.history.push('/');
        }
    }

    rideButtons(){/*Only gives user option to edit/delete if their ride hasn't been dispatched yet*/
        if(this.props.rideFetch.value instanceof Object && this.props.rideFetch.value.status === 'Active'){
            return(
                <div>
                    <Link to={"/edit/" + this.props.match.params.id} className="button" style={{color: 'white', textDecoration:'none'}}>Edit Your Ride</Link>
                    <button onClick={this.handleDelete} className="client-delete-button" style={{color: 'white', textDecoration:'none'}}>Delete Your Ride</button><br /> <br />
                </div>
            )
        }
    }

    render() {
        console.log(this.props.rideFetch);
        return(
            <div className="main-content">
                <img src="/img/logo.png" alt="SLU Ride" height="100px" className="logo" />
                <h3 className="request-header">Thanks for requesting a ride!</h3><br />
                {this.getStatus()}
                <div className='btn-area'>
                    {this.rideButtons()}
                    <Link to={"/"} className="button" style={{color: 'white', textDecoration:'none'}}>Back to Home</Link> <br /><br />
                </div>
            </div>
        )
    }

}

export default connect(props => ({/*Refreshes data every 1000ms (1s). Higher than this causes issues*/
    rideFetch: {url:`${config.backendURL}/rides/edit/${props.match.params.id}`, refreshInterval: 1000},
    rideCount: {url:`${config.backendURL}/rides/count`, refreshInterval: 1000}
}))(Complete)