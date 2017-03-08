/**
 * Created by user on 18/5/16.
 */

var commonApp = angular.module('commonApp',['flash','requestModule']);
commonApp.controller('SearchReportsController',['$scope','$http','requestHandler','$window',function($scope,$http,requestHandler,$window){

	// Get Restriction Status
	$scope.getReportRestrictionStatus=function(){
		requestHandler.getRequest("/getCrashReportRestrictionStatus.json","").then(function(response){
			$scope.isAccessable=response.data.isAccessable;
		});
	};
	
	$scope.searchCrashReports=function(){
		if($scope.isAccessable==1){
			requestHandler.postRequest("searchCrashReports.json",$scope.crashReportSearchForm).then(function(response){
				$scope.totalRecords=response.data.crashReportsResult.totalRecords;
				$scope.crashReportsResultList=response.data.crashReportsResult;
				console.log($scope.crashReportsResultList);
			});
		}
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
	
	$scope.viewReport=function(reportNumber,firstName,lastName,location,fileName){
		//$scope.showResult=true;
		$scope.reportNumber=reportNumber;
		$scope.firstName=firstName;
		$scope.lastName=lastName;
		$scope.location=location;
		$scope.fileName=fileName;
		$("#viewReportConfirmationModal").modal('show');
	};
	
	$scope.openReport=function(){
		requestHandler.postRequest("/mergeCrashReportRestriction.json","").then(function(response){
			console.log(response);
		});
		$window.location='http://cdn.crashreportsonline.com/crashreports/ec06d021-492e-4b4d-beff-6c6fe7b6a2c0_5956223.pdf';
	};
	
	$scope.init=function(){

		$scope.totalRecords=0;
		$scope.isAccessable=1;
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
		// Check Restriction Status
		$scope.getReportRestrictionStatus();
	};
	
	$scope.init();
}]);