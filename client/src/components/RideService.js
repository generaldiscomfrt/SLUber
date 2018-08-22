import axios from 'axios';
let config = require('../config');
/*
    CLIENT: These are the functions that communicate with the database to update, and send new data. With the ID, it can assign a unique page where one can send live updates.
 */
class RideService{

    sendData(data) {
        axios.post(config.backendURL + '/rides/add/post',{/*adds ride, then returns Mongo ID for ride to AddRide*/
                name: data.name,
                riders: data.riders,
                banner:data.banner,
                phone:data.phone,
                email: data.email,
                pickupLoc: data.pickupLoc,
                dropoffLoc: data.dropoffLoc,
                received: data.received,
                status: data.status
        })
        .then(res => this.setId(res.data._id))
        .catch(err => console.log(err))
    }

    updateData(data, id){/*updates ride in DB*/
        axios.post(config.backendURL + '/rides/update/'+id, {
            name: data.name,
            riders: data.riders,
            banner:data.banner,
            phone:data.phone,
            email: data.email,
            pickupLoc: data.pickupLoc,
            dropoffLoc: data.dropoffLoc,
            pickupTime: data.pickupTime,
            dropoffTime: data.dropoffTime,
            dispatched: data.dispatched,
            status: data.status
        })
        .then(res => this.setState({ rides:res.data}))
        .catch(err => console.log(err))
    }
	
	deleteData(id){/*deletes ride*/
	    axios.get(config.backendURL + '/rides/delete/'+id)
	    .then().catch(err => console.log(err))
	  }

    getCount(){/*gets number of rides in DB. needs to be refined*/
        axios.get(config.backendURL + '/rides/count')
            .then(res => this.setState({count:res.data}))
            .catch(err => console.log(err))
    }
}

export default RideService;
