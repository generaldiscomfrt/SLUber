let express = require('express');
let app = express();
let rideRouter = express.Router();

let Ride = require('../models/Ride');

rideRouter.route('/add/post').post(function(req,res){
    let ride = new Ride(req.body);
    ride.save()
        .then(ride=> {
            res.json(ride);
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        });
});

rideRouter.route('/').get(function(req,res){
    Ride.find(function(err,rides){
        if(err){
            console.log(err);
        }
        else{
            res.json(rides);
        }
    });
});

rideRouter.route('/status/:status').get(function(req,res){
    Ride.find({
        status: req.params.status
    }, function(err, rides){
        if(err) {
            conosle.log(err);
        }
        else{
            res.json(rides)
        }
    });
});

rideRouter.route('/month/:month').get(function(req,res){
    Ride.find({
        received: req.params.month
    }, function(err, rides){
        if(err) {
            conosle.log(err);
        }
        else{
            res.json(rides)
        }
    });
});

rideRouter.route('/edit/:id').get(function(req,res){
    let id = req.params.id;
    Ride.findById(id, function(err,ride){
        res.json(ride);
    });
});

rideRouter.route('/update/:id').post(function(req,res){
    Ride.findById(req.params.id, function(err, ride){
        if (!ride)
            return next(new Error('Could not load Document'));
        else {
            ride.name = req.body.name;
            ride.riders = req.body.riders;
            ride.banner = req.body.banner;
            ride.phone = req.body.phone;
            ride.email = req.body.email;
            ride.pickupLoc = req.body.pickupLoc;
            ride.dropoffLoc = req.body.dropoffLoc;
            ride.pickupTime = req.body.pickupTime;
            ride.dropoffTime = req.body.dropoffTime;
            ride.dispatched = req.body.dispatched;
            ride.status = req.body.status;

            ride.save().then(ride => {
                res.json('Update complete');
            })
            .catch(err => {
                res.status(400).send("unable to update the database");
            });
        }
    });
});

rideRouter.route('/delete/:id').get(function(req,res) {
    Ride.findByIdAndRemove({_id: req.params.id},
            function(err,ride){
                if(err) res.json(err);
                else res.json('Successfully removed.');
            });
});

rideRouter.route('/count').get(function(req,res) {
    Ride.count(function(err,count){
        if(err) res.json(err);
        else res.json(count);
    })
});

module.exports = rideRouter;
