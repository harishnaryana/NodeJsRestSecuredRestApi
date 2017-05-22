var constants = require('../common/Constants');
var configData = require('../common/config');
var EncryptionService = require('../common/EncryptionService');

var successResponse = configData.successResponse;
var errorResponse = configData.errorResponse;
var router = require('express').Router();

/**
 * @api {GET} /getconstants Get Ezesports constants
 * @apiName getconstants
 * @apiGroup Constants
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
            "usertypes": {
              "GENERAL_USER": "GENERAL_USER",
              "FACILITY_MANAGER": "FACILITY_MANAGER",
              "TOURNAMENTS_POSTER": "TOURNAMENTS_POSTER",
              "ADMIN": "ADMIN",
              "FT": "FT",
              "FTG": "FTG",
              "INHERITED_USER": "INHERITED_USER"
            },
            "status": {
              "ACTIVE": "ACTIVE",
              "APPROVED": "APPROVED",
              "ONHOLD": "ONHOLD",
              "CANCELLED": "CANCELLED",
              "LOCKED": "LOCKED",
              "VERIFICATION_PENDING": "VERIFICATION_PENDING",
              "PENDING_FOR_APPROVAL": "PENDING_FOR_APPROVAL",
              "REJECTED": "REJECTED"
            }
          }
        }
 *
 */
router.route('/getconstants').get(function(req,res){
    if(constants){
        successResponse.data = constants;
        res.send(EncryptionService.encryptData(JSON.stringify(successResponse)));    
    }else {
        errorResponse.data = 'Unable to find the constants';
        return res.send(EncryptionService.encryptData(JSON.stringify(errorResponse)));
    }
});



module.exports = router;