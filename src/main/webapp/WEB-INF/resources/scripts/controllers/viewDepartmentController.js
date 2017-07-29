
var adminApp = angular.module('adminApp',['flash','requestModule']);
adminApp.controller('ViewDepartmentController',['$rootScope','$scope','$http','requestHandler','Flash','$q',function($rootScope,$scope,$http,requestHandler,Flash,$q){
 
	$scope.viewDepartment=function()
	{
		requestHandler.getRequest("getCurrentUserPoliceDepartment.json","").then(function(response)
		{
			$scope.result=response.data.policeDepartmentForm;
		});
		    	
	};
	
	//get department details
	$scope.viewDepartment();
	
	
}]);	
	