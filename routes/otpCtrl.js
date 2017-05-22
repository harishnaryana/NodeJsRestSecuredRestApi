var jwt = require("jsonwebtoken");
var configData = require('../common/config');
var EncryptionService = require('../common/EncryptionService');
var request = require("request");

var successResponse = configData.successResponse;
var errorResponse = configData.errorResponse;

var express = require('express');
var router = express.Router();



router.route('/getsecuritytoken').get(function(req, res) {
    var token = jwt.sign(Math.random(), configData.secret, {
        expiresInMinutes: 1440 // expires in 24 hours
    });
    successResponse.token = token;
    res.send(EncryptionService.encryptData(JSON.stringify(successResponse)));
});

router.route('/verifysecuritytoken/:token').get(function(req, res) {
    
    // check header or url parameters or post parameters for token
	var token = req.params.token;
	
	// decode token
	if (token) {
	    // verifies secret and checks exp
		jwt.verify(token, configData.secret, function(err, decoded) {			
			if (err) {
				errorResponse.data = "Failed to authenticate token."
		        res.send(EncryptionService.encryptData(JSON.stringify(errorResponse)));	
			} else {
				// if everything is good, save to request for use in other routes
				//req.decoded = decoded;	
				 successResponse.data = "Token verified successfully";
				 successResponse.decoded = decoded;
                res.send(EncryptionService.encryptData(JSON.stringify(successResponse)));
			}
		});
	}else {
		// if there is no token
		// return an error
		errorResponse.data = "No token Provided."
		res.send(EncryptionService.encryptData(JSON.stringify(errorResponse)));
	}
    
});

router.route('/sendotp/:mobile/:token').get(function(req, res) {
    var options = { method: 'GET',
      url: configData.OTP_API_BASE_URL+''+configData.OTP_TOKEN+'/SMS/'+req.params.mobile+'/AUTOGEN/'+ configData.OTP_TEMPLATE_NAME };
      
      
      // check header or url parameters or post parameters for token
    	var token = req.params.token;
    	
    	// decode token
    	if (token) {
    	    // verifies secret and checks exp
    		jwt.verify(token, configData.secret, function(err, decoded) {			
    			if (err) {
    				errorResponse.data = "Failed to authenticate token."
    		        res.send(EncryptionService.encryptData(JSON.stringify(errorResponse)));	
    			} else {
    				request(options, function (error, response, body) {
                        if(!error){
                            successResponse.data = JSON.parse(body);
                            res.send(EncryptionService.encryptData(JSON.stringify(successResponse)));
                        }else {
                            errorResponse.data = 'Failed to send OTP';
                            errorResponse.error = error;
                            errorResponse.body = JSON.parse(body);
                            res.send(EncryptionService.encryptData(JSON.stringify(errorResponse)));
                        }
                    });
    			}
    		});
    	}else {
    		// if there is no token
    		// return an error
    		errorResponse.data = "No token Provided."
    		res.send(EncryptionService.encryptData(JSON.stringify(errorResponse)));
    	}
    
    
});

router.route('/verifyotp/:sessionid/:otp/:token').get(function(req, res) {
    var options = { method: 'GET',
      url: configData.OTP_API_BASE_URL+''+configData.OTP_TOKEN+'/SMS/VERIFY/'+req.params.sessionid+'/'+ req.params.otp };
    
    // check header or url parameters or post parameters for token
    	var token = req.params.token;
    	
    	// decode token
    	if (token) {
    	    // verifies secret and checks exp
    		jwt.verify(token, configData.secret, function(err, decoded) {			
    			if (err) {
    				errorResponse.data = "Failed to authenticate token."
    		        res.send(EncryptionService.encryptData(JSON.stringify(errorResponse)));	
    			} else {
    				request(options, function (error, response, body) {
                        if(!error){
                            successResponse.data = JSON.parse(body);
                            res.send(EncryptionService.encryptData(JSON.stringify(successResponse)));
                        }else {
                            errorResponse.data = 'Failed to Verify OTP';
                            errorResponse.error = error;
                            errorResponse.body = JSON.parse(body);
                            res.send(EncryptionService.encryptData(JSON.stringify(errorResponse)));
                        }
                    });
    			}
    		});
    	}else {
    		// if there is no token
    		// return an error
    		errorResponse.data = "No token Provided."
    		res.send(EncryptionService.encryptData(JSON.stringify(errorResponse)));
    	}
    
    
});

module.exports = router;
