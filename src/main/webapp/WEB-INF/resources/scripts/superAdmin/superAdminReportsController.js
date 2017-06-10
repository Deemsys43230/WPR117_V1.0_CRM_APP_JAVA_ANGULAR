superAdminApp.controller("superAdminReportsController",['$rootScope','$scope','$http','requestHandler','superAdminService','Flash','searchAccountService','$q',function($rootScope,$scope, $http, requestHandler, superAdminService,Flash,searchAccountService,$q)
	{
	
	//get PoliceDepartmentList
	$scope.getPoliceDepartmentList=function()
	{
		requestHandler.getRequest("getAllPoliceDepartments.json").then(function(response)
				{
			$scope.policeDepartmentList=response.data.policeDepartmentForms;
			
				});
		}
	
	//calling getPoliceDepartmentList function
	$scope.getPoliceDepartmentList();
	
	//get CountyList
	$scope.getAllCounty=function()
	{
		requestHandler.getRequest("User/getAllCountys.json").then(function(response){
			$scope.countyList=response.data.countyForms;
			
		});
	}
	
	//call getAllCounty function
	
	$scope.getAllCounty();
	$scope.searchReportsList=function(searchObj){
		var defer=$q.defer();
		requestHandler.postRequest("User/searchCrashReports.json",searchObj).then(function(response){
			$scope.totalRecords=response.data.crashReportsResult.totalRecords;
			$scope.crashReportsResultList=response.data.crashReportsResult;
            console.log($scope.crashReportsResultList);
			$scope.crashReportsResultListOriginal=angular.copy($scope.crashReportsResultList);
			defer.resolve(response);
		});
		return defer.promise;
	}
	
	
	
	$scope.getCrashReportsList=function()
	{
		
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
		
		if(!$scope.crashReportSearchForm.policeDepartmentId)
		{
			$scope.crashReportSearchForm.reportType=2;

		}
		else
			{
			$scope.crashReportSearchForm.reportType=1;
			}
		$scope.searchReportsList($scope.crashReportSearchForm);
	}
	
	
	//secondary search
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
		
	//reset function
	$scope.resetSearch=function(){
		$scope.init();
	};
	
	
	// Report Details on Modal
	$scope.getReport=function(reportId){
		requestHandler.getRequest("getCrashReports.json?id="+reportId,"").then(function(response){
			$scope.reportDetails=response.data.crashReportsForm;
			$("#viewReportDetailsModal").modal('show');
		});
	};
	

	$scope.init=function(){
    	$scope.addedToDateError=false;
    	$scope.crashReportsResultListOriginal=[];
    	
    	
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
				"reportType":2,
				"countyId":""
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
	}
		
		$scope.init();
	
	}]);
	