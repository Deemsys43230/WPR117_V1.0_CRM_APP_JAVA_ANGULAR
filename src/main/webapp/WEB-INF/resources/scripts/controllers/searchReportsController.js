/**
 * Created by user on 18/5/16.
 */

var commonApp = angular.module('commonApp',['flash','requestModule']);
commonApp.controller('SearchReportsController',['$rootScope','$scope','$http','requestHandler','$window',function($rootScope,$scope,$http,requestHandler,$window){

	// Get Restriction Status
	$scope.getReportRestrictionStatus=function(){
		requestHandler.getRequest("/getCrashReportRestrictionStatus.json","").then(function(response){
			$scope.isAccessable=response.data.isAccessable;
		});
	};
	
	// Search Crash Reports
	$scope.searchCrashReports=function(){
		if($scope.isAccessable==1){
			if($scope.crashReportSearchForm.crashDate!=""&&$scope.crashReportSearchForm.reportNumber!=""){
				$scope.isCombinationError=false;
			}else if($scope.crashReportSearchForm.crashDate!=""&&$scope.crashReportSearchForm.firstName!=""){
				$scope.isCombinationError=false;
			}else if($scope.crashReportSearchForm.crashDate!=""&&$scope.crashReportSearchForm.lastName!=""){
				$scope.isCombinationError=false;
			}else if($scope.crashReportSearchForm.firstName!=""&&$scope.crashReportSearchForm.lastName!=""){
				$scope.isCombinationError=false;
			}else{
				$scope.isCombinationError=true;
			}
			
			if(!$scope.isCombinationError){
				requestHandler.postRequest("searchCrashReportsAllUser.json",$scope.crashReportSearchForm).then(function(response){
					$scope.totalRecords=response.data.crashReportsResult.totalRecords;
					$scope.crashReportsResultList=response.data.crashReportsResult;
					console.log($scope.crashReportsResultList);
				});
			}
		}
    };
	
    // On Page Change In Pagination
	$scope.onPageChane=function(pageNumber){
    	$scope.crashReportSearchForm.pageNumber=pageNumber;
    	$scope.searchCrashReports();
    };
    
    // No of Records Per Page Change
    $scope.onRecordsPerPageChange=function(){
    	$scope.crashReportSearchForm.pageNumber=1;
		$scope.searchCrashReports();
    };
	
	$scope.viewReport=function(reportNumber,firstName,lastName,location,fileName,reportId){
		//$scope.showResult=true;
		$scope.reportNumber=reportNumber;
		$scope.firstName=firstName;
		$scope.lastName=lastName;
		$scope.location=location;
		$scope.fileName=fileName;
		$scope.reportId=reportId;
		$("#viewReportConfirmationModal").modal('show');
	};
	
	$scope.openReport=function(){
		requestHandler.postRequest("/mergeCrashReportRestriction.json?reportId="+$scope.reportId,"").then(function(response){
			console.log(response);
			if(response.data.reportStatus==1){
				$("#viewReportConfirmationModal").modal('hide');
				$window.open($scope.fileName,"_blank");
				//$window.location=$scope.fileName;
			}else{
				$("#viewReportConfirmationModal").modal('hide');
				alert("Reports Not Available!!! Please search again");
				$scope.crashReportSearchForm.pageNumber=1;
				$scope.searchCrashReports();
			}
		});
	};
	
	$scope.init=function(){

		$scope.totalRecords=0;
		$scope.isAccessable=1;
		$scope.isCombinationError=false;
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
		// Set Max Date
		$('#crashDateSearch').data("DateTimePicker").setMaxDate($rootScope.currentDate);
		// Check Restriction Status
		//$scope.getReportRestrictionStatus();
	};
	
	$scope.init();
}]);