var User = require('../models/userModel');
var ErrorHandler = require('../models/errorModel');
var passwordHash = require('password-hash');
var jwt = require("jsonwebtoken");
var configData = require('../common/config');
var EncryptionService = require('../common/EncryptionService');
var request = require("request");

var emailExistence = require('email-existence');

var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');


var successResponse = configData.successResponse;
var errorResponse = configData.errorResponse;

var express = require('express');
var router = express.Router();


router.route('/sendemail').get(function(req, res) {
    console.log("inside sendemail");
    
    
    
    // Create a SMTP transport object
    var transport = nodemailer.createTransport("SMTP", {
        host: "ezesportz.com", // hostname
        secureConnection: true, // use SSL
        port: 465, // port for secure SMTP
        auth: {
            user: "admin@ezesportz.com",
            pass: "Shivaram@7"
        }
    });
    
    console.log('SMTP Configured');
    
    // Message object
    var message = {
    
        // sender info
        from: 'Sender Name <admin@ezesportz.com>',
    
        // Comma separated list of recipients
        to: '"Receiver Name" <srinivasarao549@gmail.com>',
    
        // Subject of the message
        subject: 'Nodemailer is unicode friendly ✔', 
    
        // plaintext body
        text: 'Hello to myself!',
    
        // HTML body
        html:'<p><b>Hello</b> to myself <img src="cid:note@node"/></p>'+
             '<p>Here\'s a nyan cat for you as an embedded attachment:<br/></p>'
    };
    
    console.log('Sending Mail');
    transport.sendMail(message, function(error){
      if(error){
          console.log('Error occured');
          console.log(error.message);
          return;
      }
      console.log('Message sent successfully!');
    
      // if you don't want to use this transport object anymore, uncomment following line
      //transport.close(); // close the connection pool
    });
    
    
    /*//var nodemailer = require("nodemailer"),
      var transport = nodemailer.createTransport();
    
    transport.sendMail({
        from: "Fred Foo ✔ <admin@ezesportz.com>", // sender address
        to: "srinivasarao549@gmail.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world ✔", // plaintext body
        html: "<b>Hello world ✔</b>" // html body
    }, console.error);
    */
    
    /*
    
    // create reusable transporter object using the default SMTP transport 
    var transporter = nodemailer.createTransport('smtps://admin%40ezesportz.com:Shivaram@7@smtp.ezesportz.com');
     
    // setup e-mail data with unicode symbols 
    var mailOptions = {
        from: '"Fred Foo 👥" <admin@ezesportz.com>', // sender address 
        to: 'srinivasarao549@gmail.com', // list of receivers 
        subject: 'Hello ✔', // Subject line 
        text: 'Hello world 🐴', // plaintext body 
        html: '<b>Hello world 🐴</b>' // html body 
    };
     
    // send mail with defined transport object 
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });*/

    /*var transporter = nodemailer.createTransport('SMTP',{
        host: 'ezesportz.com',
        port: 25,
        //secure : true,
        auth: {
            user: 'admin@ezesportz.com',
            pass: 'Shivaram@7'
        }
    });
    
    // verify connection configuration 
    transporter.verify(function(error, success) {
       if (error) {
            console.log(error);
       } else {
            console.log('Server is ready to take our messages');
       }
    });
    
    // send mail 
    transporter.sendMail({
        from: 'admin@ezesportz.com',
        to: 'srinivasarao549@gmail.com',
        subject: 'hello world! from nodejs',
        text: 'Authenticated with OAuth2'
    }, function(error, response) {
       if (error) {
            console.log(error);
       } else {
            console.log('Message sent');
       }
       console.log(response);
    });*/
});

/* Start of checking  email exist or not */
router.route('/checkemailexist').post(function(req, res) {
    User.findOne({ email: req.body.email }, function(err, userObj) {
        if(userObj && !err){
            successResponse.data = "Email Address Already Exist";
            res.send(EncryptionService.encryptData(JSON.stringify(successResponse)));    
        }else {
            errorResponse.data = 'Unable to find the user';
            return res.send(EncryptionService.encryptData(JSON.stringify(errorResponse)));  
        }
        
    });
});
/* End of checking  email exist or not */


/* Start of checking  mobile exist or not */
router.route('/checkmobileexist').post(function(req, res) {
    User.findOne({ mobile: req.body.mobile }, function(err, userObj) {
        if(userObj && !err){
            successResponse.data = "Mobile Number Already Exist";
            res.send(EncryptionService.encryptData(JSON.stringify(successResponse)));    
        }else {
            errorResponse.data = 'Unable to find the user';
            return res.send(EncryptionService.encryptData(JSON.stringify(errorResponse)));  
        }
        
    });
});
/* End of checking  mobile exist or not */

/* Start of checking server Status*/
router.route('/checkServer').get(function(req, res) {
    res.sendStatus(200);
});
/* End of checking server Status*/

/* Start : Posting and reading errors to server */
router.route('/posterrors').post(function(req,res){
    var errorObj = new ErrorHandler(req.body);
    errorObj.save(function(err,data) {
        if (data && !err) {
            successResponse.data = data;
            res.send(EncryptionService.encryptData(JSON.stringify(successResponse)));
        }else {
            errorResponse.data = err;
            return res.send(EncryptionService.encryptData(JSON.stringify(errorResponse)));  
        }
        
    });
});

router.route('/geterrors').get(function(req, res) {
    ErrorHandler.find().sort({date: 'desc'}).exec(function(err, errors) {
      if (errors && !err) {
        successResponse.data = errors;
        res.send(EncryptionService.encryptData(JSON.stringify(successResponse)));  
      }else {
        errorResponse.data = 'No errors found';
        return res.send(EncryptionService.encryptData(JSON.stringify(errorResponse)));    
      }
      
    });
});
router.route('/geterrorspagination').get(function(req, res) {
    var perPage = configData.MAX_RECORDS_TO_FETCH
    , page = req.param('page') > 0 ? req.param('page') : configData.MAX_RECORDS_TO_FETCH
    ErrorHandler.find().sort({date: 'desc'}).limit(perPage).skip(perPage * page).exec(function(err, errors) {
      if (errors && !err) {
        successResponse.data = errors;
        res.send(EncryptionService.encryptData(JSON.stringify(successResponse)));  
      }else {
        errorResponse.data = 'No errors found';
        return res.send(EncryptionService.encryptData(JSON.stringify(errorResponse)));    
      }
      
    });
});

/* End : Posting and reading errors to server */



router.route('/register').post(function(req,res){
    req.body.password = passwordHash.generate(req.body.password);    
    var userObj = new User(req.body);
    userObj.save(function(err,data) {
        if (data && !err) {
            successResponse.data = data;
            res.send(EncryptionService.encryptData(JSON.stringify(successResponse)));
        }else {
            errorResponse.data = err;
            return res.send(EncryptionService.encryptData(JSON.stringify(errorResponse)));  
        }
        
    });
});


router.route('/users/login').post(function(req, res) {
    console.log("in login"+req);
   User.findOne({'email':req.body.email},'+password')
		.populate('reviews.giverid')
		.exec(function(err, user) {
      if(user && passwordHash.verify(req.body.password, user.password) && !err){
            var token = jwt.sign(user, configData.secret, {
                expiresInMinutes: 1440 // expires in 24 hours
            });
            successResponse.token = token;
            successResponse.data = user;
            res.send(EncryptionService.encryptData(JSON.stringify(successResponse)));
      }else {
            errorResponse.data = 'User email or  Password are wrong';
            return res.send(EncryptionService.encryptData(JSON.stringify(errorResponse)));  
      }
   });
});


  
router.route('/users').get(function(req, res) {
    User.find()
        .populate('reviews.giverid')
        .exec(function(err, users) {
      if (users && !err) {
        successResponse.data = users;
        res.send(EncryptionService.encryptData(JSON.stringify(successResponse)));  
      }else {
        errorResponse.data = 'No users found';
        return res.send(EncryptionService.encryptData(JSON.stringify(errorResponse)));  
      }
      
    });
});

router.route('/users/:id').get(function(req,res){
    User.findOne({ _id: req.params.id }, function(err, userObj) {
        if(userObj && !err){
            successResponse.data = userObj;
            res.send(EncryptionService.encryptData(JSON.stringify(successResponse)));    
        }else {
            errorResponse.data = 'Unable to find the user';
            return res.send(EncryptionService.encryptData(JSON.stringify(errorResponse)));  
        }
        
    });
});
router.route('/users/:id').put(function(req,res){
    User.findOne({ _id: req.params.id }, function(err, userObj) {
        if(userObj && !err){
            console.log(userObj);
            for(var prop in req.body) {
                if(prop == "password"){
                    req.body.password = passwordHash.generate(req.body.password);
                }
                userObj[prop] = req.body[prop];
            }
            
            // save the Village
            userObj.save(function(err) {
                if (err) {
                    errorResponse.data = 'Unable to  update the user';
                    return res.send(EncryptionService.encryptData(JSON.stringify(errorResponse)));  
                }else {
                    successResponse.data = "User updated Successfully";
                    res.send(EncryptionService.encryptData(JSON.stringify(successResponse)));    
                }
                
            });
        }else {
            errorResponse.data = 'Unable to find the user for update';
            return res.send(EncryptionService.encryptData(JSON.stringify(errorResponse)));  
        }
    });
});

router.route('/users/:id').delete(function(req, res) {
    User.remove({_id: req.params.id}, function(err, userObj) {
        if((userObj) && !err){
            successResponse.data = "User Removed Successfully";
            res.send(EncryptionService.encryptData(JSON.stringify(successResponse)));
        }else {
            errorResponse.data = 'Unable to remove the user';
            return res.send(EncryptionService.encryptData(JSON.stringify(errorResponse)));  
        }
        
    });
});



router.route('/users/reviews/:userid').put(function(req,res){
    User.findOne({ _id: req.params.userid }, function(err, userObj) {
        if(userObj && !err){
            userObj.reviews.push(req.body.reviews[0]);
            userObj.save(function(err) {
                if (err) {
                    errorResponse.data = err;
                    return res.send(EncryptionService.encryptData(JSON.stringify(errorResponse)));  
                }else {
                    successResponse.data = "User review added  Successfully";
                    res.send(EncryptionService.encryptData(JSON.stringify(successResponse)));    
                }
            });
        }else {
            errorResponse.data = 'Unable to find the user for update';
            return res.send(EncryptionService.encryptData(JSON.stringify(errorResponse)));  
        }
    });
});


router.route('/findalladmins').get(function(req,res){
    User.find({ isadmin: true }, function(err, userObj) {
        if(userObj && !err){
            successResponse.data = userObj;
            res.send(EncryptionService.encryptData(JSON.stringify(successResponse)));    
        }else {
            errorResponse.data = 'Unable to find the user';
            return res.send(EncryptionService.encryptData(JSON.stringify(errorResponse)));  
        }
        
    });
});


router.route('/findallrequestforfacilitymanaging').get(function(req,res){
    User.find({ requestforfacilitymanaging: true }, function(err, userObj) {
        if(userObj && !err){
            successResponse.data = userObj;
            res.send(EncryptionService.encryptData(JSON.stringify(successResponse)));    
        }else {
            errorResponse.data = 'Unable to find the user';
            return res.send(EncryptionService.encryptData(JSON.stringify(errorResponse)));  
        }
        
    });
});

router.route('/findallfacilitymanagers').get(function(req,res){
    User.find({ isfacilitymanager: true }, function(err, userObj) {
        if(userObj && !err){
            successResponse.data = userObj;
            res.send(EncryptionService.encryptData(JSON.stringify(successResponse)));    
        }else {
            errorResponse.data = 'Unable to find the user';
            return res.send(EncryptionService.encryptData(JSON.stringify(errorResponse)));  
        }
        
    });
});



router.route('/findallrequestfortournamentsposting').get(function(req,res){
    User.find({ requestfortournamentsposting: true ,rejected:false}, function(err, userObj) {
        if(userObj && !err){
            successResponse.data = userObj;
            res.send(EncryptionService.encryptData(JSON.stringify(successResponse)));    
        }else {
            errorResponse.data = 'Unable to find the user';
            return res.send(EncryptionService.encryptData(JSON.stringify(errorResponse)));  
        }
        
    });
});

router.route('/findalltournamentposters').get(function(req,res){
    User.find({ istournamentsposter: true,rejected:false }, function(err, userObj) {
        if(userObj && !err){
            successResponse.data = userObj;
            res.send(EncryptionService.encryptData(JSON.stringify(successResponse)));    
        }else {
            errorResponse.data = 'Unable to find the user';
            return res.send(EncryptionService.encryptData(JSON.stringify(errorResponse)));  
        }
        
    });
});





router.route('/removeallusers').delete(function(req, res) {
    User.remove({}, function(err, userObj) {
        if((userObj) && !err){
            successResponse.data = "All Users Removed Successfully";
            res.send(EncryptionService.encryptData(JSON.stringify(successResponse)));
        }else {
            errorResponse.data = 'Unable to remove the users';
            return res.send(EncryptionService.encryptData(JSON.stringify(errorResponse)));  
        }
        
    });
});


module.exports = router;
