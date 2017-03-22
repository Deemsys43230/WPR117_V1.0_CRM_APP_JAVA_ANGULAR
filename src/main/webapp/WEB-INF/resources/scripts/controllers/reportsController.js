/**
 * Created by user on 18/5/16.
 */

var adminApp = angular.module('adminApp',['flash','requestModule']);


//Add Reports Controller
adminApp.controller('AddReportsController',['$rootScope','$scope','$http','requestHandler','$location','Flash',function($rootScope,$scope,$http,requestHandler,$location,Flash){
	
	// For Check Report Number Already Exist
	$scope.reportId="";
	
	
	$scope.occupantListLength=0;
	$scope.isEdit=false;
	$scope.showCancel=true;
	$scope.reportSave=false;
	$scope.buttonText="Submit";
	$scope.title="Add Report";
	$scope.reports=[{
			"id": 'Report-1',
	        "header": 'Report 1',
	        "isExpanded": true,
			"crashDate":"",
			"reportNumber":"",
			"location":"",
			"crashSeverity":"0",
			"fileName":"",
			"occupantsForms":[{"firstName":"","lastName":"","address":"","phoneNumber":"","atFaultInsuranceCompany":"","victimInsuranceCompany":"","status":1}]
			},{
			"id": 'Report-2',
		    "header": 'Report 2',
			"crashDate":"",
			"reportNumber":"",
			"location":"",
			"crashSeverity":"0",
			"fileName":"",
			"occupantsForms":[{"firstName":"","lastName":"","address":"","phoneNumber":"","atFaultInsuranceCompany":"","victimInsuranceCompany":"","status":1}]
		 }];
	
	// Get County List
	$scope.getCountyList=function(){
		requestHandler.getRequest("User/getAllCountys.json","").then(function(response){
				$scope.countyList=response.data.countyForms;
		});
	};
	
	// Call get County List
	$scope.getCountyList();
	
	//Add Occupant
	$scope.addOccupant=function(index){
		$scope.newOccupant={"firstName":"","lastName":"","address":"","phoneNumber":"","atFaultInsuranceCompany":"","victimInsuranceCompany":"","status":1};
		$scope.reports[index].occupantsForms.push($scope.newOccupant);
		console.log($scope.reports);
	};
	
	// Remove Occupant
	$scope.removeOccupant=function(mainIndex,index){
		$scope.reports[mainIndex].occupantsForms.splice(index,1);
		console.log($scope.reports);
	};
	
	// Save Crash Reports
	$scope.saveCrashReport=function(){
		$scope.reportSave=true;
		$scope.buttonText="Submiting....";
		requestHandler.postFileUpdate("User/uploadCrashReports.json",$scope.crashReportFile,"crashReport",$scope.report.reportNumber,"reportNumber","","reportId").then(function(response){
			$scope.report.reportId=response.data.reportId;
			requestHandler.postRequest("User/mergeCrashReports.json?isAddOrEdit=1",$scope.report).then(function(response){
				$scope.reportSave=false;
				$scope.buttonText="Submit";
				successMessage(Flash,"Successfully Added");
				$location.path('/reports');
			});
		});
	};
	
	// Date Picker
	$.each($scope.reports,function(key,value){
		// Set Max Date
		//$('#crashDateAdd'+key).data("DateTimePicker").setMaxDate($rootScope.currentDate);
	});
	
	$scope.enableDatePicker=function(id){
		$('#'+id).datetimepicker({
			pickTime : false,
			format:'MM/DD/YYYY',
			ignoreReadonly:true
		});

	};
	
}]);

// Edit Report Controller
adminApp.controller('EditReportsController',['$rootScope','$scope','$http','requestHandler','$location','Flash','$routeParams',function($rootScope,$scope,$http,requestHandler,$location,Flash,$routeParams){
	
	// For Check Report Number Already Exist
	$scope.reportId=$routeParams.id;
	// Get County List
	$scope.getCountyList=function(){
		requestHandler.getRequest("User/getAllCountys.json","").then(function(response){
				$scope.countyList=response.data.countyForms;
		});
	};
	
	// Call get County List
	$scope.getCountyList();
	// Set Max Date
	$('#crashDateAdd').data("DateTimePicker").setMaxDate($rootScope.currentDate);
	
	$scope.isEdit=true;
	$scope.showCancel=true;
	$scope.title="Edit Report";
	$scope.reportSave=false;
	$scope.buttonText="Submit";
	
	$scope.getReport=function(){
		requestHandler.getRequest("getCrashReports.json?id="+$scope.reportId,"").then(function(response){
			$scope.report=response.data.crashReportsForm;
			$scope.report.countyId=$scope.report.countyId.toString();
			$.each($scope.report.occupantsForms,function(key,value){
				value.crashSeverity=value.crashSeverity.toString();
			});
			$scope.occupantListLength=$scope.report.occupantsForms.length;
		});
	};
	
	$scope.getReport();
	
	//Add Occupant
	$scope.addOccupant=function(){
		$scope.newOccupant={"firstName":"","lastName":"","crashSeverity":"0","address":"","phoneNumber":"","atFaultInsuranceCompany":"","victimInsuranceCompany":"","status":1};
		$scope.report.occupantsForms.push($scope.newOccupant);
		console.log($scope.report.occupantsForms);
	};
	
	// Remove Occupant
	$scope.removeOccupant=function(index){

		$scope.report.occupantsForms.splice(index,1);
		console.log($scope.report.occupantsForms);
	};
	
	$scope.saveCrashReport=function(){
		$scope.reportSave=true;
		$scope.buttonText="Submiting....";
		if($scope.isEdit){
			console.log($scope.report);
			requestHandler.postRequest("User/mergeCrashReports.json?isAddOrEdit=2",$scope.report).then(function(response){
				$scope.reportSave=false;
				$scope.buttonText="Submit";
				successMessage(Flash,"Successfully Updated");
				$location.path('/reports');
			});
		}else{
			requestHandler.postFileUpdate("User/uploadCrashReports.json",$scope.crashReportFile,"crashReport",$scope.report.reportNumber,"reportNumber",$scope.report.reportId,"reportId").then(function(response){
				$scope.report.reportId=response.data.reportId;
				requestHandler.postRequest("User/mergeCrashReports.json?isAddOrEdit=2",$scope.report).then(function(response){
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
adminApp.controller('ViewReportController',['$rootScope','$scope','$http','requestHandler','Flash',function($rootScope,$scope,$http,requestHandler,Flash){

	$scope.getCrashReportsList=function(){
		$scope.crashReportSearchForm.pageNumber=1;
		requestHandler.postRequest("User/searchCrashReports.json",$scope.crashReportSearchForm).then(function(response){
			$scope.totalRecords=response.data.crashReportsResult.totalRecords;
			$scope.crashReportsResultList=response.data.crashReportsResult;
		});
	};
    
	$scope.secondarySearch=function(){
		requestHandler.postRequest("User/searchCrashReports.json",$scope.crashReportSearchForm).then(function(response){
			$scope.totalRecords=response.data.crashReportsResult.totalRecords;
			$scope.crashReportsResultList=response.data.crashReportsResult;
		});
	};
	
    $scope.$watch("crashReportSearchForm.pageNumber",function(){
		$scope.secondarySearch();
	});

	$scope.$watch("crashReportSearchForm.itemsPerPage",function(){
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
				"searchType":1
		};
		// Set Max Date
		$('#crashDateReportList').data("DateTimePicker").setMaxDate($rootScope.currentDate);
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
		$scope.init();
	};
}]);