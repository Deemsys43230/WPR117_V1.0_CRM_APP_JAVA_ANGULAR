/**
 * Created by user on 18/5/16.
 */

var commonApp = angular.module('commonApp',['flash','requestModule']);
commonApp.controller('SearchReportsController',['$scope','$http','requestHandler',function($scope,$http,requestHandler){

	$scope.showResult=false;
	$scope.totalRecords=0;
	$scope.crashReportSearchForm={
			"accountId":"0",
			"reportNumber":"",
			"crashDate":"",
			"firstName":"",
			"lastName":"",
			"location":"",
			"pageNumber":1,
			"itemsPerPage":"10",
			"addedDate":"",
	};
	
	$scope.searchCrashReports=function(){
		requestHandler.postRequest("searchCrashReports.json",$scope.crashReportSearchForm).then(function(response){
			$scope.totalRecords=response.data.crashReportsResult.totalRecords;
			$scope.crashReportsResultList=response.data.crashReportsResult;
			console.log($scope.crashReportsResultList);
		});
	};
	
	$scope.$watch("crashReportSearchForm.pageNumber",function(){
		if($scope.crashReportSearchForm.crashDate!="")
		  $scope.searchCrashReports();
	});

	$scope.$watch("crashReportSearchForm.itemsPerPage",function(){
		if($scope.crashReportSearchForm.crashDate!=""){
			$scope.crashReportSearchForm.pageNumber=1;
			$scope.searchCrashReports();
		}
	});
	
}]);