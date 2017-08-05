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
		
		
});
	
}
$scope.getSettingsList();

//add property function
$scope.addSetting=function()
{
	
$('#addModal').modal({animation:true});

$('#addModal').on('hidden.bs.modal', function ()
		{
    $(this).find('form').trigger('reset');
    $scope.form.$invalid=true;
})


	
$scope.buttonText="Add";

$scope.heading="Add Property";

	$scope.addKey=function()
	{
		$scope.settingId=0;
		$scope.existError=false;
		
		

requestHandler.postRequest("checkKeyValue.json?settingKey="+$scope.settings.settingKey+"&id="+$scope.settingId).then(function(response)
				{
	
	

if(response.data.isCorrect==1)
				{
$scope.existError=true;
$("#try").show();
}
else
{
requestHandler.postRequest("saveUpdateSettings.json",$scope.settings).then(function(response)
						{
	            
	         $('#addModal').modal('hide');
	
		Flash.create('success',"New Key Has Been Added!");
					
					$(window).scrollTop(0);
					
					$scope.getSettingsList();
					
					$scope.form.$invalid=true;
					
						});
		}


$(function($scope) 
		{
    $("#check").keypress(function() 
    	    {
    	$("#try").hide();
        
    });
});


			
				});
			

	}
	
	
}

//edit property function
$scope.editSetting=function(id)
{
$('#addModal').modal({animation:true});

$('#addModal').on('hidden.bs.modal', function () 
		{
    $(this).find('form').trigger('reset');
    $scope.form.$invalid=true;
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
$scope.existError=false;


requestHandler.postRequest("checkKeyValue.json?settingKey="+$scope.settings.settingKey+"&id="+$scope.settingId).then(function(response)
						{
if(response.data.isCorrect==1)
        {
		$scope.existError=true;
		}
		else
		{	
	
		requestHandler.postRequest("saveUpdateSettings.json",$scope.settings).then(function(response)
				{
			
			console.log($scope.settings);
			
			$('#addModal').modal('hide');
			
			Flash.create('success',"Property Has Been updated!");

			$(window).scrollTop(0);
			
			$scope.getSettingsList();
				
			/*$scope.form.$invalid=true;*/
			
				});
		}
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
			
			Flash.create('success',"Property Has Been Deleted!");
			
			$(window).scrollTop(0);
			
		$scope.getSettingsList();
			});
	}
}

}]);




