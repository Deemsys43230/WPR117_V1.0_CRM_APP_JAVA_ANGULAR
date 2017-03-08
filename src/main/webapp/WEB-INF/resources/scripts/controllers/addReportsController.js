/**
 * Created by user on 18/5/16.
 */

var adminApp = angular.module('adminApp',['flash','requestModule']);
adminApp.controller('AddReportsController',['$scope','$http',function($scope,$http){
	$scope.report={
			"crashDate":"",
			"reportNumber":"",
			"location":"",
			"uploadReportFilePath":"",
			"occupants":[{"firstname":"","lastname":"","isRemoved":0},{"firstname":"","lastname":"","isRemoved":0},{"firstname":"","lastname":"","isRemoved":0}]
	};
	
	//Add Occupant
	$scope.addOccupant=function(){
		$scope.newOccupant={"firstname":"","lastname":"","isRemoved":0};
		$scope.report.occupants.push($scope.newOccupant);
	};
	
}]);