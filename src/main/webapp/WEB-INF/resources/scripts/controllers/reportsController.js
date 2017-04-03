/**
 * Created by user on 18/5/16.
 */

var adminApp = angular.module('adminApp',['flash','requestModule']);


//Add Reports Controller
adminApp.controller('AddReportsController',['$rootScope','$scope','$http','requestHandler','$location','Flash','$window',function($rootScope,$scope,$http,requestHandler,$location,Flash,$window){
	
	// For Check Report Number Already Exist
	$scope.reportId="";
	
	// Show Error
	$scope.isError=false;
	$scope.errorMsg="";
	
	//Forms Object
	$scope.forms={};
	var paneId=1;
	
	$scope.occupantListLength=0;
	$scope.isEdit=false;
	$scope.showCancel=true;
	$scope.reportSave=false;
	$scope.buttonText="Submit";
	$scope.title="Add Report";
	$scope.pageType="1";
	$scope.reports=[{
			"id": 'Report_'+paneId,
	        "header": 'Report',
	        "isExpanded": true,
	        "countyId":"",
			"crashDate":"",
			"reportNumber":"",
			"location":"",
			"crashSeverity":"0",
			"fileName":"",
			"fromPage":"",
			"toPage":"",
			"occupantsForms":[{"firstName":"","lastName":"","address":"","phoneNumber":"","injuries":"","seatingPosition":"","atFaultInsuranceCompany":"","victimInsuranceCompany":"","status":1}]
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
		$scope.newOccupant={"firstName":"","lastName":"","address":"","phoneNumber":"","injuries":"","seatingPosition":"","atFaultInsuranceCompany":"","victimInsuranceCompany":"","status":1};
		$scope.reports[index].occupantsForms.push($scope.newOccupant);
		console.log($scope.reports);
	};
	
	// Remove Occupant
	$scope.removeOccupant=function(mainIndex,index){
		$scope.reports[mainIndex].occupantsForms.splice(index,1);
		console.log($scope.reports);
	};
	
	// Add Report 
	$scope.addReport=function(){
		paneId=paneId+1;
		$scope.newReport={
				"id": 'Report_'+paneId,
		        "header": 'Report',
		        "isExpanded": true,
		        "countyId":"",
				"crashDate":"",
				"reportNumber":"",
				"location":"",
				"crashSeverity":"0",
				"fileName":"",
				"fromPage":"",
				"toPage":"",
				"occupantsForms":[{"firstName":"","lastName":"","address":"","phoneNumber":"","atFaultInsuranceCompany":"","victimInsuranceCompany":"","status":1}]
				};
		$scope.reports.push($scope.newReport);
	};
	
	// Remove Report
	$scope.removeReport=function(index){
		$scope.reports.splice(index,1);
		console.log($scope.reports);
	};
	
	
	// Save Crash Reports Modal
	$scope.saveCrashReportModal=function(){
		var formsTrueCount=0;
		$.each($scope.forms,function(key,value){
			if(value!=undefined){
				if(value.$valid){
					formsTrueCount++;
				}
			}
		});
		
		if(formsTrueCount==2){
			$scope.isError=false;
			$scope.errorMsg="";
			$("#reportSaveConfirmationModal").modal('show');
		}else{
			// Some Forms Having Validation Error
			$scope.isError=true;
			$scope.errorMsg="Some of the fields having validation error";
		}
		
	};
	
	// Save Crash Reports
	$scope.saveCrashReport=function(){
		$scope.reportSave=true;
		$scope.buttonText="Submitting....";
		$scope.crashReportsList={};
		$scope.crashReportsList.pageType=parseInt($scope.pageType);
		$scope.crashReportsList.crashReportsForms=$scope.reports;
	
		console.log($scope.crashReportsList);
		requestHandler.postFileWithJson("User/submitCrashReports.json",$scope.crashReportFile,"crashReport",$scope.crashReportsList,"crashReportFormList").then(function(response) {
			$scope.reportSave=false;
			$scope.buttonText="Submit";
			if(response.data.error){
				$scope.isError=true;
				$scope.errorMsg=response.data.errorDescription;
			}else{
				$scope.isError=false;
				$scope.errorMsg="";
				successMessage(Flash,"Successfully Added");
				$location.path('/reports');
			}
		});
	};

	// Date Picker
	$scope.enableDatePicker=function(id){
		$('#'+id).datetimepicker({
			pickTime : false,
			format:'MM/DD/YYYY',
			ignoreReadonly:true
		});
		
		$('#'+id).data("DateTimePicker").setMaxDate($rootScope.currentDate);
	};
	
	// Date Picker Enable By Clicking ICon
	$scope.enableDatePickerByIcon=function(id){
		$('#'+id).focus();
	};
	

    var openedWindows = [];
	$scope.onChangeFile=function(){
		
	    pdffile=document.getElementById("crashReportFile").files[0];
		var blob = new Blob([pdffile], {type: 'application/pdf'});
		
		$.each(openedWindows,function(key,value){
			value.close();
		});
		
		openedWindows=[];
		if (window.navigator && window.navigator.msSaveOrOpenBlob) {
		    window.navigator.msSaveOrOpenBlob(blob);
		}
		else {
			window.URL = window.URL || window.webkitURL;
			pdffile_url=window.URL.createObjectURL(blob);
		    var childWindow = window.open(pdffile_url,"_blank", "scrollbars=1,resizable=1,height=700,width=1000");
		    openedWindows.push(childWindow);
		}	 
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
			$scope.report.crashSeverity=$scope.report.crashSeverity.toString();
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
		$scope.buttonText="Submitting....";
		if($scope.isEdit){
			console.log($scope.report);
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
adminApp.controller('ViewReportController',['$rootScope','$scope','$http','$q','requestHandler','Flash',function($rootScope,$scope,$http,$q,requestHandler,Flash){

	$scope.getCrashReportsList=function(){
		var defer=$q.defer();
		$scope.crashReportSearchForm.pageNumber=1;
		requestHandler.postRequest("User/searchCrashReports.json",$scope.crashReportSearchForm).then(function(response){
			$scope.totalRecords=response.data.crashReportsResult.totalRecords;
			$scope.crashReportsResultList=response.data.crashReportsResult;
			defer.resolve(response);
		});
		return defer.promise;
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

    $scope.itemsPerPageFilterChange=function(){
    	var promise=$scope.getCrashReportsList();
		if(promise!=null){
			promise.then(function(reponse){
				setTimeout(function(){
					 $('html,body').animate({scrollTop: $('#noOfRows').offset().top},'slow');
				},1000);
			});
		}
    };
	
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