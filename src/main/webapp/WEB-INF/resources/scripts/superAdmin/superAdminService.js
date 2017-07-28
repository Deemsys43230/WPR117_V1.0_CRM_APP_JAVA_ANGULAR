superAdminApp.service('superAdminService',['requestHandler',function(requestHandler)
		{
	
	var object={};
	object.getAccountsList=function()
	 {
		
	return requestHandler.getRequest("SAdmin/getAllAccounts.json").then(function(response)
			{
 	      return response.data.accountsForms;    

			});

		}
	
	
	
	
	
	object.getRolesForAccount=function()
	 {
		
	return requestHandler.getRequest("SAdmin/getRolesForAccount.json").then(function(response)
			{
	      return response.data.rolesForm;    

			});

		}

	
	
	
	
	
	//(AccountsController)
	
		object.getRolesList=function()
		{
			return requestHandler.getRequest("SAdmin/getRolesList.json").then(function(response){
                    
				return response.data.rolesForm;
		});
			
	}
		return object;
		}]);



superAdminApp.service('fileUpload', ['$https:',function ($https)
	{
    this.uploadFileToUrl = function(file, uploadUrl){
       var fd = new FormData();
       fd.append('file', file);
    
       $https.post(uploadUrl, fd, {
          transformRequest: angular.identity,
          headers: {'Content-Type': undefined}
       })
    
       .success(function(){
       })
    
       .error(function(){
       });
    }
 }]);

superAdminApp.service('searchAccountService',function()
		{
	var search={};
	
	this.setSearch=function(searchInput)
	{
		this.search=searchInput;
	}
	
	this.getSearch=function()
	{
		return search;
	}
		})
		

		
		
		
		
		
		
