var Sports = require('../models_new/SportsModel');

var configData = require('../common/config');
var EncryptionService = require('../common/EncryptionService');
var UtilityService = require('../common/UtilityService');

var successResponse = configData.successResponse;
var errorResponse = configData.errorResponse;

var router = require('express').Router();


/**
 * @api {POST} /sports Posts Sports information
 * @apiName addsports
 * @apiGroup Sports
 *
 * @apiParam {String} [game]  name of the game.
 * @apiParam {Boolean} [facilityrequired]  facility required for this game or not.
 * @apiParam {String} [teamsize]  Team size needed for the specific game.
 * @apiParam {String} [noofgroups]  Number of teams needed for the game ex: Cricket:2, Tennis:2.
 * @apiParam {String} [playkits]  Items needed for the game ex: Cricket : Bat, Ball, Wickets....
 * @apiParam {String} [gameicon]  Icon/Image for the specific game ex: www.icons.com/test.png
 * 
 * @apiParamExample {json} Request-Example:
 * {
 *	"game" : "Cricket",
 *	"facilityrequired" : true,
 *	"teamsize" : "12",
 *	"noofgroups" : "2",
 *	"playkits" : "For Cricket Ball , Bat and Wickets etc.",
 *	"gameicon" : "https://image.freepik.com/free-icon/whatsapp-logo_318-49685.jpg"
 * }
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
            "_id": "58ea69d231021d0d5ad2e52c",
            "gameicon": "https://image.freepik.com/free-icon/whatsapp-logo_318-49685.jpg",
            "playkits": "For Cricket Ball , Bat and Wickets etc.",
            "noofgroups": "2",
            "teamsize": "12",
            "facilityrequired": true,
            "game": "Cricket"
          }
        }
 */
router.route('/sports').post(function(req,res){
    var sportsObj = new Sports(req.body);
    sportsObj.gameslug = UtilityService.getSlug(sportsObj.game);
    sportsObj.save(function(err,data) {
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
 * @api {PUT} /sports/:id Updates Sports information by id
 * @apiName updatesports
 * @apiGroup Sports
 * @apiParam {String} [id]  id of the game
 * @apiParam {String} [game]  name of the game.
 * @apiParam {Boolean} [facilityrequired]  facility required for this game or not.
 * @apiParam {String} [teamsize]  Team size needed for the specific game.
 * @apiParam {String} [noofgroups]  Number of teams needed for the game ex: Cricket:2, Tennis:2.
 * @apiParam {String} [playkits]  Items needed for the game ex: Cricket : Bat, Ball, Wickets....
 * @apiParam {String} [gameicon]  Icon/Image for the specific game ex: www.icons.com/test.png
 * 
 * @apiParamExample {json} Request-Example:
 * {
 *	"game" : "Cricket",
 *	"facilityrequired" : true,
 *	"teamsize" : "12",
 *	"noofgroups" : "2",
 *	"playkits" : "For Cricket Ball , Bat and Wickets etc.",
 *	"gameicon" : "https://image.freepik.com/free-icon/whatsapp-logo_318-49685.jpg"
 * }
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
            "_id": "58ea69d231021d0d5ad2e52c",
            "gameicon": "https://image.freepik.com/free-icon/whatsapp-logo_318-49685.jpg",
            "playkits": "For Cricket Ball , Bat and Wickets etc.",
            "noofgroups": "2",
            "teamsize": "12",
            "facilityrequired": true,
            "game": "Cricket"
          }
        }
 */
 
 router.route('/sports/:id').put(function(req,res){
    Sports.findOne({ _id: req.params.id }, function(err, data) {
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
 * @api {GET} /sports/:id Get Sports information by id
 * @apiName getsportsbyid
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
            "_id": "58ea69d231021d0d5ad2e52c",
            "gameicon": "https://image.freepik.com/free-icon/whatsapp-logo_318-49685.jpg",
            "playkits": "For Cricket Ball , Bat and Wickets etc.",
            "noofgroups": "2",
            "teamsize": "12",
            "facilityrequired": true,
            "game": "Cricket"
          }
        }
 *
 */
router.route('/sports/:id').get(function(req,res){
    Sports.findOne({ _id: req.params.id }).exec(function(err, eventObj) {
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
 * @api {DELETE} /sports/:id Delete Sports information by id
 * @apiName deletesports
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
          "data": "Data Removed Successfully"
        }
 *
 */
router.route('/sports/:id').delete(function(req, res) {
    Sports.remove({_id: req.params.id}, function(err, data) {
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
 * @api {GET} /sports Get Sports information
 * @apiName getsports
 * @apiGroup Sports
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
              "_id": "58ea69d231021d0d5ad2e52c",
              "__v": 0,
              "gameicon": "https://image.freepik.com/free-icon/whatsapp-logo_318-49685.jpg",
              "playkits": "For Cricket Ball , Bat and Wickets etc.",
              "noofgroups": "2",
              "teamsize": "12",
              "facilityrequired": true,
              "game": "Cricket"
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
          ]
        }
 *
 */
router.route('/sports').get(function(req,res){
    Sports.find().exec(function(err, eventObj) {
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
