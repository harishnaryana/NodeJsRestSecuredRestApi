var Facility = require('../models_new/FacilityModel');

var configData = require('../common/config');
var EncryptionService = require('../common/EncryptionService');
var UtilityService = require('../common/UtilityService');

var successResponse = configData.successResponse;
var errorResponse = configData.errorResponse;

var router = require('express').Router();


/**
 * @api {POST} /facility Posts Sports information
 * @apiName addfacility
 * @apiGroup Facility
 *
 * @apiParam {String} [userid]      User id of the Owner or User.  
 * @apiParam {String} [title]       Title or name of the Facility.
 * @apiParam {String} [description] Description for the Facility.
 * @apiParam {String} [sports]      Array of Sports id's.
 * @apiParam {String} [location]    Location of the facility.
 * @apiParam {String} [lattitude]   Lattitude of the facility.
 * @apiParam {String} [longitude]   Longitude of the facility.
 * @apiParam {String} [email]       email of the facility.
 * @apiParam {String} [phone]       phone of the facility.
 * @apiParam {String} [address]     address of the facility.
 * @apiParam {String} [website]     website of the facility.
 * @apiParam {Date} [createddate]   Date when facility was created
 * @apiParam {String} [images]      Array of image urls ex: www.icons.com/test.png
 * @apiParam {Boolean} [approved]   True or false weather facility approved or not
 * @apiParam {Boolean} [active]     True or false weather facility active or not
 * @apiParamExample {json} Request-Example:
     {
    	"userid" : "58eaf369d126083c2f8192dd",
    	"title" : "KSR Games Corner",
    	"description" : "Some description about the facility the could attract the users",
    	"sports" : ["58ea69d231021d0d5ad2e52c","58ea7abaf7e13a1b591cdbc2"],
    	"location" : "Koti,Hyderabad",
    	"longitude" : "78.486671",
    	"lattitude" : "17.385044",
    	"createddate" : "Thu Apr 20 2017 13:52:19 GMT-0500 (CDT)",
    	"phone" : "122345678",
    	"email" : "test@testfacility.com",
    	"website" : "www.testfacility.com",
    	"address" : "Koti , Hyderabad",
    	"approved" : true,
    	"active" : true
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
            "userid": "58eaf369d126083c2f8192dd",
            "_id": "58f903b12fb3dc128c9bdf06",
            "images": [],
            "active": true,
            "approved": true,
            "address": "Koti , Hyderabad",
            "website": "www.testfacility.com",
            "email": "test@testfacility.com",
            "phone": "122345678",
            "createddate": "2017-04-20T18:52:19.000Z",
            "longitude": "78.486671",
            "lattitude": "17.385044",
            "location": "Koti,Hyderabad",
            "sports": [
              "58ea69d231021d0d5ad2e52c",
              "58ea7abaf7e13a1b591cdbc2"
            ],
            "description": "Some description about the facility the could attract the users",
            "title": "KSR Games Corner"
          }
        }
 */
router.route('/facility').post(function(req,res){
    var facilityObj = new Facility(req.body);
    facilityObj.titleslug = UtilityService.getSlug(facilityObj.title);
    facilityObj.save(function(err,data) {
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
 * @api {PUT} /facility/:id Updates facility information by id
 * @apiName updatefacility
 * @apiGroup Facility
 * @apiParam {String} [id]  id of the game
 * @apiParam {String} [userid]      User id of the Owner or User.  
 * @apiParam {String} [title]       Title or name of the Facility.
 * @apiParam {String} [description] Description for the Facility.
 * @apiParam {String} [sports]      Array of Sports id's.
 * @apiParam {String} [location]    Location of the facility.
 * @apiParam {String} [lattitude]   Lattitude of the facility.
 * @apiParam {String} [longitude]   Longitude of the facility.
 * @apiParam {String} [email]       email of the facility.
 * @apiParam {String} [phone]       phone of the facility.
 * @apiParam {String} [address]     address of the facility.
 * @apiParam {String} [website]     website of the facility.
 * @apiParam {Date} [createddate]   Date when facility was created
 * @apiParam {String} [images]      Array of image urls ex: www.icons.com/test.png
 * @apiParam {Boolean} [approved]   True or false weather facility approved or not
 * @apiParam {Boolean} [active]     True or false weather facility active or not
 * @apiParamExample {json} Request-Example:
     {
    	"userid" : "58eaf369d126083c2f8192dd",
    	"title" : "KSR Games Corner",
    	"description" : "Some description about the facility the could attract the users",
    	"sports" : ["58ea69d231021d0d5ad2e52c","58ea7abaf7e13a1b591cdbc2"],
    	"location" : "Koti,Hyderabad",
    	"longitude" : "78.486671",
    	"lattitude" : "17.385044",
    	"createddate" : "Thu Apr 20 2017 13:52:19 GMT-0500 (CDT)",
    	"phone" : "122345678",
    	"email" : "test@testfacility.com",
    	"website" : "www.testfacility.com",
    	"address" : "Koti , Hyderabad",
    	"approved" : true,
    	"active" : true
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
            "userid": "58eaf369d126083c2f8192dd",
            "_id": "58f903b12fb3dc128c9bdf06",
            "images": [],
            "active": true,
            "approved": true,
            "address": "Koti , Hyderabad",
            "website": "www.testfacility.com",
            "email": "test@testfacility.com",
            "phone": "122345678",
            "createddate": "2017-04-20T18:52:19.000Z",
            "longitude": "78.486671",
            "lattitude": "17.385044",
            "location": "Koti,Hyderabad",
            "sports": [
              "58ea69d231021d0d5ad2e52c",
              "58ea7abaf7e13a1b591cdbc2"
            ],
            "description": "Some description about the facility the could attract the users",
            "title": "KSR Games Corner"
          }
        }
 */
 
 router.route('/facility/:id').put(function(req,res){
    Facility.findOne({ _id: req.params.id }, function(err, data) {
        if(data && !err){
            for(var prop in req.body) {
                data[prop] = req.body[prop];
            }
            
            data.save(function(err,data) {
                if (err) {
                    errorResponse.data = 'Unable to  update';
                    return res.send(EncryptionService.encryptData(JSON.stringify(errorResponse)));  
                }else {
                    successResponse.data = data;
                    res.send(EncryptionService.encryptData(JSON.stringify(successResponse)));    
                }
                
            });
        }else {
            errorResponse.data = 'Unable to update';
            return res.send(EncryptionService.encryptData(JSON.stringify(errorResponse)));  
        }
    });
});


/**
 * @api {GET} /facility/:id Get Sports information by id
 * @apiName getfacilitybyid
 * @apiGroup Facility
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
          "data": 
            {
              "_id": "58f903b12fb3dc128c9bdf06",
              "userid": {
                "_id": "58eaf369d126083c2f8192dd",
                "__v": 0,
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
              },
              "__v": 0,
              "images": [],
              "active": true,
              "approved": true,
              "address": "Koti , Hyderabad",
              "website": "www.testfacility.com",
              "email": "test@testfacility.com",
              "phone": "122345678",
              "createddate": "2017-04-20T18:52:19.000Z",
              "longitude": "78.486671",
              "lattitude": "17.385044",
              "location": "Koti,Hyderabad",
              "sports": [
                {
                  "_id": "58ea69d231021d0d5ad2e52c",
                  "__v": 0,
                  "gameicon": "https://image.freepik.com/free-icon/whatsapp-logo_318-49685.jpg",
                  "playkits": "For tennis Ball , Rocket and Net etc.",
                  "noofgroups": "2",
                  "teamsize": "2",
                  "facilityrequired": true,
                  "game": "Tennis"
                },
                {
                  "_id": "58ea7abaf7e13a1b591cdbc2",
                  "__v": 0,
                  "gameicon": "https://image.freepik.com/free-icon/whatsapp-logo_318-49685.jpg",
                  "playkits": "For tennis Ball , Rocket etc.",
                  "noofgroups": "2",
                  "teamsize": "2",
                  "facilityrequired": true,
                  "game": "Tennis"
                }
              ],
              "description": "Some description about the facility the could attract the users",
              "title": "KSR Games Corner"
            }
        }
 *
 */
router.route('/facility/:id').get(function(req,res){
    Facility
        .findOne({ _id: req.params.id })
        .populate('userid')
        .populate('sports')
        .exec(function(err, eventObj) {
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
 * @api {DELETE} /facility/:id Delete Sports information by id
 * @apiName deletefacility
 * @apiGroup Facility
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
router.route('/facility/:id').delete(function(req, res) {
    Facility.remove({_id: req.params.id}, function(err, data) {
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
 * @api {GET} /getallfacilities Get all facilities information
 * @apiName getallfacilities
 * @apiGroup Facility
 * 
 * 
 * @apiSuccessExample {json} Success-Response:
       HTTP/1.1 200 OK
       {
          "status": {
            "code": 0,
            "msg": "Success"
          },
          "data": [
            {
              "_id": "58f903b12fb3dc128c9bdf06",
              "userid": {
                "_id": "58eaf369d126083c2f8192dd",
                "__v": 0,
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
              },
              "__v": 0,
              "images": [],
              "active": true,
              "approved": true,
              "address": "Koti , Hyderabad",
              "website": "www.testfacility.com",
              "email": "test@testfacility.com",
              "phone": "122345678",
              "createddate": "2017-04-20T18:52:19.000Z",
              "longitude": "78.486671",
              "lattitude": "17.385044",
              "location": "Koti,Hyderabad",
              "sports": [
                {
                  "_id": "58ea69d231021d0d5ad2e52c",
                  "__v": 0,
                  "gameicon": "https://image.freepik.com/free-icon/whatsapp-logo_318-49685.jpg",
                  "playkits": "For tennis Ball , Rocket and Net etc.",
                  "noofgroups": "2",
                  "teamsize": "2",
                  "facilityrequired": true,
                  "game": "Tennis"
                },
                {
                  "_id": "58ea7abaf7e13a1b591cdbc2",
                  "__v": 0,
                  "gameicon": "https://image.freepik.com/free-icon/whatsapp-logo_318-49685.jpg",
                  "playkits": "For tennis Ball , Rocket etc.",
                  "noofgroups": "2",
                  "teamsize": "2",
                  "facilityrequired": true,
                  "game": "Tennis"
                }
              ],
              "description": "Some description about the facility the could attract the users",
              "title": "KSR Games Corner"
            }
          ]
        }
 *
 */
router.route('/getallfacilities').get(function(req,res){
    Facility
        .find()
        .populate('userid')
        .populate('sports')
        .exec(function(err, eventObj) {
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
 * @api {POST} /getfacilitiesbysportsorlocation Get all facilities information by location
 * @apiName getfacilitiesbysportsorlocation
 * @apiGroup Facility
 * @apiParam {String} [sports]  id of the sports for the facility
 * @apiParam {String} [location]  location for the facility
 * @apiParamExample {json} Request-Example:
    {
    	"sports" : "58ea69d231021d0d5ad2e52c",
    	"location" : "Koti, Hyderabad"
    }
 * @apiSuccessExample {json} Success-Response:
       HTTP/1.1 200 OK
       {
          "status": {
            "code": 0,
            "msg": "Success"
          },
          "data": [
            {
              "_id": "58f903b12fb3dc128c9bdf06",
              "userid": {
                "_id": "58eaf369d126083c2f8192dd",
                "__v": 0,
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
              },
              "__v": 0,
              "images": [],
              "active": true,
              "approved": true,
              "address": "Koti , Hyderabad",
              "website": "www.testfacility.com",
              "email": "test@testfacility.com",
              "phone": "122345678",
              "createddate": "2017-04-20T18:52:19.000Z",
              "longitude": "78.486671",
              "lattitude": "17.385044",
              "location": "Koti,Hyderabad",
              "sports": [
                {
                  "_id": "58ea69d231021d0d5ad2e52c",
                  "__v": 0,
                  "gameicon": "https://image.freepik.com/free-icon/whatsapp-logo_318-49685.jpg",
                  "playkits": "For tennis Ball , Rocket and Net etc.",
                  "noofgroups": "2",
                  "teamsize": "2",
                  "facilityrequired": true,
                  "game": "Tennis"
                },
                {
                  "_id": "58ea7abaf7e13a1b591cdbc2",
                  "__v": 0,
                  "gameicon": "https://image.freepik.com/free-icon/whatsapp-logo_318-49685.jpg",
                  "playkits": "For tennis Ball , Rocket etc.",
                  "noofgroups": "2",
                  "teamsize": "2",
                  "facilityrequired": true,
                  "game": "Tennis"
                }
              ],
              "description": "Some description about the facility the could attract the users",
              "title": "KSR Games Corner"
            }
          ]
        }
 *
 */
 
router.route('/getfacilitiesbysportsorlocation').post(function(req,res){
    var location = new RegExp(req.body.location,'i') || '';
    Facility
        .find({sports: { "$in" : [req.body.sports] }, location:location})
        .populate('sports')
        .exec(function(err, eventObj) {
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
 * @api {GET} /getfacilitiesbylocation Get all facilities information by location
 * @apiName getfacilitiesbylocation
 * @apiGroup Facility
 * @apiParam {String} [sports]  id of the sports for the facility
 * @apiParamExample {json} Request-Example:
    {
    	"sports" : "58ea69d231021d0d5ad2e52c"
    }
 * @apiSuccessExample {json} Success-Response:
       HTTP/1.1 200 OK
       {
          "status": {
            "code": 0,
            "msg": "Success"
          },
          "data": [
            {
              "_id": "58f903b12fb3dc128c9bdf06",
              "userid": {
                "_id": "58eaf369d126083c2f8192dd",
                "__v": 0,
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
              },
              "__v": 0,
              "images": [],
              "active": true,
              "approved": true,
              "address": "Koti , Hyderabad",
              "website": "www.testfacility.com",
              "email": "test@testfacility.com",
              "phone": "122345678",
              "createddate": "2017-04-20T18:52:19.000Z",
              "longitude": "78.486671",
              "lattitude": "17.385044",
              "location": "Koti,Hyderabad",
              "sports": [
                {
                  "_id": "58ea69d231021d0d5ad2e52c",
                  "__v": 0,
                  "gameicon": "https://image.freepik.com/free-icon/whatsapp-logo_318-49685.jpg",
                  "playkits": "For tennis Ball , Rocket and Net etc.",
                  "noofgroups": "2",
                  "teamsize": "2",
                  "facilityrequired": true,
                  "game": "Tennis"
                },
                {
                  "_id": "58ea7abaf7e13a1b591cdbc2",
                  "__v": 0,
                  "gameicon": "https://image.freepik.com/free-icon/whatsapp-logo_318-49685.jpg",
                  "playkits": "For tennis Ball , Rocket etc.",
                  "noofgroups": "2",
                  "teamsize": "2",
                  "facilityrequired": true,
                  "game": "Tennis"
                }
              ],
              "description": "Some description about the facility the could attract the users",
              "title": "KSR Games Corner"
            }
          ]
        }
 *
 */
 
router.route('/getfacilitiesbysports').post(function(req,res){
    Facility
        .find({sports: { "$in" : [req.body.sportsid] }})
        .populate('sports')
        .exec(function(err, eventObj) {
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
 * @api {POST} /getfacilitiesbylocation Get all facilities information by location
 * @apiName getfacilitiesbylocation
 * @apiGroup Facility
 * @apiParam {String} [location]  location for the facility
 * @apiParamExample {json} Request-Example:
    {
    	"location" : "Koti,Hyderabad"
    }
 * 
 * @apiSuccessExample {json} Success-Response:
       HTTP/1.1 200 OK
       {
          "status": {
            "code": 0,
            "msg": "Success"
          },
          "data": [
            {
              "_id": "58f903b12fb3dc128c9bdf06",
              "userid": {
                "_id": "58eaf369d126083c2f8192dd",
                "__v": 0,
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
              },
              "__v": 0,
              "images": [],
              "active": true,
              "approved": true,
              "address": "Koti , Hyderabad",
              "website": "www.testfacility.com",
              "email": "test@testfacility.com",
              "phone": "122345678",
              "createddate": "2017-04-20T18:52:19.000Z",
              "longitude": "78.486671",
              "lattitude": "17.385044",
              "location": "Koti,Hyderabad",
              "sports": [
                {
                  "_id": "58ea69d231021d0d5ad2e52c",
                  "__v": 0,
                  "gameicon": "https://image.freepik.com/free-icon/whatsapp-logo_318-49685.jpg",
                  "playkits": "For tennis Ball , Rocket and Net etc.",
                  "noofgroups": "2",
                  "teamsize": "2",
                  "facilityrequired": true,
                  "game": "Tennis"
                },
                {
                  "_id": "58ea7abaf7e13a1b591cdbc2",
                  "__v": 0,
                  "gameicon": "https://image.freepik.com/free-icon/whatsapp-logo_318-49685.jpg",
                  "playkits": "For tennis Ball , Rocket etc.",
                  "noofgroups": "2",
                  "teamsize": "2",
                  "facilityrequired": true,
                  "game": "Tennis"
                }
              ],
              "description": "Some description about the facility the could attract the users",
              "title": "KSR Games Corner"
            }
          ]
        }
 *
 */
router.route('/getfacilitiesbylocation').post(function(req,res){
    var location = new RegExp(req.body.location,'i') || '';
    Facility
        .find({location:location})
        .populate('sports')
        .exec(function(err, eventObj) {
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
