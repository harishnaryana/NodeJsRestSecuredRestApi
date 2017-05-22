var User = require('../models_new/UserModel');

var configData = require('../common/config');

var EncryptionService = require('../common/EncryptionService');

var passwordHash = require('password-hash');
var jwt = require("jsonwebtoken");

var successResponse = configData.successResponse;
var errorResponse = configData.errorResponse;

var router = require('express').Router();

/**
 * @api {POST} /user Registers Admin, general user, Facility manager, Tournament Poster, F & T  , F T G, Inherit into the system
 * @apiName registeruser
 * @apiGroup User
 *
 * @apiParam {String} [email]  Email of the user
 * @apiParam {String} [password]  Password for the account
 * @apiParam {String} [mobile]  Mobile number of the user
 * @apiParam {String} [profilepicture]  Profilepicture of the user
 * @apiParam {String} [displayname]  Nick name or dispaly name of the user
 * @apiParam {String} [gender]  gender of the user
 * @apiParam {String} [status]  Status of the account //// Active/Approved/Onhold/Canceled/Locked/VerificationPending/PendingforApproval/Rejected
 * @apiParam {String} [reason]  Reason for account not active yet // Approved Pending - for approval  In proper behaviour Bad mail id / Password issue / Email not verified
 * @apiParam {Date} [registereddate]  Registerd date of the user, You dont need to set it, system will set it automatically
 * @apiParam {String[]} [inheriteduserid]  List of inherited users for this specific account
 * @apiParam {Boolean} [inherited]  Weather is there any inherited users are there or not
 * @apiParam {String} [usertype]  Type of the user //Admin, general user, Facility manager, Tournament Poster, F & T  , F T G, Inherit
 * @apiParam {Boolean} [emailverified]  Weather email is verified or not
 * 
 * @apiParamExample {json} Request-Example:
     {
    	"email" : "testemail@gmail.com",
    	"password" : "testpassword",
    	"mobile" : "1234567898",
    	"profilepicture" : "",
    	"displayname" : "Test Email",
    	"gender" : "Male",
    	"status" : "VERIFICATION_PENDING",
    	"reason" : "",
    	"registereddate" : "Sun Apr 09 2017 21:50:32 GMT-0500 (CDT)",
    	"inheriteduserid" : [],
    	"inherited" : false,
    	"usertype" : "GENERAl_USER",
    	"emailverified" : false
    }
 *  
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
          "status": {
            "code": 0,
            "msg": "Success"
          },
          "data": {
            "__v": 0,
            "password": "sha1$9d7c5df6$1$0bb93d048b2ea5dc8cd0a1cb35271f007f0a43f3",
            "_id": "58eaf369d126083c2f8192dd",
            "emailverified": false,
            "usertype": "GENERAl_USER",
            "inherited": false,
            "inheriteduserid": [],
            "registereddate": "2017-04-10T02:50:32.000Z",
            "reason": "",
            "status": "VERIFICATION_PENDING",
            "gender": "Male",
            "displayname": "Test Email",
            "profilepicture": "",
            "mobile": "1234567898",
            "email": "testemail@gmail.com"
          }
        }
 */
router.route('/user').post(function(req,res){
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




/**
 * @api {POST} /login Checks users email and password makes user login
 * @apiName userlogin
 * @apiGroup User
 *
 * @apiParam {String} [email]  Email of the user
 * @apiParam {String} [password]  Password for the account
 * 
 * @apiParamExample {json} Request-Example:
     {
    	"email" : "testemail@gmail.com",
    	"password" : "testpassword"
    }
 *  
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
          "status": {
            "code": 0,
            "msg": "Success"
          },
          "data": {
            "__v": 0,
            "password": "sha1$9d7c5df6$1$0bb93d048b2ea5dc8cd0a1cb35271f007f0a43f3",
            "_id": "58eaf369d126083c2f8192dd",
            "emailverified": false,
            "usertype": "GENERAl_USER",
            "inherited": false,
            "inheriteduserid": [],
            "registereddate": "2017-04-10T02:50:32.000Z",
            "reason": "",
            "status": "VERIFICATION_PENDING",
            "gender": "Male",
            "displayname": "Test Email",
            "profilepicture": "",
            "mobile": "1234567898",
            "email": "testemail@gmail.com"
          }
        }
 */
router.route('/login').post(function(req,res){
    User.findOne({'email':req.body.email},'+password')
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



/**
 * @api {PUT} /user/:id Updates user information by id
 * @apiName updateuser
 * @apiGroup User
 * 
 * @apiParam {String} [email]  Email of the user
 * @apiParam {String} [password]  Password for the account
 * @apiParam {String} [mobile]  Mobile number of the user
 * @apiParam {String} [profilepicture]  Profilepicture of the user
 * @apiParam {String} [displayname]  Nick name or dispaly name of the user
 * @apiParam {String} [gender]  gender of the user
 * @apiParam {String} [status]  Status of the account //// Active/Approved/Onhold/Canceled/Locked/VerificationPending/PendingforApproval/Rejected
 * @apiParam {String} [reason]  Reason for account not active yet // Approved Pending - for approval  In proper behaviour Bad mail id / Password issue / Email not verified
 * @apiParam {Date} [registereddate]  Registerd date of the user, You dont need to set it, system will set it automatically
 * @apiParam {String[]} [inheriteduserid]  List of inherited users for this specific account
 * @apiParam {Boolean} [inherited]  Weather is there any inherited users are there or not
 * @apiParam {String} [usertype]  Type of the user //Admin, general user, Facility manager, Tournament Poster, F & T  , F T G, Inherit
 * @apiParam {Boolean} [emailverified]  Weather email is verified or not
 * 
 * @apiParamExample {json} Request-Example:
     {
    	"email" : "testemail@gmail.com",
    	"password" : "testpassword",
    	"mobile" : "1234567898",
    	"profilepicture" : "",
    	"displayname" : "Test Email",
    	"gender" : "Male",
    	"status" : "VERIFICATION_PENDING",
    	"reason" : "",
    	"registereddate" : "Sun Apr 09 2017 21:50:32 GMT-0500 (CDT)",
    	"inheriteduserid" : [],
    	"inherited" : false,
    	"usertype" : "GENERAl_USER",
    	"emailverified" : false
    }
 *  
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
          "status": {
            "code": 0,
            "msg": "Success"
          },
          "data": {
            "__v": 0,
            "password": "sha1$9d7c5df6$1$0bb93d048b2ea5dc8cd0a1cb35271f007f0a43f3",
            "_id": "58eaf369d126083c2f8192dd",
            "emailverified": false,
            "usertype": "GENERAl_USER",
            "inherited": false,
            "inheriteduserid": [],
            "registereddate": "2017-04-10T02:50:32.000Z",
            "reason": "",
            "status": "VERIFICATION_PENDING",
            "gender": "Male",
            "displayname": "Test Email",
            "profilepicture": "",
            "mobile": "1234567898",
            "email": "testemail@gmail.com"
          }
        }
 */
 
 router.route('/user/:id').put(function(req,res){
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
            userObj.save(function(err,data) {
                if (err) {
                    errorResponse.data = 'Unable to  update the user';
                    return res.send(EncryptionService.encryptData(JSON.stringify(errorResponse)));  
                }else {
                    successResponse.data = data;
                    res.send(EncryptionService.encryptData(JSON.stringify(successResponse)));    
                }
                
            });
        }else {
            errorResponse.data = 'Unable to find the user for update';
            return res.send(EncryptionService.encryptData(JSON.stringify(errorResponse)));  
        }
    });
});


/**
 * @api {GET} /user/:id Get User information by id
 * @apiName getuserbyid
 * @apiGroup Sports
 * @apiParam {String} [id]  id of the game
 * 
 * 
 * @apiSuccessExample {json} Success-Response:
       HTTP/1.1 200 OK
       {
          "status": {
            "code": 0,
            "msg": "Success"
          },
          "data": {
            "__v": 0,
            "password": "sha1$9d7c5df6$1$0bb93d048b2ea5dc8cd0a1cb35271f007f0a43f3",
            "_id": "58eaf369d126083c2f8192dd",
            "emailverified": false,
            "usertype": "GENERAl_USER",
            "inherited": false,
            "inheriteduserid": [],
            "registereddate": "2017-04-10T02:50:32.000Z",
            "reason": "",
            "status": "VERIFICATION_PENDING",
            "gender": "Male",
            "displayname": "Test Email",
            "profilepicture": "",
            "mobile": "1234567898",
            "email": "testemail@gmail.com"
          }
        }
 *
 */
router.route('/user/:id').get(function(req,res){
    User.findOne({ _id: req.params.id }).exec(function(err, eventObj) {
        if(eventObj && !err){
            successResponse.data = eventObj;
            res.send(EncryptionService.encryptData(JSON.stringify(successResponse)));    
        }else {
            errorResponse.data = 'Unable to find the data';
            return res.send(EncryptionService.encryptData(JSON.stringify(errorResponse)));
        }
        
    });
});

/**
 * @api {DELETE} /user/:id Delete User information by id
 * @apiName deleteuserbyid
 * @apiGroup User
 * @apiParam {String} [id]  id of the game
 * 
 * 
 * @apiSuccessExample {json} Success-Response:
       HTTP/1.1 200 OK
       {
          "status": {
            "code": 0,
            "msg": "Success"
          },
          "data": "Data Removed Successfully"
        }
 *
 */
router.route('/user/:id').delete(function(req, res) {
    User.remove({_id: req.params.id}, function(err, data) {
        if((data) && !err){
            successResponse.data = "Data Removed Successfully";
            res.send(EncryptionService.encryptData(JSON.stringify(successResponse)));
        }else {
            errorResponse.data = 'Unable to remove the Data';
            return res.send(EncryptionService.encryptData(JSON.stringify(errorResponse)));  
        }
        
    });
});


/**
 * @api {GET} /getallusers Get all users information
 * @apiName getallusers
 * @apiGroup User
 * 
 * 
 * @apiSuccessExample {json} Success-Response:
       HTTP/1.1 200 OK
       {
          "status": {
            "code": 0,
            "msg": "Success"
          },
          "data": {
            "__v": 0,
            "password": "sha1$9d7c5df6$1$0bb93d048b2ea5dc8cd0a1cb35271f007f0a43f3",
            "_id": "58eaf369d126083c2f8192dd",
            "emailverified": false,
            "usertype": "GENERAl_USER",
            "inherited": false,
            "inheriteduserid": [],
            "registereddate": "2017-04-10T02:50:32.000Z",
            "reason": "",
            "status": "VERIFICATION_PENDING",
            "gender": "Male",
            "displayname": "Test Email",
            "profilepicture": "",
            "mobile": "1234567898",
            "email": "testemail@gmail.com"
          }
        }
 *
 */
router.route('/getallusers').get(function(req,res){
    User.find().exec(function(err, eventObj) {
        if(eventObj && !err){
            successResponse.data = eventObj;
            res.send(EncryptionService.encryptData(JSON.stringify(successResponse)));    
        }else {
            errorResponse.data = 'Unable to find the data';
            return res.send(EncryptionService.encryptData(JSON.stringify(errorResponse)));
        }
        
    });
});



module.exports = router;
