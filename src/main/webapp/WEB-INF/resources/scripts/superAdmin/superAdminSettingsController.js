superAdminApp.controller("superAdminSettingsController",['$rootScope','$scope','$http','requestHandler','superAdminService','Flash','searchAccountService','$q',function($rootScope,$scope, $http, requestHandler, superAdminService,Flash,searchAccountService,$q)
	{
	
	
	
	}]);
	

superAdminApp.controller("viewSettingsController",['$rootScope','$scope','$http','requestHandler','$routeParams','superAdminService','Flash','searchAccountService',function($rootScope,$scope, $http, requestHandler,$routeParams, superAdminService,Flash,searchAccountService)
	{

	
	
	
	
$scope.getSettingsList=function()
{
	requestHandler.getRequest("getAllSettingss.json").then(function(response)
			{
		
		$scope.settingsList=response.data.settingsForms;
		
		/*console.log($scope.settingsList);*/
});
	
}


$scope.getSettingsList();


$scope.delete=function(id)
{
	$('#deleteModal').modal({animation:true});
	
	$scope.confirm=function()
	{
		$scope.settingId=id;
	
	requestHandler.postRequest("deleteSettings.json?id="+$scope.settingId).then(function(success)
				{
			$('#deleteModal').modal('hide');
			Flash.create('success',"Setting Deleted Successfully!");
			$(window).scrollTop(0);
			
			$scope.getSettingsList=function()
			{
				requestHandler.getRequest("getAllSettingss.json").then(function(response)
						{
					
					$scope.settingsList=response.data.settingsForms;
					
					/*console.log($scope.settingsList);*/
					
						});
				
			}


			$scope.getSettingsList();
			
			
			
			
				});
	}
}


$scope.addSetting=function()
{
$('#addModal').modal({animation:true});
	
$scope.buttonText="Submit";
$scope.heading="Add Settings";


	$scope.addKey=function()
	{
		requestHandler.postRequest("saveUpdateSettings.json",$scope.settings).then(function(response)
				{
			
			console.log($scope.settings);
			
			$(window).scrollTop(0);
			
			Flash.create('success',"New Key is Been Added!");
			
			location.reload();
			
			

			
		
			
				});
	}
}





$scope.editSetting=function(id)
{
$('#editModal').modal({animation:true});
	
$scope.buttonText="Update";
$scope.heading="Edit Settings";
$scope.settingId = id;

requestHandler.getRequest("getSettings.json?id="+$scope.settingId).then(function(response)
		{
	$scope.settings=response.data.settingsForm;
	console.log($scope.settings);
		});




	$scope.addKey=function()
	{
	
		requestHandler.postRequest("saveUpdateSettings.json",$scope.settings).then(function(response)
				{
			
			console.log($scope.settings);
			window.location.href="#/settings";
			
			Flash.create('success',"Setting is Been updated!");

			$(window).scrollTop(0);
			
			location.reload();
		
	});
}
}







}]);



superAdminApp.controller("addSettingsController",['$rootScope','$scope','$http','requestHandler','superAdminService','Flash','searchAccountService','$q',function($rootScope,$scope, $http, requestHandler, superAdminService,Flash,searchAccountService,$q)
	{
	
	$scope.buttonText="Submit";
	$scope.heading="Add Settings";

	
	
	$scope.addSettings=function()
	{
	requestHandler.postRequest("saveUpdateSettings.json",$scope.settings).then(function(response)
			{
		
		console.log($scope.settings);
		
		window.location.href="#/settings";
		
		Flash.create('success',"New Key is Been Added!");

		$(window).scrollTop(0);
	
		
		
			});
	
				
	
	};
	
	
	
	
	}]);

superAdminApp.controller("editSettingsController",['$rootScope','$scope','$http','requestHandler','$routeParams','superAdminService','Flash','searchAccountService',function($rootScope,$scope, $http, requestHandler,$routeParams,superAdminService,Flash,searchAccountService)
	{
	$scope.heading="Edit Setting";
	$scope.buttonText="Update";
	$scope.settingId = $routeParams.id;
	
	
	
	$scope.getSettingsList=function()
	{
		requestHandler.getRequest("getAllSettingss.json").then(function(response)
				{
			
			$scope.settingsList=response.data.settingsForms;
			
			/*console.log($scope.settingsList);*/
			
				});
		
	}


	$scope.getSettingsList();

	
	
	
	requestHandler.getRequest("getSettings.json?id="+$scope.settingId).then(function(response)
			{
		$scope.settings=response.data.settingsForm;
		console.log($scope.settings);
			});
	
	$scope.addSettings=function()
	{
	requestHandler.postRequest("saveUpdateSettings.json",$scope.settings).then(function(response)
			{
		
		console.log($scope.settings);
		window.location.href="#/settings";
		
		Flash.create('success',"Setting is Been updated!");

		$(window).scrollTop(0);
	
		
		
			});
	
				
	
	};
	
	
	
	
	
	
	

	







}]);

