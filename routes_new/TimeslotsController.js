var Timeslots = require('../models_new/TimeslotsModel');

var configData = require('../common/config');
var EncryptionService = require('../common/EncryptionService');

var successResponse = configData.successResponse;
var errorResponse = configData.errorResponse;

var router = require('express').Router();


/**
 * @api {POST} /timeslots Posts Sports information
 * @apiName addtimeslots
 * @apiGroup Timeslots
 *
 * @apiParam {String} [groundid] id of the ground to which booking goes to
 * @apiParam {String} [from] From time slot of the ground  ex: 24 hour format
 * @apiParam {String} [to] To time slot of the ground ex: 24 hour format
 * @apiParam {String} [price] price of the ground for that slot
 * @apiParam {String} [players] players allowed for the slot
 * 
 * @apiParamExample {json} Request-Example:
     {
    	"groundid" : "58fbbfb66229ef24f88abd6f",
    	"from" : "5",
    	"to" : "6",
    	"price" : "600",
    	"players" : "1"
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
            "groundid": "58fbbfb66229ef24f88abd6f",
            "_id": "58fbe12da349bf31f462af67",
            "createddate": "2017-04-22T23:00:22.879Z",
            "players": "1",
            "price": "600",
            "to": "6",
            "from": "5"
          }
        }
 */
router.route('/timeslots').post(function(req,res){
    var dataObj = new Timeslots(req.body);
    dataObj.save(function(err,data) {
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
 * @api {PUT} /timeslots/:id Updates Timeslots information by id
 * @apiName updatetimeslots
 * @apiGroup Timeslots
 * 
 * @apiParam {String} [id]  id of the Timeslots
 * @apiParam {String} [groundid] id of the ground to which booking goes to
 * @apiParam {String} [from] From time slot of the ground  ex: 24 hour format
 * @apiParam {String} [to] To time slot of the ground ex: 24 hour format
 * @apiParam {String} [price] price of the ground for that slot
 * @apiParam {String} [players] players allowed for the slot
 * 
 * @apiParamExample {json} Request-Example:
     {
    	"groundid" : "58fbbfb66229ef24f88abd6f",
    	"from" : "5",
    	"to" : "6",
    	"price" : "600",
    	"players" : "1"
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
            "groundid": "58fbbfb66229ef24f88abd6f",
            "_id": "58fbe12da349bf31f462af67",
            "createddate": "2017-04-22T23:00:22.879Z",
            "players": "1",
            "price": "600",
            "to": "6",
            "from": "5"
          }
        }
 */
 
 router.route('/timeslots/:id').put(function(req,res){
    Timeslots.findOne({ _id: req.params.id }, function(err, data) {
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
 * @api {GET} /timeslots/:id Get Sports information by id
 * @apiName gettimeslotsbyid
 * @apiGroup Timeslots
 * @apiParam {String} [id]  id of the Timeslots
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
            "_id": "58f903b12fb3dc128c9bdf06",
            "name": "Bowling Machine",
            "value": "Bowling_Machine"
          }
        }
 *
 */
router.route('/timeslots/:id').get(function(req,res){
    Timeslots
        .findOne({ _id: req.params.id })
        .populate('groundid')
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
 * @api {DELETE} /timeslots/:id Delete timeslots information by id
 * @apiName deletetimeslots
 * @apiGroup Timeslots
 * @apiParam {String} [id]  id of the timeslots
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
router.route('/timeslots/:id').delete(function(req, res) {
    Timeslots.remove({_id: req.params.id}, function(err, data) {
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
 * @api {GET} /getalltimeslots Get all Timeslots information
 * @apiName getalltimeslots
 * @apiGroup Timeslots
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
              "_id": "58fbe12da349bf31f462af67",
              "groundid": {
                "_id": "58fbbfb66229ef24f88abd6f",
                "facilitysportsid": "58f97c0eb4ac2f2398d61a2d",
                "__v": 0,
                "createddate": "2017-04-22T20:40:19.142Z",
                "unavailable": [
                  "Monday",
                  "Tuesday"
                ],
                "amenities": [
                  "58fbba2d8f31b421ba0462f0",
                  "58fbba458f31b421ba0462f1"
                ]
              },
              "__v": 0,
              "createddate": "2017-04-22T23:00:22.879Z",
              "players": "1",
              "price": "600",
              "to": "6",
              "from": "5"
            }
          ]
        }
 *
 */
router.route('/getalltimeslots').get(function(req,res){
    Timeslots
        .find()
        .populate('groundid')
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
