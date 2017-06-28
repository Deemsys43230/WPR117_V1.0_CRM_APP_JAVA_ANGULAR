var adminApp= angular.module('adminApp', ['ngRoute','oc.lazyLoad','ngCookies','requestModule','flash','ngAnimate','angularUtils.directives.dirPagination']);

adminApp.config(['$routeProvider','$ocLazyLoadProvider','$httpProvider',

    function($routeProvider,$ocLazyLoadProvider,$httpProvider) {
        $ocLazyLoadProvider.config({
            debug:false,
            events:true
        });

        //Do For Cross Orgin Login Management
        $httpProvider.defaults.withCredentials = true;

        $httpProvider.interceptors.push(['$q','$location','$injector','$cookies',function ($q, $location,$injector,$cookies) {

            return {

                'request': function(request) {
                    request.headers['X-CSRFToken']=$cookies.get('X-CSRFToken');
                    return request;
                },
                'response': function (response) {
                    return response;
                },
                'responseError': function (rejection) {
                    switch (rejection.status) {
                        case 400: {
                            break;
                        }
                        case 401:{
                        	window.location.href = window.location.origin+"/CRM/ohio?sessionout";
                            break;
                        }
                        case 403: {
                        	window.location.href = window.location.origin+"/CRM/ohio?sessionout";
                            break;
                        }
                        case 500: {
                        	alert("Please try again!");
                        	window.location.href = window.location.origin+"/CRM/ohio";
                            break;
                        }
                        default : {
                            break;
                        }
                    }
                    return $q.reject(rejection);
                }
            };
        }]);

        $routeProvider.
        
        when('/viewdepartment', {
            templateUrl: 'admin/view-department.html',
            resolve: {
                loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name:'adminApp',
                        files:[
                            'resources/scripts/controllers/viewDepartmentController.js'
                  ]
                    });
                }]

            },
            controller:'ViewDepartmentController'
        }).
            when('/add-report', {
                templateUrl: 'admin/add-report.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'adminApp',
                            files:[
                                'resources/scripts/controllers/reportsController.js',
                                'resources/scripts/directives/fileUpload.js',
                            ]
                        });
                    }]

                },
                controller:'AddReportsController'
            }).when('/edit-report/:id', {
                templateUrl: 'admin/add-report.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'adminApp',
                            files:[
                                'resources/scripts/controllers/reportsController.js',
                                'resources/scripts/directives/fileUpload.js',
                            ]
                        });
                    }]

                },
                controller:'EditReportsController'
            }).when('/reports', {
                templateUrl: 'admin/view-reports.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'adminApp',
                            files:[
                                'resources/scripts/controllers/reportsController.js'
                            ]
                        });
                    }]

                },
                controller:'ViewReportController'
            }).when('/changepassword', {
                templateUrl: 'admin/change-password.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'adminApp',
                            files:[
                                'resources/scripts/controllers/changePasswordController.js'
                            ]
                        });
                    }]

                },
                controller:'ChangePasswordController'
            }).
            otherwise({
                redirectTo: '/reports'
            });
    }])
  .controller('authenticationController', function($rootScope, $scope, $http, $location, requestHandler) {
    	requestHandler.getRequest("getCurrentDate.json","").then(function(response){
			 $rootScope.currentDate=response.data.currentDate;
			
    	});
    })

.controller('viewDepartmentController', function($rootScope,requestHandler) {

	requestHandler.getRequest("getCurrentUserPoliceDepartment.json","").then(function(response)
			{
		 $rootScope.policeDepartmentId=response.data.policeDepartmentForm.policeDepartmentId;
		 console.log($rootScope.policeDepartmentId);
	});
	
	


});






adminApp.directive('validateName', function() {
	var NAME_EXPR = /^ *([a-zA-Z]+ ?)+ *$/;
	// var USA_MOB_EXPR_WITH_BR=/^(\([0-9]{3}\)|[0-9]{3}-)[0-9]{3}-[0-9]{4}$/;
	return {
	require : 'ngModel',
	restrict : '',
	link : function(scope, elm, attrs, ngModel) {
		ngModel.$validators.validateName = function(modelValue) {
			return NAME_EXPR.test(modelValue);// ||USA_MOB_EXPR_WITH_BR.test(modelValue);
		};
	}
	};
});

// Report Number Exists
adminApp.directive('reportNumberExists',['$q','$timeout','requestHandler',function($q, $timeout, requestHandler) {
	var CheckReportNumberExists = function(isNew) {
		if (isNew === 0)
			return true;
		else
			return false;
		};
		return {
			restrict : 'A',
			require : 'ngModel',
			link : function(scope, element, attributes,ngModel) {
				ngModel.$asyncValidators.reportNumberExists = function(modelValue) {
				var defer = $q.defer();
				$timeout(function() {
						var isNew;
						var sendRequest = requestHandler.getRequest('/User/checkReportNumberExist.json?reportNumber='+encodeURIComponent(modelValue)+'&reportId='+scope.reportId).then(function(response) {
							isNew = response.data.isExist;
						});
						sendRequest.then(function() {
								if (CheckReportNumberExists(isNew)) {
									defer.resolve();
								} else {
									defer.reject();
								}
								});
							isNew = false;
						}, 10);
								return defer.promise;
								};
							}
					};
} ]);

// Loader
adminApp.directive('loading', function () {
    return {
      restrict: 'E',
      replace:true,
      template: '<div class="loader"></div>',
      link: function (scope, element, attr) {
            scope.$watch('loading', function (val) {
                if (val)
                    $(element).show();
                else
                    $(element).hide();
            });
      }
    };
});

//To Display success message
//For User Messages
function successMessage(Flash, message) {
  Flash.dismiss();
  Flash.create('success', message, 'alert');
  $('html, body').animate({ scrollTop: 0 }, 600);
  return false;
}
function errorMessage(Flash, message) {
  Flash.dismiss();
  Flash.create('danger', message, 'custom-class');
  $('html, body').animate({ scrollTop: 0 }, 600);
  return false;
}
