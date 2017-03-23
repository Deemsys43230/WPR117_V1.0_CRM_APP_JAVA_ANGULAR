var myApp=angular.module("requestModule",[]);

myApp.factory("requestHandler",['$http',function($http){
    
    var requestObj={};
    var appURL=window.location.origin+"/CRM/";
    
    
    requestObj.getURL=function(){
    	return appURL;
    };

    requestObj.getRequest=function(requestURL,params){

         requestURL=appURL+requestURL;
         return $http.get(requestURL,params).then(function (results) {  
            return results;   
         });
    };

    
    
    requestObj.postFileUpload=function(requestURL,data,params){      
        
        var fd = new FormData();
        fd.append(params, data);
        
         return $http.post(requestURL,fd,{
             transformRequest: angular.identity,
             headers: {'Content-Type': undefined}
         }).then(function (results) {
                return results;
         });
    };
    
	requestObj.postFileUpdate=function(requestURL,data,params,data1,params1,data2,params2){      
	        
	        var fd = new FormData();
	        fd.append(params, data);
	        fd.append(params1, data1);
	        fd.append(params2, data2);
	        
	         return $http.post(requestURL,fd,{
	             transformRequest: angular.identity,
	             headers: {'Content-Type': undefined}
	         }).then(function (results) {
	                return results;
	         });
	    };
	    
	requestObj.postFileWithJson=function(requestURL,data1,param1,data2,param2){
	        var fd = new FormData();
	        fd.append(param1, data1);
	        console.log(new Blob([JSON.stringify(data2)]));
	        fd.append(param2,new Blob([JSON.stringify(data2)], {
	            type: "application/json"
	        }));
	        return $http.post(requestURL,fd,{
	             headers: {'Content-Type': undefined}
	         }).then(function (results) {
	                return results;
	         });
	    };
    
    requestObj.postRequest=function(requestURL,params){ 
        requestURL=appURL+requestURL;
        return $http.post(requestURL,params).then(function (results) {
                return results;
         });
    };
    
    
    requestObj.postExportRequest=function(requestURL,params){
        requestURL=appURL+requestURL;
        return $http({
		    	    url: requestURL,
		    	    method: "POST",
		    	    data: params, //this is your json data string
		    	    headers: {
		    	       'Content-type': 'application/json'
		    	    },
		    	    responseType: 'arraybuffer'
    		}).success(function (results) {
                return results;
         });
    };
    
    
    requestObj.deletePostRequest=function(requestURL,params){
    	 requestURL=appURL+requestURL+params;
    	 return $http({
			  method : "POST",
			  url : requestURL,
			  }).success(function(response){
				 return true;
		});
    };
        
    return requestObj;

}]);
