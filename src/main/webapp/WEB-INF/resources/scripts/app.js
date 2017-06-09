var commonApp= angular.module('commonApp', ['ngRoute','oc.lazyLoad','ngCookies','requestModule','flash','ngAnimate','angularUtils.directives.dirPagination']);

commonApp.config(['$routeProvider','$ocLazyLoadProvider','$httpProvider',

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
                            alert("restricted");
                            break;
                        }
                        case 403: {
                            $location.path("/login");
                            break;
                        }
                        case 500: {
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
            when('/index', {
                templateUrl: 'views/index.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'commonApp',
                            files:[
                                'resources/scripts/controllers/commonController.js',
                                
                            ]
                        });
                    }]

                },
                controller:'CommonController',
            }).
            when('/', {
                templateUrl: 'views/searchReport.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'commonApp',
                            files:[
                                'resources/scripts/controllers/searchReportsController.js',
                                
                            ]
                        });
                    }]

                },
                controller:'SearchReportsController'
            }).when('/contactUs', {
                templateUrl: 'views/contactUs.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'commonApp',
                            files:['resources/scripts/controllers/contactUsController.js']
                        });
                    }]

                },
                controller:'ContactUsController'
            }).
            otherwise({
                redirectTo: '/search-reports'
            });
    }]).controller('authenticationController', function($rootScope, $scope, $http, $location, requestHandler) {
    	requestHandler.getRequest("getCurrentDate.json","").then(function(response){
			 $rootScope.currentDate=response.data.currentDate;
    	});
   });

commonApp.controller("initController",['$scope',"$timeout",function($scope,$timeout){
	$scope.loading=true;
	$timeout(function(){
		$scope.loading=false;
	},100);
}]);

//Loader
commonApp.directive('loading', function () {
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