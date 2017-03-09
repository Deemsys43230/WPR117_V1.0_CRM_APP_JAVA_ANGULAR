/**
 * Created by user on 18/5/16.
 */

var adminApp = angular.module('adminApp',['flash','requestModule']);


//Add Reports Controller
adminApp.controller('AddReportsController',['$scope','$http','requestHandler','$location','Flash',function($scope,$http,requestHandler,$location,Flash){
	
	// For Check Report Number Already Exist
	$scope.reportId="";
	
	$scope.isEdit=false;
	$scope.showCancel=true;
	$scope.reportSave=false;
	$scope.buttonText="Submit";
	$scope.title="Add Reports";
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
		requestHandler.postFileUpdate("User/uploadCrashReports.json",$scope.crashReportFile,"crashReport",$scope.report.reportNumber,"reportNumber","","reportId").then(function(response){
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

// Edit Report Controller
adminApp.controller('EditReportsController',['$scope','$http','requestHandler','$location','Flash','$routeParams',function($scope,$http,requestHandler,$location,Flash,$routeParams){
	
	// For Check Report Number Already Exist
	$scope.reportId=$routeParams.id;
	
	$scope.isEdit=true;
	$scope.showCancel=true;
	$scope.title="Edit Reports";
	$scope.reportSave=false;
	$scope.buttonText="Submit";
	
	$scope.getReport=function(){
		requestHandler.getRequest("getCrashReports.json?id="+$scope.reportId,"").then(function(response){
			$scope.report=response.data.crashReportsForm;
		});
	};
	
	$scope.getReport();
	
	//Add Occupant
	$scope.addOccupant=function(){
		$scope.newOccupant={"firstName":"","lastName":"","status":1};
		$scope.report.occupantsForms.push($scope.newOccupant);
	};
	
	// Remove Occupant
	$scope.removeOccupant=function(index){
		$scope.report.occupantsForms.splice(index,1);
	};
	
	$scope.saveCrashReport=function(){
		$scope.reportSave=true;
		$scope.buttonText="Submiting....";
		if($scope.isEdit){
			requestHandler.postRequest("User/mergeCrashReports.json",$scope.report).then(function(response){
				$scope.reportSave=false;
				$scope.buttonText="Submit";
				successMessage(Flash,"Successfully Updated");
				$location.path('/reports');
			});
		}else{
			requestHandler.postFileUpdate("User/uploadCrashReports.json",$scope.crashReportFile,"crashReport",$scope.report.reportNumber,"reportNumber",$scope.report.reportId,"reportId").then(function(response){
				$scope.report.reportId=response.data.reportId;
				requestHandler.postRequest("User/mergeCrashReports.json",$scope.report).then(function(response){
					$scope.reportSave=false;
					$scope.buttonText="Submit";
					successMessage(Flash,"Successfully Updated");
					$location.path('/reports');
				});
			});
		}
	};
	
	// Clear Selected File
	$scope.clearFile = function () {
	    angular.element("input[type='file']").val(null);
	    $scope.crashReportFile="";
	};
}]);

//View Report Controller
adminApp.controller('ViewReportController',['$scope','$http','requestHandler',function($scope,$http,requestHandler){
	
	$scope.getCrashReportsList=function(){
		requestHandler.postRequest("User/searchCrashReports.json",$scope.crashReportSearchForm).then(function(response){
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
    	$scope.deleteText="Yes";
    	$scope.isDeleting=false;
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
		$scope.getCrashReportsList();
	};
	
	$scope.init();
	
	// Delete Report
	$scope.deleteReport=function(){
		$scope.deleteText="Deleting...";
		$scope.isDeleting=true;
		
		requestHandler.deletePostRequest("User/deleteCrashReports.json?id=",$scope.reportId).then(function(response){
			$scope.isDeleting=false;
			$scope.deletText="Yes";
			$("#deleteReportModal").modal('hide');
			successMessage(Flash,"Successfully Deleted");
			$scope.getCrashReportsList();
		});
	};
	
	$scope.deleteReportModal=function(reportId){
		$scope.reportId=reportId;
		$("#deleteReportModal").modal('show');
	};
	
	// Reset Search
	$scope.resetSearch=function(){
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
		$scope.getCrashReportsList();
	};
}]);