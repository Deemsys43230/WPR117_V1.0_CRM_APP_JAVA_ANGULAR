
var adminApp = angular.module('adminApp',['flash','requestModule']);
adminApp.controller('ViewDepartmentController',['$rootScope','$scope','$http','requestHandler','Flash','$q',function($rootScope,$scope,$http,requestHandler,Flash,$q){
 
	$scope.viewDepartment=function(id)
	{
  requestHandler.getRequest("/getPoliceDepartment.json?id="+$rootScope.policeDepartmentId).then(function(response)
	{
	$scope.result=response.data.policeDepartmentForm;		
	});
	};
	
	//get department details
	$scope.viewDepartment();
	
	
}]);	
	