//directive for checking availabilty for username

superAdminApp.directive("checkUsername", function ($q, $timeout,requestHandler) {
    var CheckUserExists = function (isNew) {
        if(isNew==0)
            return true;
        else
            return false;
    };
    return {
        restrict: "A",
        require: "ngModel",
        link: function (scope, element, attributes, ngModel) {
            ngModel.$asyncValidators.checkUsername = function (modelValue) {
            	 var defer = $q.defer();
                $timeout(function () {
                    var isNew=0;
                    var sendRequest=requestHandler.postRequest("User/checkUserNameExists.json?username="+modelValue+"&id="+scope.accountId,0).then(function(results){
                        isNew=results.data.isCorrect;
                    });

                    sendRequest.then(function(){

                        if (CheckUserExists(!isNew)){
                            defer.reject();
                        }
                        else{
                            defer.resolve();
                        } 
                    });
                    isNew = false;
                }, 100);

                return defer.promise;
            }
        }
    };

});



//directive for converting null to empty string from select box

superAdminApp.directive('fix', function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, ngModel) {
            ngModel.$parsers.push(function(value) {
                if ( value === null ) {
                    value = '';
                }
                return value;
            });
        }
    };
});


superAdminApp.directive("checkPassword", function ($q, $timeout,requestHandler) {
    var CheckPasswordExists = function (isNew) {
        if(isNew==0)
            return true;
        else
            return false;
    };
    return {
        restrict: "A",
        require: "ngModel",
        link: function (scope, element, attributes, ngModel) {
            ngModel.$asyncValidators.checkPassword = function (modelValue) {
                var defer = $q.defer();
                $timeout(function () {
                    var isNew;
                    var sendRequest=requestHandler.postRequest("/User/checkPassword.json?password="+modelValue,0).then(function(results){
                        isNew=results.data.isCorrect;
                    });

                    sendRequest.then(function(){

                        if (CheckPasswordExists(!isNew)){
                            defer.resolve();
                        }
                        else{
                            defer.reject();
                        } 
                    });
                    isNew = false;
                }, 100);

                return defer.promise;
            }
        }
    };

});


superAdminApp.directive("checkKeyvalue", function ($q, $timeout,requestHandler) {
    var CheckKeyValueExists = function (isNew)
    {
        if(isNew==1)
            return true;
        else
            return false;
    };
    return {
        restrict: "A",
        require: "ngModel",
        link: function (scope, element, attributes, ngModel) {
            ngModel.$asyncValidators.checkKeyvalue = function (modelValue) {
                var defer = $q.defer();
                $timeout(function () {
                    var isNew;
                    
                    if(scope.settingId==undefined)
                	{
                	scope.settingId="";
                	}
                    
                    var sendRequest=requestHandler.postRequest("checkKeyValue.json?settingKey="+modelValue+"&id="+scope.settingId,0).then(function(results)
                    		{
                        isNew=results.data.isCorrect;
                    });

                    sendRequest.then(function(){

                        if (CheckKeyValueExists(!isNew))
                        {
                        		defer.resolve();
                        }
                        else
                        {
                            
                        	defer.reject();
                            
                        } 
                    });
                    isNew = false;
                }, 500);

                return defer.promise;
            }
        }
    };

});










superAdminApp.directive("checkDepartmentname", function ($q, $timeout,requestHandler)
  {
    var CheckDepartmentNameExists = function (isNew) {
        if(isNew==1)
            return true;
        else
            return false;
    };
    return {
        restrict: "A",
        require: "ngModel",
        link: function (scope, element, attributes, ngModel) {
            ngModel.$asyncValidators.checkDepartmentname = function (modelValue) {
                var defer = $q.defer();
                $timeout(function () {
                    var isNew;
                    
                    if(scope.policeDepartmentId==undefined)
                    	{
                    	scope.policeDepartmentId="";
                    	}
                    
                 
                    var sendRequest=requestHandler.postRequest("/checkDepartmentName.json?name="+modelValue+"&id="+scope.policeDepartmentId,0).then(function(results)
                    		{
                    	
                    	
                        isNew=results.data.isCorrect;
                      
                    });

                    sendRequest.then(function(){

                        if (CheckDepartmentNameExists(!isNew)){
                            defer.resolve();
                        }
                        else{
                            defer.reject();
                        } 
                    });
                    isNew = false;
                }, 500);

                return defer.promise;
            }
        }
    };

});


superAdminApp.directive("checkDepartmentcode", function ($q, $timeout,requestHandler)
		  {
var CheckDepartmentCodeExists = function (isNew) {
if(isNew==1)
    return true;
else
    return false;
};
return {
restrict: "A",
require: "ngModel",
link: function (scope, element, attributes, ngModel) {
ngModel.$asyncValidators.checkDepartmentcode = function (modelValue)
{
    var defer = $q.defer();
    $timeout(function () {
        var isNew;
        
        if(scope.policeDepartmentId==undefined)
    	{
    	scope.policeDepartmentId="";
    	}
        
        var sendRequest=requestHandler.postRequest("/checkDepartmentCode.json?code="+modelValue+"&id="+scope.policeDepartmentId,0).then(function(results)
                		{
                    isNew=results.data.isCorrect;
                    
                });

                sendRequest.then(function(){

                    if (CheckDepartmentCodeExists(!isNew)){
                        defer.resolve();
                    }
                    else{
                        defer.reject();
                    } 
                });
                isNew = false;
            }, 500);

            return defer.promise;
        }
    }
};

});



superAdminApp.directive("checkDepartmentlogin", function ($q, $timeout,requestHandler)
		  {
var CheckDepartmentLoginExists = function (isNew) {
    if(isNew==1)
        return true;
    else
        return false;
};
return {
    restrict: "A",
require: "ngModel",
link: function (scope, element, attributes, ngModel) {
    ngModel.$asyncValidators.checkDepartmentlogin = function (modelValue) {
        var defer = $q.defer();
        $timeout(function () {
            var isNew;
            
            if(scope.policeDepartmentId==undefined)
        	{
        	scope.policeDepartmentId="";
        	}
            var sendRequest=requestHandler.postRequest("/checkDepartmentLogin.json?login="+modelValue+"&id="+scope.policeDepartmentId,0).then(function(results)
                    		{
                        isNew=results.data.isCorrect;
                      
                    });

                    sendRequest.then(function(){

                        if (CheckDepartmentLoginExists(!isNew)){
                            defer.resolve();
                        }
                        else{
                            defer.reject();
                        } 
                    });
                    isNew = false;
                }, 500);

                return defer.promise;
            }
        }
    };

});


superAdminApp.directive("checkDepartmentsearch", function ($q, $timeout,requestHandler)
		  {
var CheckDepartmentSearchExists = function (isNew) 
{
  if(isNew==1)
      return true;
  else
      return false;
};
return {
  restrict: "A",
require: "ngModel",
link: function (scope, element, attributes, ngModel) {
  ngModel.$asyncValidators.checkDepartmentsearch = function (modelValue) {
      var defer = $q.defer();
      $timeout(function () {
          var isNew;
          
          if(scope.policeDepartmentId==undefined)
      	{
      	scope.policeDepartmentId="";
      	}
          
          var sendRequest=requestHandler.postRequest("/checkDepartmentSearch.json?search="+modelValue+"&id="+scope.policeDepartmentId,0).then(function(results)
                  		{
                      isNew=results.data.isCorrect;
                    
                  });

                  sendRequest.then(function(){

                      if (CheckDepartmentSearchExists(!isNew)){
                          defer.resolve();
                      }
                      else{
                          defer.reject();
                      } 
                  });
                  isNew = false;
              }, 500);

              return defer.promise;
          }
      }
  };

});


superAdminApp.directive('uppercase', function() {
	return {
	    restrict: "A",
	    require: "ngModel",
	    link: function(scope, element, attrs, ngModel) {

	       
	        ngModel.$parsers.push(function(input) {
	            return input ? input.toUpperCase() : "";
	        });

	       
	        element.css("text-transform","uppercase");
	    }
	};
	});


superAdminApp.directive('lowercase', function() {
	return {
	    restrict: "A",
	    require: "ngModel",
	    link: function(scope, element, attrs, ngModel) {

	       
	        ngModel.$parsers.push(function(input) {
	            return input ? input.toLowerCase() : "";
	        });

	       
	        element.css("text-transform","lowercase");
	    }
	};
	});




superAdminApp.directive('fileModel', ['$parse', function ($parse)
	{
return {
   restrict: 'A',
   link: function(scope, element, attrs) 
   {
     var model = $parse(attrs.fileModel);
      var modelSetter = model.assign;
      element.bind('change', function(){
      scope.$apply(function(){
    	
    	  	modelSetter(scope, element[0].files[0]);
    	    
             });
          });
       }
    };
 }]);




//File Required Validation Directive
superAdminApp.directive('validFile',function(){
	  return {
	    require:'ngModel',
	    link:function(scope,el,attrs,ngModel){
	      el.bind('change',function(){
	        scope.$apply(function(){
	        	 ngModel.$setViewValue(el.val());
		          ngModel.$render(); 
	         });
	       
	      });
	    }
	  };
});

//File Type Validation Directive
superAdminApp.directive('validateFileType',function($q){
	var validFormats=['jpeg','jpg','png'];
	  return {
	    require:'ngModel',
	    link:function(scope,el,attrs,ngModel){
	      el.bind('change',function(){
	    	if(el[0].files.length!=0){
	    		 var fileSize=el[0].files[0].size;
	    		
	    		 
	    		
		    	  var value = el.val(),
	              ext = value.substring(value.lastIndexOf('.') + 1).toLowerCase();   
		    	  
		          ngModel.$validators.validateFileType = function() 
		          {
		        	  return validFormats.indexOf(ext) !== -1;
		          };
		          
		          ngModel.$asyncValidators.validateFileSize=function()
		          {
		        	  var defer=$q.defer();
		        	 var _URL = window.URL || window.webkitURL;
			        	
			        	var file=el[0].files[0];
			        	
			        	 var image=new Image();
			        	 
			        	 image.src= _URL.createObjectURL(file);
			        	 
			        	 image.onload=function()
			        	 {
			        		 if(image.width==1400 && image.height==450)
			        			 {
			        			 	defer.resolve();
			        			 }else{
			        				defer.reject();
			        			 }
			        	 };
		        	 return defer.promise;
		        	
		          };
		          
		         
	          };
   });
	    }
	  };
});

superAdminApp.directive('validateName', function() {
	var NAME_EXPR = /^ *([a-zA-Z]+ ?)+ *$/;
	// var USA_MOB_EXPR_WITH_BR=/^(\([0-9]{3}\)|[0-9]{3}-)[0-9]{3}-[0-9]{4}$/;
	return {
	require : 'ngModel',
	restrict : '',
	link : function(scope, elm, attrs, ngModel) {
		ngModel.$validators.validateName = function(modelValue) {
			if(modelValue!='' && modelValue!=undefined){
				return NAME_EXPR.test(modelValue);
			}else{
				return true;
			}
		};
	}
	};
});

superAdminApp.directive('validateUsername', function() {
	var USER_NAME_EXPR = /^ *([a-zA-Z0-9@_]+ ?)+ *$/;
	return {
	require : 'ngModel',
	restrict : '',
	link : function(scope, elm, attrs, ngModel) {
		ngModel.$validators.validateUsername = function(modelValue) {
			if(modelValue!='' && modelValue!=undefined){
				return USER_NAME_EXPR.test(modelValue);
			}else{
				return true;
			}
		};
	}
	};
});

superAdminApp.directive('validateSearchLink', function() {
	var SEARCH_LINK_EXPR = /^ *([A-Za-z]+[_]{1}search)+ *$/g;
	// var USA_MOB_EXPR_WITH_BR=/^(\([0-9]{3}\)|[0-9]{3}-)[0-9]{3}-[0-9]{4}$/;
	return {
	require : 'ngModel',
	restrict : '',
	link : function(scope, elm, attrs, ngModel) {
		ngModel.$validators.validateSearchLink = function(modelValue) {
			if(modelValue!='' && modelValue!=undefined){
				return SEARCH_LINK_EXPR.test(modelValue);
			}else{
				return true;
			}
		};
	}
	};
});




















