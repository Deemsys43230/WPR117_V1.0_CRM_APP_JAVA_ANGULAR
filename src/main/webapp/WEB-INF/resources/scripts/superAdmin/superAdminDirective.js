//directive for checking availabilty for username

superAdminApp.directive("checkUsername", function ($q, $timeout,requestHandler) {
    var CheckUserExists = function (isNew) {
        if(isNew==0)
            return true;
        else
            return false;
    };
    return {
        restrict: "A",
        require: "ngModel",
        link: function (scope, element, attributes, ngModel) {
            ngModel.$asyncValidators.checkUsername = function (modelValue) {
                var defer = $q.defer();
                $timeout(function () {
                    var isNew;
                    var sendRequest=requestHandler.postRequest("User/checkUserNameExists.json?username="+modelValue+"&id="+scope.accountId,0).then(function(results){
                        isNew=results.data.isCorrect;
                    });

                    sendRequest.then(function(){

                        if (CheckUserExists(!isNew)){
                            defer.reject();
                        }
                        else{
                            defer.resolve();
                        } 
                    });
                    isNew = false;
                }, 500);

                return defer.promise;
            }
        }
    };

});

//directive for converting null to empty string from select box

superAdminApp.directive('fix', function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, ngModel) {
            ngModel.$parsers.push(function(value) {
                if ( value === null ) {
                    value = '';
                }
                return value;
            });
        }
    };
});


superAdminApp.directive("checkPassword", function ($q, $timeout,requestHandler) {
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
                }, 500);

                return defer.promise;
            }
        }
    };

});

