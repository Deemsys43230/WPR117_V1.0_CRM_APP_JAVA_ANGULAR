/**
 * Created by user on 18/5/16.
 */

var adminApp = angular.module('adminApp',['flash','requestModule']);


//Add Reports Controller
adminApp.controller('AddReportsController',['$scope','$http','requestHandler',function($scope,$http,requestHandler){
	$scope.report={
			"crashDate":"",
			"reportNumber":"",
			"location":"",
			"fileName":"",
			"occupants":[{"firstname":"","lastname":"","status":1},{"firstname":"","lastname":"","status":1},{"firstname":"","lastname":"","status":1}]
	};
	
	//Add Occupant
	$scope.addOccupant=function(){
		$scope.newOccupant={"firstname":"","lastname":"","status":1};
		$scope.report.occupants.push($scope.newOccupant);
	};
	
	// Remove Occupant
	$scope.removeOccupant=function(index){
		$scope.report.occupants.splice(index,1);
	};
	
	// Save Crash Reports
	$scope.saveCrashReport=function(){
		requestHandler.postFileUpload("User/uploadCrashReports.json",$scope.crashReportFile,"crashReport").then(function(response){
			$scope.report.reportId=response.data.reportId;
			requestHandler.postRequest("User/mergeCrashReports.json",$scope.report).then(function(response){
				console.log(reponse);
			});
		});
	};
}]);

//View Report Controller
adminApp.controller('ViewReportController',['$scope','$http','requestHandler',function($scope,$http,requestHandler){
	
	$scope.getCrashReportsList=function(){
		requestHandler.postRequest("searchCrashReports.json",$scope.crashReportSearchForm).then(function(response){
			$scope.totalRecords=response.data.crashReportsResult.totalRecords;
			$scope.crashReportsResultList=response.data.crashReportsResult;
		});
	};
    
    $scope.$watch("crashReportSearchForm.pageNumber",function(){
		$scope.getCrashReportsList();
	});

	$scope.$watch("crashReportSearchForm.itemsPerPage",function(){
		$scope.crashReportSearchForm.pageNumber=1;
		$scope.getCrashReportsList();
	});
	
    $scope.init=function(){

		$scope.totalRecords=0;
		$scope.crashReportSearchForm={
				"accountId":"1",
				"reportNumber":"",
				"crashDate":"",
				"firstName":"",
				"lastName":"",
				"location":"",
				"pageNumber":1,
				"itemsPerPage":"10",
				"addedDate":"",
		};
		$scope.getCrashReportsList();
	};
	
	$scope.init();
	
	// Reset Search
	$scope.resetSearch=function(){
		$scope.crashReportSearchForm={
				"accountId":"1",
				"reportNumber":"",
				"crashDate":"",
				"firstName":"",
				"lastName":"",
				"location":"",
				"pageNumber":1,
				"itemsPerPage":"10",
				"addedDate":"",
		};
		$scope.getCrashReportsList();
	};
}]);