/**
 * Created by user on 18/5/16.
 */

var adminApp = angular.module('adminApp',['flash','requestModule','ReportSearchModule']);


//Add Reports Controller
adminApp.controller('AddReportsController',['$rootScope','$scope','$http','requestHandler','$location','Flash','$window','$q',function($rootScope,$scope,$http,requestHandler,$location,Flash,$window,$q){
	
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
			$scope.checkReportNumberExist();
		}else{
			// Some Forms Having Validation Error
			$scope.isError=true;
			$scope.errorMsg="Some of the fields having validation error";
		}
		
	};
	
	$scope.emptyPageValues=function(){
		$.each($scope.reports,function(key,value){
			value.fromPage="";
			value.toPage="";
		});
	};
	
	// Check Reportnumber Exist
	$scope.checkReportNumberExist=function(){
		var isSuccessCount=0;
		$scope.crashReportsList={};
		$scope.crashReportsList.pageType=parseInt($scope.pageType);
		$scope.crashReportsList.crashReportsForms=$scope.reports;
		requestHandler.postRequest("User/checkReportNumberExistMultipleReport.json",$scope.crashReportsList).then(function(response){
			$scope.reports=response.data.crashReportsList.crashReportsForms;
			$scope.pageType=response.data.crashReportsList.pageType;
			$.each($scope.reports,function(key,value){
				if(value.toPage!=null){
					value.toPage=value.toPage.toString();
				}
				value.countyId=value.countyId.toString();
				value.crashSeverity=value.crashSeverity.toString();
				if(!value.reportNumberExist){
					isSuccessCount++;
				}else{
					$scope.isError=true;
					$scope.errorMsg="Some Reports Already Exist";
				}
			});
			
			// Call Submit
			if(isSuccessCount==$scope.reports.length){
				$scope.saveCrashReport();
			}
		});
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
				$location.path("/reports");
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
	$scope.reportType=$routeParams.reportType;
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
	
	$scope.reportSave=false;
	if($scope.reportType==1){
		$scope.title="Edit Report";
		$scope.buttonText="Submit";
	}else{
		$scope.title="Verify Report";
		$scope.buttonText="Verified";
	}
	
	
	$scope.getReport=function(){
		requestHandler.getRequest("getCrashReports.json?id="+$scope.reportId,"").then(function(response){
			$scope.report=response.data.crashReportsForm;
			$scope.report.countyId=$scope.report.countyId.toString();
			if($scope.report.crashSeverity!=null){
				$scope.report.crashSeverity=$scope.report.crashSeverity.toString();	
			}
			$scope.occupantListLength=$scope.report.occupantsForms.length;
		});
	};
	
	$scope.getReport();
	
	//Add Occupant
	$scope.addOccupant=function(){
		$scope.newOccupant={"firstName":"","lastName":"","address":"","phoneNumber":"","injuries":"","seatingPosition":"","atFaultInsuranceCompany":"","victimInsuranceCompany":"","status":1};
		$scope.report.occupantsForms.push($scope.newOccupant);
		console.log($scope.report.occupantsForms);
	};
	
	// Remove Occupant
	$scope.removeOccupant=function(index){

		$scope.report.occupantsForms.splice(index,1);
		console.log($scope.report.occupantsForms);
	};
	
	// Report Save Confirmation Modal
	$scope.saveCrashReportModal=function(){
		$scope.reportSave=true;
		$scope.buttonText="Submitting....";
		requestHandler.getRequest("User/checkReportNumberExist.json?reportId="+$scope.report.reportId+"&crashDate="+$scope.report.crashDate+"&reportNumber="+$scope.report.reportNumber+"&countyId="+$scope.report.countyId,"").then(function(response){
			$scope.reportSave=false;
			$scope.buttonText="Submit";
			if(response.data.isExist==1){
				$scope.isError=true;
				$scope.errorMsg="Report Already Exist";
			}else{
				$scope.isError=false;
				$scope.errorMsg="";
				if($scope.reportType==2){
					$("#reportSaveConfirmationModal").modal('show');
				}else{
					$scope.saveCrashReport();
				}
			}
		});
		
	};
	
	// Save Updated Report
	$scope.saveCrashReport=function(){
		// Hide Modal If report for Verification
		if($scope.reportType==2){
			$("#reportSaveConfirmationModal").modal('hide');
		}
		$scope.reportSave=true;
		$scope.buttonText="Submitting....";
		if($scope.reportType==1){
			$scope.report.isChecker=false;
		}else{
			$scope.report.isChecker=true;
		}
		
		// Hide Modal
		 $('body').removeClass('modal-open');
		 $('body').removeAttr('style');
		 $('.modal-backdrop').hide();
		 
		if($scope.isEdit){
			console.log($scope.report);
			requestHandler.postRequest("User/mergeCrashReports.json",$scope.report).then(function(response){
				$scope.reportSave=false;
				$scope.buttonText="Submit";
				successMessage(Flash,"Successfully Updated");
				$location.path("/reports");
			});
		}else{
			requestHandler.postFileUpdate("User/uploadCrashReports.json",$scope.crashReportFile,"crashReport",$scope.report.reportNumber,"reportNumber",$scope.report.reportId,"reportId").then(function(response){
				$scope.report.reportId=response.data.reportId;
				requestHandler.postRequest("User/mergeCrashReports.json",$scope.report).then(function(response){
					$scope.reportSave=false;
					$scope.buttonText="Submit";
					successMessage(Flash,"Successfully Updated");
					$location.path("/reports");
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
	
	 var openedWindows = [];
	$scope.openReport=function(pdffile_url){
		
		//alert(pdffile_url);
	   		
		$.each(openedWindows,function(key,value){
			value.close();
		});
		
			openedWindows=[];
			var childWindow = window.open(pdffile_url,"_blank", "scrollbars=1,resizable=1,height=700,width=1000");
		    openedWindows.push(childWindow);
	};
	$scope.onChangeFile=function(){
		
	    pdffile=document.getElementById("crashReportFile").files[0];
		var blob = new Blob([pdffile], {type: 'application/pdf'});
		$.each(openedWindows,function(key,value){
			value.close();
		});
		
		openedWindows=[];
		if(pdffile!=undefined){
			if (window.navigator && window.navigator.msSaveOrOpenBlob) {
			    window.navigator.msSaveOrOpenBlob(blob);
			}
			else {
				window.URL = window.URL || window.webkitURL;
				pdffile_url=window.URL.createObjectURL(blob);
			    var childWindow = window.open(pdffile_url,"_blank", "scrollbars=1,resizable=1,height=700,width=1000");
			    openedWindows.push(childWindow);
			}	
		}
		 
	};
	
	
	// Clear Selected File
	$scope.clearFile = function () {
	    angular.element("input[type='file']").val(null);
	    $scope.crashReportFile="";
	};
	
	// Reject Report From Verification
	$scope.rejectReportModal=function(){
		$("#rejectReportModal").modal('show');
	};
	
	$scope.rejectReport=function(){
		$("#rejectReportModal").modal('hide');
		$('body').removeClass('modal-open');
		$('body').removeAttr('style');
		$('.modal-backdrop').hide();
		
		requestHandler.postRequest("User/rejectReportFromVerification.json?reportId="+$scope.reportId+"&rejectNotes="+$scope.rejectNotes,"").then(function(response){
			$scope.reportSave=false;
			$scope.buttonText="Verified";
			successMessage(Flash,"Successfully Updated");
			$location.path('/reports');
		});
	};
}]);

//View Report Controller
adminApp.controller('ViewReportController',['$rootScope','$scope','$http','$q','requestHandler','Flash','reportSearchService',function($rootScope,$scope,$http,$q,requestHandler,Flash,reportSearchService){

	$scope.getCrashReportsList=function(){
		
		$scope.oldPageNumber=$scope.crashReportSearchForm.pageNumber;
		$scope.crashReportSearchForm.pageNumber=1;  // This Will Call Through pageNumber $watch
		if($scope.oldPageNumber==$scope.crashReportSearchForm.pageNumber){
			$scope.searchReportsList($scope.crashReportSearchForm);
		}
		// To Avoid Main Search Parameter Override
		angular.copy($scope.crashReportSearchForm,$scope.mainSearchParam);
		
		// Set To Service
		reportSearchService.setReportNumber($scope.crashReportSearchForm.reportNumber);
		reportSearchService.setCrashDate($scope.crashReportSearchForm.crashDate);
		reportSearchService.setAddedOnFromDate($scope.crashReportSearchForm.addedOnFromDate);
		reportSearchService.setAddedOnToDate($scope.crashReportSearchForm.addedOnToDate);
		reportSearchService.setFirstName($scope.crashReportSearchForm.firstName);
		reportSearchService.setLastName($scope.crashReportSearchForm.lastName);
		reportSearchService.setItemsPerPage($scope.crashReportSearchForm.itemsPerPage);
		reportSearchService.setPageNumber($scope.crashReportSearchForm.pageNumber);
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
		reportSearchService.setReportType($scope.crashReportSearchForm.reportType);
    	reportSearchService.setVerifiedStatus($scope.crashReportSearchForm.verifiedStatus);
    	reportSearchService.setPageNumber($scope.crashReportSearchForm.pageNumber);
    	reportSearchService.setItemsPerPage($scope.crashReportSearchForm.itemsPerPage);
    	
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
    	reportSearchService.setPageNumber($scope.crashReportSearchForm.pageNumber);
    	// Copy Mainsearchparam to Patient
		angular.copy($scope.mainSearchParam,$scope.crashReportSearchForm);
		
    	var promise=$scope.searchReportsList($scope.crashReportSearchForm);
    	/*if(promise!=null){
			promise.then(function(reponse){
				setTimeout(function(){
					 $('html,body').animate({scrollTop: $('#noOfRows').offset().top},'slow');
				},1000);
			});
		}*/
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
	
    // Get Count of Pending Reports
    $scope.getCountOfPendingReports=function(){
    	requestHandler.getRequest("User/getPendingReportsCount.json","").then(function(response){
    		$scope.pendingReportsCount=response.data.pendingReportsCount;
    	});
    };
    
    $scope.init=function(){
    	$scope.crashReportsResultListOriginal=[];
    	$scope.isDisableSendButton=true;
    	$scope.deleteText="Yes";
    	$scope.isDeleting=false;
		$scope.totalRecords=0;

		// Main Search Param
		$scope.mainSearchParam={};
		
		$scope.crashReportSearchForm={
				"reportNumber":reportSearchService.getReportNumber(),
				"crashDate":reportSearchService.getCrashDate(),
				"firstName":reportSearchService.getFirstName(),
				"lastName":reportSearchService.getLastName(),
				"addedOnFromDate":reportSearchService.getAddedOnFromDate(),
				"addedOnToDate":reportSearchService.getAddedOnToDate(),
				"reportType":reportSearchService.getReportType(),
				"verifiedStatus":reportSearchService.getVerifiedStatus(),
				"pageNumber":reportSearchService.getPageNumber(),
				"itemsPerPage":reportSearchService.getItemsPerPage(),
				"searchType":reportSearchService.getSearchType()
		};
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
		
		// get Count Of Pending Reports
		$scope.getCountOfPendingReports();
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
	
	// Check All
	$scope.checkAllReports=function(){
		if($scope.crashReportsResultList.crashReportsResult.length>0){
			$.each($scope.crashReportsResultList.crashReportsResult, function(index,value) {
				if(value.verifiedStatus!=2&&value.verifiedStatus!=1){
					value.selected=$scope.isCheckedAllReports;
					$scope.isDisableSendButton=!$scope.isCheckedAllReports;
				}
			});
			//$("input:checkbox").prop('checked', $(this).prop("checked"));
		}
	};	
	
	// 
	$scope.isCheckedIndividual=function(){
		var isSelected=false;
		$.each($scope.crashReportsResultList.crashReportsResult, function(index,value) {
			if(value.verifiedStatus!=2&&value.verifiedStatus!=1){
				if(value.selected){
					isSelected=true;
				}
			}
		});
		
		if(isSelected){
			$scope.isDisableSendButton=false;
		}else{
			$scope.isDisableSendButton=true;
		}
	};
	
	// Send To Verification Modal Confirm
	$scope.sendToVerificationModal=function(fromLocation,reportId){
		$scope.fromType=fromLocation;
		$scope.sendVerificationReportId=reportId;
		$("#sendToVerificationModal").modal('show');
	};
	
	// Send To Verification
	$scope.sendToVerification=function(){
		$("#sendToVerificationModal").modal('hide');
		var reportIdArray=[];
		if($scope.fromType==0){
			$.each($scope.crashReportsResultList.crashReportsResult, function(index,value) {
					if(value.selected){
						reportIdArray.push(value.reportId);
					}
			});
		}else{
			reportIdArray.push($scope.sendVerificationReportId);
		}
		
		console.log(reportIdArray);
		requestHandler.postRequest('/User/sendReportToVerification.json?reportId='+reportIdArray,"").then(function(response){
			successMessage(Flash,"Successfully Sent");
			$scope.searchReportsList($scope.crashReportSearchForm);
		});
	};
	
	// View Logs
	$scope.viewLogs=function(reportId){
		requestHandler.getRequest('/User/getVerificationLogsByReport.json?reportId='+reportId,"").then(function(response){
			$scope.verificationLogList=response.data.verificationLogForms;
			$("#viewLogsListModal").modal('show');
		});
	};
	
	
	// Reset Search
	$scope.resetSearch=function(){
		reportSearchService.resetSearchData();
		$scope.init();
	};
}]);