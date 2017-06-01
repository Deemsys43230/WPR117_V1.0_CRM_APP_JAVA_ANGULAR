var commonApp=angular.module('commonApp',[]);

commonApp.controller('ContactUsController',['$scope',function($scope){
	$scope.policeDepartmentId=$("#departmentId").val();
}]);