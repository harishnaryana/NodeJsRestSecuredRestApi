var express = require('express');
var router = express.Router();
var jwt = require("jsonwebtoken");
var configData = require('../common/config');
var EncryptionService = require('../common/EncryptionService');

router.use(function(req, res, next) {
	
	if(configData.ENABLE_ENCRYPTION){
		if(!(Object.getOwnPropertyNames(req.body).length === 0)){
			req.body = 	EncryptionService.decryptData(req.body.enc);
		}
	}

	next();
	
	/*// check header or url parameters or post parameters for token
	var token = req.body.token || req.params['token'] || req.headers['x-access-token'];
	
	// decode token
	if (token) {

		// verifies secret and checks exp
		jwt.verify(token, configData.secret, function(err, decoded) {			
			if (err) {
				configData.errorResponse.message = "Failed to authenticate token."
				return res.json(configData.errorResponse);		
			} else {
				// if everything is good, save to request for use in other routes
				req.decoded = decoded;	
				next();
			}
		});

	} else {

		// if there is no token
		// return an error
		configData.errorResponse.message = "No token Provided."
		return res.status(403).send(configData.errorResponse);
		
	}*/
	
});

module.exports = router;