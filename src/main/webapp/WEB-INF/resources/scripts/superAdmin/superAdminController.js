/*//Initial Controller for Username
superAdminApp.controller('InitialController',function ($scope, $location) {
    $scope.isActive = function (path) {
        return $location.path() === path;
     }
 });
*/
superAdminApp.controller("dashboardController",['$rootScope','$scope','$http','requestHandler','superAdminService','Flash','searchAccountService',function($rootScope,$scope, $http, requestHandler, superAdminService,Flash,searchAccountService)
{
	//getting total records                (AccountsController)
      $scope.getTotalRecords=function()
      {
    	  requestHandler.getRequest("SAdmin/getTotalRecords.json").then(function(response)
    			  {
    		  $scope.totalRecords=response.data.recordsForm;
    		  console.log($scope.totalRecords);
    			  });
      }
      
      $scope.getTotalRecords();

}]);

superAdminApp.controller("viewAccountsController",['$rootScope','$scope','$http','requestHandler','superAdminService','Flash','searchAccountService',function($rootScope,$scope, $http, requestHandler, superAdminService,Flash,searchAccountService)
		{
	
	//getting search keys while loading viewAccountsController
	
	$scope.init=function()
	{
		$scope.search=searchAccountService.getSearch();
		console.log($scope.search);
	}
	
	$scope.init();
	
	//get AccountsList through superAdminService 
	var details = superAdminService.getAccountsList();
	details.then(function(data) {
		$scope.accountsList = data;
		console.log($scope.accountsList);
	});
	
	//get PoliceDepartmentList
	$scope.getPoliceDepartmentList=function()
	{
		requestHandler.getRequest("getAllPoliceDepartments.json").then(function(response)
				{
			$scope.policeDepartmentList=response.data.policeDepartmentForms;
			console.log($scope.policeDepartmentList);
				});
		
	}
	
	//calling getPoliceDepartmentList function
	$scope.getPoliceDepartmentList();
	
	
	//get Roles
	var details = superAdminService.getRolesList();
	details.then(function(data) {
		$scope.roles = data;
	});
	
	//enable disable function
	$scope.enableDisable=function(accountId)
	{
		$scope.accountId=accountId;
		requestHandler.postRequest("SAdmin/enableOrDisableAccount.json?id="+$scope.accountId).then(function(success)
				{
			Flash.create('info',"Changes Made Successfully!");	
			var details = superAdminService.getAccountsList();
			details.then(function(data) {
				$scope.accountsList = data;
				console.log($scope.accountsList);
			});
			
				});
	}
	
	//reset password function
	$scope.resetPassword=function(accountId)
	{
$('#resetModal').modal({animation:true});
		
		$scope.confirm=function()
		{
			$scope.accountId=accountId;
			console.log($scope.accountId);
			requestHandler.postRequest("SAdmin/resetPassword.json?id="+$scope.accountId).then(function(success)

					{
				$('#resetModal').modal('hide');
				Flash.create('info',"Password Updated Successfully!");
				//get AccountsList
				var details = superAdminService.getAccountsList();
				details.then(function(data) {
					$scope.accountsList = data;
				});
					});
		}
	}
		
	//setting search keys to searchAccountService
	$scope.filter=function(search)
	{
		console.log(search);
		searchAccountService.setSearch(search);
	}
	
	
	//delete function
	$scope.delete=function(id)
	{
		$('#deleteModal').modal({animation:true});
		
		$scope.confirm=function()
		{
			$scope.accountId=id;
			console.log($scope.accountId);
			requestHandler.postRequest("SAdmin/deleteAccount.json?id="+$scope.accountId).then(function(success)
					{
				$('#deleteModal').modal('hide');
				Flash.create('info',"Account Deleted Successfully!");
				//get AccountsList
				var details = superAdminService.getAccountsList();
				details.then(function(data) {
					$scope.accountsList = data;
				});
					});
		}
	}
	}]);

superAdminApp.controller("addAccountsController",['$scope','$http','requestHandler','superAdminService','Flash',function($scope, $http, requestHandler, superAdminService,Flash)
	{
	
	$scope.buttonText="Submit";
	$scope.disableUsername=false;
	$scope.addFirstNameWithHeading=false;

	$scope.heading="Add Account";
	
	
    //get Roles List
	var details = superAdminService.getRolesList();
	details.then(function(data) {
		$scope.roles = data;
	});
	
	//get PoliceDepartmentList     (Police Department.class)
	$scope.getPoliceDepartmentList=function()
	{
		requestHandler.getRequest("getAllPoliceDepartments.json").then(function(response)
				{
			$scope.policeDepartmentList=response.data.policeDepartmentForms;
			console.log($scope.policeDepartmentList);
				});
		
	}
	
	//calling getPoliceDepartmentList function
	$scope.getPoliceDepartmentList();
	
	//add account function
		$scope.addAccounts=function(account)
		{
			$scope.accountsForms=account;
			$scope.accountsForms.accountId=null;
			$scope.accountsForms.addedDateTime=null;
			$scope.accountsForms.status=1;
			console.log($scope.accountsForms);
			
			requestHandler.postRequest("SAdmin/saveUpdateAccounts.json",$scope.accountsForms);
			
			window.location.href="#/accounts";
			Flash.create('success',"New Account is Been Added!");

			
		
		}
	}]);

superAdminApp.controller("editAccountsController",['$scope','$http','requestHandler','$routeParams','superAdminService','Flash',function($scope, $http,requestHandler,$routeParams,superAdminService,Flash)
	{
	
	$scope.heading="Edit Account";
	
	$scope.buttonText="Update";
	$scope.disableUsername=true;
	$scope.addFirstNameWithHeading=true;
	$scope.accountId = $routeParams.id;
	//console.log($scope.accountId);
	
	//get Roles List    
	var details = superAdminService.getRolesList();
	details.then(function(data) {
		$scope.roles = data;
	});
	
	//get PoliceDepartmentList  (Police Department.class)
	$scope.getPoliceDepartmentList=function()
	{
		requestHandler.getRequest("getAllPoliceDepartments.json").then(function(response)
				{
			$scope.policeDepartmentList=response.data.policeDepartmentForms;
			console.log($scope.policeDepartmentList);
				});
		
	}
	
	//calling getpoliceDepartmentList function
	$scope.getPoliceDepartmentList();
	
	//get account function
	requestHandler.getRequest("SAdmin/getAccount.json?id="+$scope.accountId).then(function(response)
			{
		$scope.account=response.data.accountsForm;
		console.log($scope.account);
			});
	
	//add account function
	$scope.addAccounts=function(account)
	{
		$scope.accountsForms=account;
		console.log($scope.accountsForms);
		
		requestHandler.postRequest("SAdmin/saveUpdateAccounts.json",$scope.accountsForms);
		Flash.create('info',"Account Updated Successfully!");
		window.location.href="#/accounts";
		
	
	}
	}]);


superAdminApp.controller("changePasswordController",['$scope','$http','requestHandler','Flash',function($scope, $http,requestHandler,Flash)
{
	$scope.changePassword=function(password)
	{
		console.log(password);
		
		requestHandler.postRequest("User/changePassword.json?password="+password).then(function(success)
				{
			window.location.href="#/accounts";
			Flash.create('info',"Password Updated Successfully!");
			
				})
	}
	
}]);
superAdminApp.controller("viewDepartmentController",['$rootScope','$scope','$http','requestHandler','superAdminService','Flash','searchAccountService',function($rootScope,$scope, $http, requestHandler, superAdminService,Flash,searchAccountService)
	{
	
//get PoliceDepartmentList
$scope.getPoliceDepartmentList=function()
{
requestHandler.getRequest("getAllPoliceDepartments.json").then(function(response)
	{
$scope.policeDepartmentList=response.data.policeDepartmentForms;
//console.log($scope.policeDepartmentList);

	});
	
}

//calling getPoliceDepartmentList function
$scope.getPoliceDepartmentList();



//enable disable function
$scope.enableOrDisable=function(policeDepartmentId)
{
	$scope.policeDepartmentId=policeDepartmentId;
	
	console.log($scope.policeDepartmentId);
	
	requestHandler.postRequest("/enableOrDisableDepartment.json?id="+$scope.policeDepartmentId).then(function(success)
			{
		Flash.create('success',"Changes Made Successfully!");	
		
		$scope.getPoliceDepartmentList();
		
			});
}



//method to delete a department in list
$scope.deleteDepartment=function(id)
{
	$('#deleteModal').modal({animation:true});
	
   $scope.confirm=function()
        {
		$scope.policeDepartmentId=id;
		
		console.log($scope.policeDepartmentId);
		
		requestHandler.postRequest("/deletePoliceDepartment.json?id="+$scope.policeDepartmentId).then(function(success)
				{
			$('#deleteModal').modal('hide');
			Flash.create('info',"Department Deleted Successfully!");
			
			$scope.getPoliceDepartmentList=function()
			{
			requestHandler.getRequest("getAllPoliceDepartments.json").then(function(response)
				{
			$scope.policeDepartmentList=response.data.policeDepartmentForms;
			

				});
				
			}

			$scope.getPoliceDepartmentList();

			    });
		
	}
  }


//view single department details 
$scope.viewDepartment=function(id)
{
	$('#viewModal').modal({animation:true});
	
   
		$scope.policeDepartmentId=id;
		
		console.log($scope.policeDepartmentId);  
		
		requestHandler.getRequest("/getPoliceDepartment.json?id="+$scope.policeDepartmentId).then(function(response)
				{
			/*$('#viewModal').modal('hide');*/
            $scope.result=response.data.policeDepartmentForm;		
});
		}
}]);



superAdminApp.controller("addDepartmentController",['$rootScope','$scope','$http','requestHandler','superAdminService','Flash','searchAccountService',function($rootScope,$scope, $http, requestHandler, superAdminService,Flash,searchAccountService)
	{

	$scope.buttonText="Submit";
	$scope.heading="Add Police Department";
	
	
//get PoliceDepartmentList
$scope.getPoliceDepartmentList=function()
{
requestHandler.getRequest("getAllPoliceDepartments.json").then(function(response)
	{
$scope.policeDepartmentList=response.data.policeDepartmentForms;
console.log($scope.policeDepartmentList);
	});
	
}

//calling getPoliceDepartmentList function
$scope.getPoliceDepartmentList();


//get CountyList
$scope.getCountyList=function()
{
requestHandler.getRequest("User/getAllCountys.json").then(function(response)
	{

	$scope.countyList=response.data.countyForms;

	
});
	
}

//calling getcountyList function
$scope.getCountyList();



$scope.addDepartment=function(department)
{
	$scope.policeDepartmentForms=department;
	
	
	$scope.policeDepartmentForms.status=1;
	
	console.log($scope.policeDepartmentForms);
	
	requestHandler.postRequest("saveUpdatePoliceDepartment.json",$scope.policeDepartmentForms);
	
	window.location.href="#/department";
	
	Flash.create('info',"Department Added Successfully!");
	
	$scope.getPoliceDepartmentList=function()
	{
	requestHandler.getRequest("getAllPoliceDepartments.json").then(function(response)
		{
	$scope.policeDepartmentList=response.data.policeDepartmentForms;
	

		});
		
	}

//calling getPoliceDepartmentList function
	$scope.getPoliceDepartmentList();
	}
}]);


//Edit Department Details
superAdminApp.controller("editDepartmentController",['$rootScope','$scope','$http','requestHandler','$routeParams','superAdminService','Flash','searchAccountService',function($rootScope,$scope, $http, requestHandler,$routeParams,superAdminService,Flash,searchAccountService)
	{
	$scope.heading="Edit Department";
	$scope.title="Update Credentials";
	$scope.buttonText="Update";
	$scope.policeDepartmentId = $routeParams.id;
	
	
	//get CountyList
	$scope.getCountyList=function()
	{
	requestHandler.getRequest("User/getAllCountys.json").then(function(response)
		{

		$scope.countyList=response.data.countyForms;

		
	});
		
	}

	//calling getcountyList function
	$scope.getCountyList();

	//get PoliceDepartmentList
	$scope.getPoliceDepartmentList=function()
	{
		requestHandler.getRequest("getAllPoliceDepartments.json").then(function(response)
				{
			$scope.policeDepartmentList=response.data.policeDepartmentForms;
			console.log($scope.policeDepartmentList);
				});
		
	}
	
	//calling getpoliceDepartmentList function
	$scope.getPoliceDepartmentList();
	
	//get department by id
	requestHandler.getRequest("/getPoliceDepartment.json?id="+$scope.policeDepartmentId).then(function(response)
			{
		$scope.department=response.data.policeDepartmentForm;
});
	

	//update department function
	$scope.addDepartment=function(department)
	{
		$scope.policeDepartmentForms=department;
         console.log($scope.policeDepartmentForms);
		
		requestHandler.postRequest("/mergePoliceDepartment.json",$scope.policeDepartmentForms);
		Flash.create('info',"Department Updated Successfully!");
		
		window.location.href="#/department";
		
	
	}

}]);





