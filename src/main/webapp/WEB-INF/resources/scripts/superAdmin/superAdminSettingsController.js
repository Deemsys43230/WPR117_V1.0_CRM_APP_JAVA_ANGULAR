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

//add property function
$scope.addSetting=function()
{
$('#addModal').modal({animation:true});
	
$scope.buttonText="Add";

$scope.heading="Add Property";


	$scope.addKey=function()
	{
		requestHandler.postRequest("saveUpdateSettings.json",$scope.settings).then(function(response)
				{
			
			console.log($scope.settings);
			
			Flash.create('success',"New Key Has Been Added!");
			
			$(window).scrollTop(0);
			
			$scope.getSettingsList();
			
			});
	}
}

//edit property function
$scope.editSetting=function(id)
{
$('#addModal').modal({animation:true});


$('#addModal').on('hidden.bs.modal', function () {
    $(this).find('form').trigger('reset');
})
	
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
			
			
			Flash.create('success',"Property Has Been updated!");

			$(window).scrollTop(0);
			
			$scope.getSettingsList();
			
			
				});
}
}



//delete property function
$scope.delete=function(id)
{
	$('#deleteModal').modal({animation:true});
	
	$scope.confirm=function()
	{
		$scope.settingId=id;
	
	requestHandler.postRequest("deleteSettings.json?id="+$scope.settingId).then(function(success)
				{
			$('#deleteModal').modal('hide');
			
			Flash.create('success',"Property Has Been Deleted Successfully!");
			
			$(window).scrollTop(0);
			
		$scope.getSettingsList();
			});
	}
}
}]);




