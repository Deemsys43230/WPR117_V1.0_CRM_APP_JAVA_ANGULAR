/**
 * Created by user on 18/5/16.
 */

var adminApp = angular.module('adminApp',['flash','requestModule']);


//Add Reports Controller
adminApp.controller('AddReportsController',['$rootScope','$scope','$http','requestHandler','$location','Flash',function($rootScope,$scope,$http,requestHandler,$location,Flash){
	
	// For Check Report Number Already Exist
	$scope.reportId="";
	
	// Set Max Date
	$('#crashDateAdd').data("DateTimePicker").setMaxDate($rootScope.currentDate);
	
	$scope.occupantListLength=0;
	$scope.isEdit=false;
	$scope.showCancel=true;
	$scope.reportSave=false;
	$scope.buttonText="Submit";
	$scope.title="Add Report";
	$scope.report={
			"crashDate":"",
			"reportNumber":"",
			"location":"",
			"fileName":"",
			"crashSeverity":"",
			"countyId":"",
			"occupantsForms":[{"firstName":"","lastName":"","injuries":"","seatingPosition":"","status":1}]
	};
	
	// Get County List
	$scope.getCountyList=function(){
		requestHandler.getRequest("User/getAllCountys.json","").then(function(response){
				$scope.countyList=response.data.countyForms;
		});
	};
	
	// Get Police Department Details
	$scope.getPoliceDepartment=function(){
		requestHandler.getRequest("/getCurrentUserPoliceDepartment.json","").then(function(response){
			$scope.report.countyId=response.data.policeDepartmentForm.countyId.toString();
		});
	};
	
	// Call get County List
	$scope.getCountyList();
	$scope.getPoliceDepartment();
	
	//Add Occupant
	$scope.addOccupant=function(){
		$scope.newOccupant={"firstName":"","lastName":"","injuries":"","seatingPosition":"","status":1};
		$scope.report.occupantsForms.push($scope.newOccupant);
		console.log($scope.report.occupantsForms);
	};
	
	// Remove Occupant
	$scope.removeOccupant=function(index){

		$scope.report.occupantsForms.splice(index,1);
		console.log($scope.report.occupantsForms);
	};
	
	// Save Crash Reports
	$scope.saveCrashReport=function(){
		$scope.report.isEdit=false;
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
adminApp.controller('EditReportsController',['$rootScope','$scope','$http','requestHandler','$location','Flash','$routeParams',function($rootScope,$scope,$http,requestHandler,$location,Flash,$routeParams){
	
	// For Check Report Number Already Exist
	$scope.reportId=$routeParams.id;
	
	// Set Max Date
	$('#crashDateAdd').data("DateTimePicker").setMaxDate($rootScope.currentDate);
	
	// Get County List
	$scope.getCountyList=function(){
		requestHandler.getRequest("User/getAllCountys.json","").then(function(response){
				$scope.countyList=response.data.countyForms;
		});
	};
	
	// Call get County List
	$scope.getCountyList();
	
	$scope.isEdit=true;
	$scope.showCancel=true;
	$scope.title="Edit Report";
	$scope.reportSave=false;
	$scope.buttonText="Submit";
	
	$scope.getReport=function(){
		requestHandler.getRequest("getCrashReports.json?id="+$scope.reportId,"").then(function(response){
			$scope.report=response.data.crashReportsForm;
			$scope.report.countyId=$scope.report.countyId.toString();
			$scope.report.crashSeverity=$scope.report.crashSeverity.toString();
			$scope.occupantListLength=$scope.report.occupantsForms.length;
		});
	};
	
	$scope.getReport();
	
	//Add Occupant
	$scope.addOccupant=function(){
		$scope.newOccupant={"firstName":"","lastName":"","injuries":"","seatingPosition":"","status":1};
		$scope.report.occupantsForms.push($scope.newOccupant);
		console.log($scope.report.occupantsForms);
	};
	
	// Remove Occupant
	$scope.removeOccupant=function(index){

		$scope.report.occupantsForms.splice(index,1);
		console.log($scope.report.occupantsForms);
	};
	
	$scope.saveCrashReport=function(){
		$scope.report.isEdit=true;
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
	
	// Change File
	$scope.changeFile=function(){
		$scope.isEdit=false;
		$scope.showCancel=false;
		$('#crashReportFile').trigger('click');
	};
	
	// Clear Selected File
	$scope.clearFile = function () {
	    angular.element("input[type='file']").val(null);
	    $scope.crashReportFile="";
	};
}]);

//View Report Controller
adminApp.controller('ViewReportController',['$rootScope','$scope','$http','requestHandler','Flash','$q',function($rootScope,$scope,$http,requestHandler,Flash,$q){
    
	$scope.getCrashReportsList=function(){
		
		if($scope.crashReportSearchForm.addedOnFromDate!=''){
			if($scope.crashReportSearchForm.addedOnToDate==''){
				$scope.addedToDateError=true;
			}else{
				$scope.addedToDateError=false;
			}
		}else{
			$scope.addedToDateError=false;
		}
		
		if(!$scope.addedToDateError){
			$scope.oldPageNumber=$scope.crashReportSearchForm.pageNumber;
			$scope.crashReportSearchForm.pageNumber=1;  // This Will Call Through pageNumber $watch
			if($scope.oldPageNumber==$scope.crashReportSearchForm.pageNumber){
				$scope.searchReportsList($scope.crashReportSearchForm);
				
			}
			// To Avoid Main Search Parameter Override
			angular.copy($scope.crashReportSearchForm,$scope.mainSearchParam);
		}
		
	};
    
	$scope.searchReportsList=function(searchObj){
		var defer=$q.defer();
		requestHandler.postRequest("User/searchCrashReports.json",searchObj).then(function(response){
			$scope.totalRecords=response.data.crashReportsResult.totalRecords;
			$scope.crashReportsResultList=response.data.crashReportsResult;
			$scope.crashReportsResultListOriginal=angular.copy($scope.crashReportsResultList);
			defer.resolve(response);
		});
		return defer.promise;
	};
	
	$scope.secondarySearch=function(){
		
		$scope.oldPageNumber=$scope.crashReportSearchForm.pageNumber;
		$scope.crashReportSearchForm.pageNumber=1;  // This Will Call Through pageNumber $watch
		
		// Set Main SearchParam
    	$scope.mainSearchParam.reportType=$scope.crashReportSearchForm.reportType;
    	$scope.mainSearchParam.verifiedStatus=$scope.crashReportSearchForm.verifiedStatus;
    	$scope.mainSearchParam.pageNumber=$scope.crashReportSearchForm.pageNumber;
    	$scope.mainSearchParam.itemsPerPage=$scope.crashReportSearchForm.itemsPerPage;
    	
		if($scope.oldPageNumber==$scope.crashReportSearchForm.pageNumber){
			// Copy Mainsearchparam to Patient
			angular.copy($scope.mainSearchParam,$scope.crashReportSearchForm);
			return $scope.searchReportsList($scope.crashReportSearchForm);
		}
		
		return null;
	};
	
    $scope.$watch("crashReportSearchForm.pageNumber",function(){
    	$scope.mainSearchParam.pageNumber=$scope.crashReportSearchForm.pageNumber;
    	// Copy Mainsearchparam to Patient
		angular.copy($scope.mainSearchParam,$scope.crashReportSearchForm);
		
    	var promise=$scope.searchReportsList($scope.crashReportSearchForm);
	});

    $scope.itemsPerPageFilterChange=function(){
    	var promise=$scope.secondarySearch();
		if(promise!=null){
			promise.then(function(reponse){
				setTimeout(function(){
					 $('html,body').animate({scrollTop: $('#noOfRows').offset().top},'slow');
				},1000);
			});
		}
    };
	
	
    $scope.init=function(){
    	$scope.addedToDateError=false;
    	$scope.crashReportsResultListOriginal=[];
    	$scope.deleteText="Yes";
    	$scope.isDeleting=false;
		$scope.totalRecords=0;
		// Main Search Param
		$scope.mainSearchParam={};
		$scope.crashReportSearchForm={
				"accountId":"0",
				"reportNumber":"",
				"crashDate":"",
				"firstName":"",
				"lastName":"",
				"location":"",
				"addedOnFromDate":"",
				"addedOnToDate":"",
				"pageNumber":1,
				"itemsPerPage":"10",
				"searchType":1,
				"reportType":1
		};
		
		console.log($scope.crashReportSearchForm);
		// Set Max Date
		$('#crashDateReportList').data("DateTimePicker").setMaxDate($rootScope.currentDate);
		$('#addedOnFromDate').data("DateTimePicker").setMaxDate($rootScope.currentDate);
		$('#addedOnToDate').data("DateTimePicker").setMaxDate($rootScope.currentDate);
		
		$scope.oldPageNumber= $scope.crashReportSearchForm.pageNumber;
		if($scope.oldPageNumber==$scope.crashReportSearchForm.pageNumber){
			// To Avoid Main Search Parameter Override
			angular.copy($scope.crashReportSearchForm,$scope.mainSearchParam);
			$scope.searchReportsList($scope.crashReportSearchForm);
		}
		
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
	
	// Reset Added On To Date
	$scope.resetToDate=function(){
		if($scope.crashReportSearchForm.addedOnToDate<$scope.crashReportSearchForm.addedOnFromDate){
			$scope.crashReportSearchForm.addedOnToDate="";
		}
	};
	
	// Report Details on Modal
	$scope.getReport=function(reportId){
		requestHandler.getRequest("getCrashReports.json?id="+reportId,"").then(function(response){
			$scope.reportDetails=response.data.crashReportsForm;
			$("#viewReportDetailsModal").modal('show');
		});
	};
	
	// Reset Search
	$scope.resetSearch=function(){
		$scope.init();
	};
}]);