
//File Upload Directive
angular.module('adminApp').directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
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
angular.module('adminApp').directive('validFile',function(){
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
angular.module('adminApp').directive('validateFileType',function(){
	var validFormats=['pdf'];
	  return {
	    require:'ngModel',
	    link:function(scope,el,attrs,ngModel){
	      el.bind('change',function(){
	    	 var fileSize=el[0].files[0].size;
	    	  var value = el.val(),
              ext = value.substring(value.lastIndexOf('.') + 1).toLowerCase();   
	          ngModel.$validators.validateFileType = function() {
	        	  return validFormats.indexOf(ext) !== -1;
	          };
	          
	          ngModel.$validators.validateFileSize=function(){
	        	  return fileSize<10000000;
	          };
	      });
	    }
	  };
});