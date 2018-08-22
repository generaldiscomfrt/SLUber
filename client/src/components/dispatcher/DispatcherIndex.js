import React, {Component} from 'react';
import RideService from './RideService';
import TableRow from './TableRow';
import {connect} from 'react-refetch';
import Modal from 'react-modal';
import AddRide from './AddRide';
let config = require('../../config');

class DispatcherIndex extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value:'',
            rides:'',
            modalIsOpen: false,
        };
        this.addRideService = new RideService();
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.toggleModal = this.toggleModal.bind(this)
    }

    tabRow(){ /*Maps all rides from database to a TableRow object (TableRow.js)*/
       if(this.props.ridesFetch.value instanceof Array){
           return this.props.ridesFetch.value.map(function (object, i) {
               return <TableRow obj={object} key={i}/>;
           })
       }
    }

    /*functions used by Modal npm module to track state of open/close*/
    openModal() {
        this.setState({modalIsOpen: true});
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

               <div>
                    <button onClick={this.toggleModal} className="add-button" style={{color: 'white', textDecoration:'none'}}>Add Ride</button>
                   <Modal
                        isOpen={this.state.modalIsOpen}
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
                            <td className="rides-table-cell"><b>Status</b></td>
                            <td className="rides-table-cell"><b>Time Received</b></td>
                            <td className="rides-table-cell"><b>Name</b></td>
                            <td className="rides-table-cell"><b># Riders</b></td>
                            <td className="rides-table-cell"><b>Start Location</b></td>
                            <td className="rides-table-cell"><b>End Location</b></td>
                            <td className="rides-table-cell"><b>Pickup Time</b></td>
                            <td className="rides-table-cell"><b>Dropoff Time</b></td>
                            <td className="rides-table-cell"><b>Unit Dispatched</b></td>
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

export default connect(props => ({/*Refreshes data every 1000 ms (1s), higher than this results in occasional errors*/
    ridesFetch: {url:`${config.backendURL}/rides/`, refreshInterval: 1000}
}))(DispatcherIndex)

