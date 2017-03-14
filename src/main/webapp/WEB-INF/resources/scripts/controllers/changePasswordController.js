var adminApp = angular.module('adminApp',['flash','requestModule']);


//Add Reports Controller
adminApp.controller('ChangePasswordController',['$rootScope','$scope','$http','requestHandler','$route','Flash',function($rootScope,$scope,$http,requestHandler,$route,Flash){
	
	$scope.changePassword=function()
	{
		requestHandler.postRequest("/User/changePassword.json?password="+$scope.newPassword,"").then(function(response){
			 $scope.value=response.data.requestSuccess;
			  if($scope.value==true)
				  {
				  successMessage(Flash,"Successfully Changed");
				  $route.reload();
				 }
		});
	};
	
}]);
	
adminApp.directive("checkPassword", function ($q, $timeout,requestHandler) {
    var CheckPasswordExists = function (isNew) {
        if(isNew==0)
            return true;
        else
            return false;
    };
    return {
        restrict: "A",
        require: "ngModel",
        link: function (scope, element, attributes, ngModel) {
            ngModel.$asyncValidators.checkPassword = function (modelValue) {
                var defer = $q.defer();
                $timeout(function () {
                    var isNew;
                    var sendRequest=requestHandler.postRequest("/User/checkPassword.json?password="+modelValue,0).then(function(results){
                        isNew=results.data.isCorrect;
                    });

                    sendRequest.then(function(){

                        if (CheckPasswordExists(!isNew)){
                            defer.resolve();
                        }
                        else{
                            defer.reject();
                        } 
                    });
                    isNew = false;
                }, 10);

                return defer.promise;
            }
        }
    };

});
