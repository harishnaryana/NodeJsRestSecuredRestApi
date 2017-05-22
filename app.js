var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var http = require('http');
var mongoose = require('mongoose');
var logger = require('morgan');

var configData = require('./common/config');
/*
var user = require('./routes/userCtrl');
var sportz = require('./routes/sportzCtrl');
var facility = require('./routes/facilityCtrl');
var courts = require('./routes/courtsCtrl');
var devicetoken = require('./routes/deviceTokenCtrl');
var bookings = require('./routes/bookingsCtrl');
var reviews = require('./routes/reviewsCtrl');
var otp = require('./routes/otpCtrl');
*/
// New routes

var sportsRoutes = require('./routes_new/SportsController');
var userRoutes = require('./routes_new/UserController');
var facilityRoutes = require('./routes_new/FacilityController');
var facilitySportsRoutes = require('./routes_new/FacilitySportsController');
var amenitiesRoutes = require('./routes_new/AmenitiesController');
var groundRoutes = require('./routes_new/GroundController');
var timeslotsRoutes = require('./routes_new/TimeslotsController');

var app = express(); //Create the Express app

app.use(logger('dev'));

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    
    
    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};


//connect to our database
mongoose.connect(configData.database);

//configure body-parser
app.use(allowCrossDomain);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride());

// Auth Middleware - This will check if the token is valid
// Only the requests that start with /api/v1/* will be checked for the token.
// Any URL's that do not follow the below pattern should be avoided unless you 
// are sure that authentication is not needed

app.all(configData.secureRoutes, [require('./middlewares/validateRequest')]);

console.log("------------------------------------"+configData.routesBasePath);
/*app.use(configData.routesBasePath, user);

app.use(configData.routesBasePath, sportz);

app.use(configData.routesBasePath, facility);

app.use(configData.routesBasePath, courts);

app.use(configData.routesBasePath, devicetoken);

app.use(configData.routesBasePath, bookings);

app.use(configData.routesBasePath, reviews);

app.use(configData.routesBasePath, otp);
*/
// new routes
app.use(configData.routesBasePath, sportsRoutes);

app.use(configData.routesBasePath, userRoutes);

app.use(configData.routesBasePath, facilityRoutes);

app.use(configData.routesBasePath, facilitySportsRoutes);

app.use(configData.routesBasePath, amenitiesRoutes);

app.use(configData.routesBasePath, groundRoutes);

app.use(configData.routesBasePath, timeslotsRoutes);





app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
  console.log('Ezesportz server listening on port ' + server.address().port);
});

module.exports = app;
