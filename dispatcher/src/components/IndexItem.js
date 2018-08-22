import React, {Component} from 'react';
import RideService from './RideService';
import axios from 'axios';
import TableRow from './TableRow';
import {Link} from 'react-router-dom';
import {connect, PromiseState} from 'react-refetch';
import Modal from 'react-modal';
import AddRide from './AddRide';
let config = require('../config');

class IndexItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value:'',
            rides:'',
            modalIsOpen: false,
        };
        this.addRideService = new RideService();
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.toggleModal = this.toggleModal.bind(this)
    }

    tabRow(){
       if(this.props.ridesFetch.value instanceof Array){
           return this.props.ridesFetch.value.map(function (object, i) {
               return <TableRow obj={object} key={i}/>;
           })
       }
    }

    openModal() {
        this.setState({modalIsOpen: true});
    }

    afterOpenModal(){
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    toggleModal(){
        this.setState({modalIsOpen: !this.state.modalIsOpen});
    }

    render() {
       return(
           <div>
           <div className="main-header">
            <img src="/img/dispatcher.png" alt="SLU Ride Dispatcher Console" height="100px" className="main-logo" />
               <div className="view-div">
                <button className="view-button" style={{color: 'white', textDecoration:'none'}}>Change View</button>
               </div>
               <div>
                    <button onClick={this.toggleModal} className="add-button" style={{color: 'white', textDecoration:'none'}}>Add Ride</button>
                   <Modal
                        isOpen={this.state.modalIsOpen}
                        onAfterOpen={this.afterOpenModal}
                        onRequestClose={this.closeModal}
                        contentLabel="Add Ride"
                        className={{
                            base: 'modal-content'
                        }}
                        overlayClassName={{
                            base: 'modal-overlay'
                        }}
                    >
                        <AddRide close={this.closeModal}/>
                    </Modal>
               </div>
           </div>
               <div>
                <table className="rides-table">
                    <thead className="rides-table-header">
                        <tr>
                            <td className="rides-table-cell"><b>Time Received</b></td>
                            <td className="rides-table-cell"><b>Name</b></td>
                            <td className="rides-table-cell"><b># Riders</b></td>
                            <td className="rides-table-cell"><b>Start Location</b></td>
                            <td className="rides-table-cell"><b>End Location</b></td>
                            <td className="rides-table-cell"><b>Pickup Time</b></td>
                            <td className="rides-table-cell"><b>Dropoff Time</b></td>
                            <td className="rides-table-cell"><b>Unit Dispatched</b></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.tabRow()}
                    </tbody>
                </table>
              </div>
           </div>
        );
    }
}

export default connect(props => ({
    ridesFetch: {url:`${config.backendURL}/rides/`, refreshInterval: 5000}
}))(IndexItem)

