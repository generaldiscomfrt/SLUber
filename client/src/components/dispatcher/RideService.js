import axios from 'axios';
let config = require('../../config');

class RideService{

    sendData(data) { /*add ride to database*/
        axios.post(config.backendURL + '/rides/add/post',{
                name:data.name,
                riders: data.riders,
                banner:data.banner,
                phone:data.phone,
                email: data.email,
                pickupLoc: data.pickupLoc,
                dropoffLoc: data.dropoffLoc,
                received: data.received,
                status: data.status
        })
        .then(res => this.setState({rides: res.data}))
        .catch(err => console.log(err))
    }

    updateData(data, id){/*update existing ride in the database*/
        axios.post(config.backendURL + '/rides/update/'+id, {
            name:data.name,
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
        .then(res => this.setState({rides:res.data}))
        .catch(err => console.log(err))
    }
	
	deleteData(id){/*delete existing ride*/
	    axios.get(config.backendURL + '/rides/delete/'+id)
	    .then().catch(err => console.log(err))
	  }
}

export default RideService;
