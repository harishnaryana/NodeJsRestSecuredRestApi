var routesBasePath = "/api/v1";
module.exports = {
    //"database" : "mongodb://testuser:testpassword@ds045242.mongolab.com:45242/testuser",
    // "database" : "mongodb://heydude:heydudepassword@ds041603.mongolab.com:41603/heydude",
    //"database" : "mongodb://letsgroup_user:letsgroup_pwd@ds021299.mlab.com:21299/letsgroup",
    // "database" : "mongodb://ezesportz-admin:Shivaram71111@ds021751.mlab.com:21751/ezesportz", // Demo server
     "database" : "mongodb://ezesportzadmin12121:ezesportzadmin212@ds155820.mlab.com:55820/ezesportz", // new  Demo server
    
    
    
    // Site : Mongolabs   id : letsgroup777   pwd : Shivaram@7
    "secret" : "This is highly confidential",
    "MAX_RECORDS_TO_FETCH" : 5,
    "ENABLE_ENCRYPTION" : false,
    "USE_SECURITY_TOKEN" : false,
    "OTP_TOKEN" : '8e1723236ba6-702d-11e6-a8cd-0016234233ef91450',
    "OTP_API_BASE_URL" : 'http://2factor.in/API/V1/',
    "OTP_TEMPLATE_NAME" : "main",
    "routesBasePath" : routesBasePath,
    "secureRoutes" : [
       
    ],
    "successResponse" : {
    	"status": {
            "code": 0,
            "msg": "Success"
        }
    },
    "errorResponse" : {
    	"status": {
            "code": -1,
            "msg": "Error"
        }
    },
    
    plusOneDay : function(date){
      var todayDate = new Date(date);
      todayDate.setDate(todayDate.getDate()+1); 
      todayDate = todayDate.toLocaleDateString();
      return todayDate;
    },
    
    lessOneDay : function (date){
      var todayDate = new Date(date);
      todayDate.setDate(todayDate.getDate() - 1); 
      todayDate = todayDate.toLocaleDateString();
      return todayDate;
    },
    
    formatDate : function (date){
      var todayDate = new Date(date);
      todayDate.setDate(todayDate.getDate()); 
      todayDate = todayDate.toLocaleDateString();
      return todayDate;
    }

};