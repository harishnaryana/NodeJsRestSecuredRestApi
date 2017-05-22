var Ground = require('../models_new/GroundModel');

var configData = require('../common/config');
var EncryptionService = require('../common/EncryptionService');

var successResponse = configData.successResponse;
var errorResponse = configData.errorResponse;

var router = require('express').Router();


/**
 * @api {POST} /addground Creates new  ground to specific facility sports
 * @apiName addground
 * @apiGroup Ground
 *
 * @apiParam {String} [facilitysportsid]   id of the facility sports.  
 * @apiParam {String} [amenities]    List of All amenities ids provided by the ground 
 * @apiParam {String} [unavailable] List of all unavailable dates provided by the owner
 
 * @apiParamExample {json} Request-Example:
     {
    	"facilitysportsid" : "58f97c0eb4ac2f2398d61a2d",
    	"amenities" : ["58fbba2d8f31b421ba0462f0","58fbba458f31b421ba0462f1"],
    	"unavailable" : ["Monday","Tuesday"]
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
            "facilitysportsid": "58f97c0eb4ac2f2398d61a2d",
            "_id": "58fbbfb66229ef24f88abd6f",
            "createddate": "2017-04-22T20:40:19.142Z",
            "unavailable": [
              "Monday",
              "Tuesday"
            ],
            "amenities": [
              "58fbba2d8f31b421ba0462f0",
              "58fbba458f31b421ba0462f1"
            ]
          }
        }
 */
router.route('/ground').post(function(req,res){
    var groundObj = new Ground(req.body);
    groundObj.save(function(err,data) {
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
 * @api {PUT} /ground/:id Updates ground information by id
 * @apiName updateground
 * @apiGroup Ground
 * 
 * @apiParam {String} [facilitysportsid]   id of the facility sports.  
 * @apiParam {String} [amenities]    List of All amenities ids provided by the ground 
 * @apiParam {String} [unavailable] List of all unavailable dates provided by the owner
 
 * @apiParamExample {json} Request-Example:
     {
    	"facilitysportsid" : "58f97c0eb4ac2f2398d61a2d",
    	"amenities" : ["58fbba2d8f31b421ba0462f0","58fbba458f31b421ba0462f1"],
    	"unavailable" : ["Monday","Tuesday"]
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
            "facilitysportsid": "58f97c0eb4ac2f2398d61a2d",
            "_id": "58fbbfb66229ef24f88abd6f",
            "createddate": "2017-04-22T20:40:19.142Z",
            "unavailable": [
              "Monday",
              "Tuesday"
            ],
            "amenities": [
              "58fbba2d8f31b421ba0462f0",
              "58fbba458f31b421ba0462f1"
            ]
          }
        }
 */
 
 router.route('/ground/:id').put(function(req,res){
    Ground.findOne({ _id: req.params.id }, function(err, data) {
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
 * @api {GET} /ground/:id Get Facility Sports information by id
 * @apiName getgroundbyid
 * @apiGroup Ground
 * @apiParam {String} [id]  id of the ground
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
              "_id": "58fbbfb66229ef24f88abd6f",
              "facilitysportsid": {
                "_id": "58f97c0eb4ac2f2398d61a2d",
                "userid": "58eaf369d126083c2f8192dd",
                "facilityid": "58f903b12fb3dc128c9bdf06",
                "sportsid": "58ea69d231021d0d5ad2e52c",
                "__v": 0,
                "bookingtype": "TOTAL_GROUND",
                "noofgrounds": "2"
              },
              "__v": 0,
              "createddate": "2017-04-22T20:40:19.142Z",
              "unavailable": [
                "Monday",
                "Tuesday"
              ],
              "amenities": [
                {
                  "_id": "58fbba2d8f31b421ba0462f0",
                  "__v": 0,
                  "value": "Full_Cover_Nets",
                  "name": "Full Cover Nets"
                },
                {
                  "_id": "58fbba458f31b421ba0462f1",
                  "__v": 0,
                  "value": "Balls_Throwing_Machine",
                  "name": "Balls Throwing Machine"
                }
              ]
            }
        }
 *
 */
router.route('/ground/:id').get(function(req,res){
    Ground
        .findOne({ _id: req.params.id })
        .populate('facilitysportsid')
        .populate('amenities')
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
 * @api {DELETE} /ground/:id Delete Facility Sports information by id
 * @apiName deleteground
 * @apiGroup Ground
 * @apiParam {String} [id]  id of the ground
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
router.route('/ground/:id').delete(function(req, res) {
    Ground.remove({_id: req.params.id}, function(err, data) {
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
 * @api {GET} /getallgrounds Get all facility sports information
 * @apiName getallgrounds
 * @apiGroup Ground
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
              "_id": "58fbbfb66229ef24f88abd6f",
              "facilitysportsid": {
                "_id": "58f97c0eb4ac2f2398d61a2d",
                "userid": "58eaf369d126083c2f8192dd",
                "facilityid": "58f903b12fb3dc128c9bdf06",
                "sportsid": "58ea69d231021d0d5ad2e52c",
                "__v": 0,
                "bookingtype": "TOTAL_GROUND",
                "noofgrounds": "2"
              },
              "__v": 0,
              "createddate": "2017-04-22T20:40:19.142Z",
              "unavailable": [
                "Monday",
                "Tuesday"
              ],
              "amenities": [
                {
                  "_id": "58fbba2d8f31b421ba0462f0",
                  "__v": 0,
                  "value": "Full_Cover_Nets",
                  "name": "Full Cover Nets"
                },
                {
                  "_id": "58fbba458f31b421ba0462f1",
                  "__v": 0,
                  "value": "Balls_Throwing_Machine",
                  "name": "Balls Throwing Machine"
                }
              ]
            }
          ]
        }
 *
 */
router.route('/getallgrounds').get(function(req,res){
    Ground
        .find()
        .populate('amenities')
        .populate('facilitysportsid')
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
