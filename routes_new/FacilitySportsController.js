var FacilitySports = require('../models_new/FacilitySportsModel');

var configData = require('../common/config');
var EncryptionService = require('../common/EncryptionService');

var successResponse = configData.successResponse;
var errorResponse = configData.errorResponse;

var router = require('express').Router();


/**
 * @api {POST} /facilitysports Creates new  Sports specific facility ground information
 * @apiName addfacilitySports
 * @apiGroup FacilitySports
 *
 * @apiParam {String} [userid]      User id of the Owner or User.  
 * @apiParam {String} [facilityid]  Facility id of the facility.  
 * @apiParam {String} [sportsid]    Sports id of the Sport.  
 * @apiParam {String} [noofgrounds] total no of grounds related to specific sport
 * @apiParam {String} [bookingtype] Type of Bokking possible on this ground,ex: TOTAL_GROUND, SINGLE_PLAYER
 * @apiParamExample {json} Request-Example:
     {
    	"userid" : "58eaf369d126083c2f8192dd",
    	"facilityid" : "58f903b12fb3dc128c9bdf06",
    	"sportsid" : "58ea69d231021d0d5ad2e52c",
    	"noofgrounds" : "2",
    	"bookingtype" : "TOTAL_GROUND"
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
            "facilityid": "58f903b12fb3dc128c9bdf06",
            "sportsid": "58ea69d231021d0d5ad2e52c",
            "_id": "58f97c0eb4ac2f2398d61a2d",
            "bookingtype": "TOTAL_GROUND",
            "noofgrounds": "2"
          }
        }
 */
router.route('/facilitysports').post(function(req,res){
    var facilityObj = new FacilitySports(req.body);
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
 * @api {PUT} /facilitysports/:id Updates facility sports information by id
 * @apiName updatefacilityspoets
 * @apiGroup FacilitySports
 * 
 * @apiParam {String} [id]  id of the facility sports
 * @apiParam {String} [userid]      User id of the Owner or User.  
 * @apiParam {String} [facilityid]  Facility id of the facility.  
 * @apiParam {String} [sportsid]    Sports id of the Sport.  
 * @apiParam {String} [noofgrounds] total no of grounds related to specific sport
 * @apiParam {String} [bookingtype] Type of Bokking possible on this ground,ex: TOTAL_GROUND, SINGLE_PLAYER
 * @apiParamExample {json} Request-Example:
     {
    	"userid" : "58eaf369d126083c2f8192dd",
    	"facilityid" : "58f903b12fb3dc128c9bdf06",
    	"sportsid" : "58ea69d231021d0d5ad2e52c",
    	"noofgrounds" : "2",
    	"bookingtype" : "TOTAL_GROUND"
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
            "facilityid": "58f903b12fb3dc128c9bdf06",
            "sportsid": "58ea69d231021d0d5ad2e52c",
            "_id": "58f97c0eb4ac2f2398d61a2d",
            "bookingtype": "TOTAL_GROUND",
            "noofgrounds": "2"
          }
        }
 */
 
 router.route('/facilitysports/:id').put(function(req,res){
    FacilitySports.findOne({ _id: req.params.id }, function(err, data) {
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
 * @api {GET} /facilitysports/:id Get Facility Sports information by id
 * @apiName getfacilitysportsbyid
 * @apiGroup FacilitySports
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
              "_id": "58f97c0eb4ac2f2398d61a2d",
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
              "facilityid": {
                "_id": "58f903b12fb3dc128c9bdf06",
                "userid": "58eaf369d126083c2f8192dd",
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
                "sportz": [
                  "58ea69d231021d0d5ad2e52c",
                  "58ea7abaf7e13a1b591cdbc2"
                ],
                "description": "Some description about the facility the could attract the users",
                "title": "KSR Games Corner"
              },
              "sportsid": {
                "_id": "58ea69d231021d0d5ad2e52c",
                "__v": 0,
                "gameicon": "https://image.freepik.com/free-icon/whatsapp-logo_318-49685.jpg",
                "playkits": "For tennis Ball , Rocket and Net etc.",
                "noofgroups": "2",
                "teamsize": "2",
                "facilityrequired": true,
                "game": "Tennis"
              },
              "__v": 0,
              "bookingtype": "TOTAL_GROUND",
              "noofgrounds": "2"
            }
        }
 *
 */
router.route('/facilitysports/:id').get(function(req,res){
    FacilitySports
        .findOne({ _id: req.params.id })
        .populate('userid')
        .populate('facilityid')
        .populate('sportsid')
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
 * @api {DELETE} /facilitysports/:id Delete Facility Sports information by id
 * @apiName deletefacilitysports
 * @apiGroup FacilitySports
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
router.route('/facilitysports/:id').delete(function(req, res) {
    FacilitySports.remove({_id: req.params.id}, function(err, data) {
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
 * @api {GET} /getallfacilitysports Get all facility sports information
 * @apiName getallfacilitysports
 * @apiGroup FacilitySports
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
              "_id": "58f97c0eb4ac2f2398d61a2d",
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
              "facilityid": {
                "_id": "58f903b12fb3dc128c9bdf06",
                "userid": "58eaf369d126083c2f8192dd",
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
                "sportz": [
                  "58ea69d231021d0d5ad2e52c",
                  "58ea7abaf7e13a1b591cdbc2"
                ],
                "description": "Some description about the facility the could attract the users",
                "title": "KSR Games Corner"
              },
              "sportsid": {
                "_id": "58ea69d231021d0d5ad2e52c",
                "__v": 0,
                "gameicon": "https://image.freepik.com/free-icon/whatsapp-logo_318-49685.jpg",
                "playkits": "For tennis Ball , Rocket and Net etc.",
                "noofgroups": "2",
                "teamsize": "2",
                "facilityrequired": true,
                "game": "Tennis"
              },
              "__v": 0,
              "bookingtype": "TOTAL_GROUND",
              "noofgrounds": "2"
            }
          ]
        }
 *
 */
router.route('/getallfacilitysports').get(function(req,res){
    FacilitySports
        .find()
        .populate('userid')
        .populate('facilityid')
        .populate('sportsid')
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
