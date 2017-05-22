var CryptoJS = require("crypto-js");
var configData = require('../common/config');


module.exports = {
    encryptData : function(data){
        if(configData.ENABLE_ENCRYPTION){
    		var encrypted = CryptoJS.AES.encrypt(data,configData.secret);
            return JSON.stringify(encrypted.toString());
    	}else {
    	    return JSON.parse(data);
    	}
    },
    decryptData : function(data){
        var bytes  = CryptoJS.AES.decrypt(data, configData.secret);
        var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        return decryptedData;
    }
};