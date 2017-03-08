/**
 * Created by user on 18/5/16.
 */

var adminApp = angular.module('adminApp',['flash','requestModule']);


//Add Reports Controller
adminApp.controller('AddReportsController',['$scope','$http','requestHandler','$location','Flash',function($scope,$http,requestHandler,$location,Flash){
	$scope.reportSave=false;
	$scope.buttonText="Submit";
	$scope.report={
			"crashDate":"",
			"reportNumber":"",
			"location":"",
			"fileName":"",
			"occupantsForms":[{"firstName":"","lastName":"","status":1},{"firstName":"","lastName":"","status":1},{"firstName":"","lastName":"","status":1}]
	};
	
	//Add Occupant
	$scope.addOccupant=function(){
		$scope.newOccupant={"firstName":"","lastName":"","status":1};
		$scope.report.occupantsForms.push($scope.newOccupant);
	};
	
	// Remove Occupant
	$scope.removeOccupant=function(index){
		$scope.report.occupantsForms.splice(index,1);
	};
	
	// Save Crash Reports
	$scope.saveCrashReport=function(){
		$scope.reportSave=true;
		$scope.buttonText="Submiting....";
		requestHandler.postFileUpdate("User/uploadCrashReports.json",$scope.crashReportFile,"crashReport",$scope.report.reportNumber,"reportNumber").then(function(response){
			$scope.report.reportId=response.data.reportId;
			requestHandler.postRequest("User/mergeCrashReports.json",$scope.report).then(function(response){
				$scope.reportSave=false;
				$scope.buttonText="Submit";
				successMessage(Flash,"Successfully Added");
				$location.path('/reports');
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