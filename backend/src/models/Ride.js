let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let Ride = new Schema({
    name: {
        type: String
    },
    banner:{
        type: String
    },
    phone:{
        type: String
    },
    email:{
        type: String
    },
    riders:{
        type: String
    },
    pickupLoc:{
        type: String
    },
    dropoffLoc:{
        type: String
    },
    pickupTime:{
        type: String
    },
    dropoffTime: {
        type: String
    },
    received:{
        type: Date
    },
    dispatched:{
        type: String
    },
    status:{
        type: String
    }
},{
    collection: 'rides'
});

module.exports = mongoose.model('Ride', Ride);
