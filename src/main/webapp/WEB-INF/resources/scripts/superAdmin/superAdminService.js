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

	
	//(AccountsController)
	
		object.getRolesList=function()
		{
			return requestHandler.getRequest("SAdmin/getRolesList.json").then(function(response){
                    
				return response.data.rolesForm;
		});
			
	}
		return object;
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
