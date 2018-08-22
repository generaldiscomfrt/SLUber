let express = require('express');
let app = express();
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
let cors = require('cors');
let config = require('./config');
let port = config.expressPort;

mongoose.Promise = require('bluebird');
mongoose.connect(config.mongoURL); /*library for connecting to Mongo*/

let loginRouter = require('./src/routes/loginRouter');
let rideRouter = require('./src/routes/rideRouter');/*Routes specified for ride DB actions*/

app.use(cors()); /*Cross-origin enabled*/
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.use('/rides', rideRouter);
app.use('/logins', loginRouter);

app.listen(port, function(){
    console.log('Server is running on Port: ', port);
});
