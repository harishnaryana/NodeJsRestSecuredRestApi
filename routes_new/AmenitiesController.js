var Amenities = require('../models_new/AmenitiesModel');

var configData = require('../common/config');
var EncryptionService = require('../common/EncryptionService');
var UtilityService = require('../common/UtilityService');

var successResponse = configData.successResponse;
var errorResponse = configData.errorResponse;

var router = require('express').Router();


/**
 * @api {POST} /amenities Posts Sports information
 * @apiName addamenities
 * @apiGroup Amenities
 *
 * @apiParam {String} [name]      name or title for the Amenities. ex: Bowling Machine
 *
 * @apiParamExample {json} Request-Example:
     {
    	"name" : "Bowling Machine"
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
            "_id": "58f903b12fb3dc128c9bdf06",
            "name": "Bowling Machine",
            "value": "Bowling_Machine"
          }
        }
 */
router.route('/amenities').post(function(req,res){
    var amenitiesObj = new Amenities(req.body);
    amenitiesObj.value = UtilityService.getSlug(amenitiesObj.name);
    amenitiesObj.save(function(err,data) {
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
 * @api {PUT} /amenities/:id Updates amenities information by id
 * @apiName updateamenities
 * @apiGroup Amenities
 * @apiParam {String} [id]  id of the amenities
 * @apiParam {String} [name]      name or title for the Amenities. ex: Bowling Machine
 *
 * @apiParamExample {json} Request-Example:
     {
    	"name" : "Bowling Machine"
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
            "_id": "58f903b12fb3dc128c9bdf06",
            "name": "Bowling Machine",
            "value": "Bowling_Machine"
          }
        }
 */
 
 router.route('/amenities/:id').put(function(req,res){
    Amenities.findOne({ _id: req.params.id }, function(err, data) {
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
 * @api {GET} /amenities/:id Get Sports information by id
 * @apiName getamenitiesbyid
 * @apiGroup Amenities
 * @apiParam {String} [id]  id of the amenities
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
router.route('/amenities/:id').get(function(req,res){
    Amenities
        .findOne({ _id: req.params.id })
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
 * @api {DELETE} /amenities/:id Delete amenities information by id
 * @apiName deleteamenities
 * @apiGroup Amenities
 * @apiParam {String} [id]  id of the amenities
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
router.route('/amenities/:id').delete(function(req, res) {
    Amenities.remove({_id: req.params.id}, function(err, data) {
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
 * @api {GET} /getallamenities Get all amenities information
 * @apiName getallamenities
 * @apiGroup Amenities
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
 *
 */
router.route('/getallamenities').get(function(req,res){
    Amenities
        .find()
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
