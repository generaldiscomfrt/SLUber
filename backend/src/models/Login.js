let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let Login = new Schema({
    email: {
        type: String
    },
    password:{
        type: String
    }
},{
    collection: 'logins'
});

module.exports = mongoose.model('Login', Login);