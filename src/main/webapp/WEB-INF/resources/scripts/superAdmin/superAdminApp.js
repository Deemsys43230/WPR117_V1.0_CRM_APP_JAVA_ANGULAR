var superAdminApp= angular.module('superAdminApp',['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate','ngCookies','angularUtils.directives.dirPagination']);

superAdminApp.config(['$routeProvider','$ocLazyLoadProvider','$httpProvider',

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

        $routeProvider. when('/dashboard', {
            templateUrl: 'superAdmin/dashboard.html',
            resolve: {
                loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name:'superAdminApp',
                        files:[
                            'resources/scripts/superAdmin/superAdminController.js',
                            
                        ]
                    });
                }]

            },
            controller:'dashboardController'
        }).
        when('/accounts-add', {
            templateUrl: 'superAdmin/addaccounts.html',
            resolve: {
                loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name:'superAdminApp',
                        files:[
                            'resources/scripts/superAdmin/superAdminController.js',
                            
                        ]
                    });
                }]

            },
            controller:'addAccountsController'
        }).
        
        when('/accounts-edit/:id', {
            templateUrl: 'superAdmin/addaccounts.html',
            resolve: {
                loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name:'superAdminApp',
                        files:[
                            'resources/scripts/superAdmin/superAdminController.js',
                            
                        ]
                    });
                }]

            },
            controller:'editAccountsController'
        }).
            when('/accounts', {
                templateUrl: 'superAdmin/accounts.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'superAdminApp',
                            files:[
                                'resources/scripts/superAdmin/superAdminController.js',
                                
                            ]
                        });
                    }]

                },
                controller:'viewAccountsController'
            }).
            when('/changePassword', {
                templateUrl: 'superAdmin/changepassword.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'superAdminApp',
                            files:[
                                'resources/scripts/superAdmin/superAdminController.js',
                                
                            ]
                        });
                    }]

                },
                controller:'changePasswordController'
            }).when('/reports', {
                templateUrl: 'superAdmin/reports.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'superAdminApp',
                            files:[
                                'resources/scripts/superAdmin/superAdminReportsController.js',
                                
                            ]
                        });
                    }]

                },
                controller:'superAdminReportsController'
                	
            }).when('/occupants', {
                templateUrl: 'superAdmin/occupants.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'superAdminApp',
                            files:[
                                'resources/scripts/superAdmin/superAdminOccupantsController.js',
                                
                            ]
                        });
                    }]

                },
                controller:'superAdminOccupantsController'
            }).when('/settings', {
                templateUrl: 'superAdmin/settings.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'superAdminApp',
                            files:[
                                'resources/scripts/superAdmin/superAdminSettingsController.js',
                                
                            ]
                        });
                    }]

                },
                controller:'viewSettingsController'
            })
            .when('/settings-add', {
                templateUrl: 'superAdmin/addsettings.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'superAdminApp',
                            files:[
                                'resources/scripts/superAdmin/superAdminSettingsController.js',
                                
                            ]
                        });
                    }]

                },
                controller:'addSettingsController'
            }). when('/settings-edit/:id', {
                templateUrl: 'superAdmin/addsettings.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'superAdminApp',
                            files:[
                                'resources/scripts/superAdmin/superAdminSettingsController.js',
                                
                            ]
                        });
                    }]

                },
                controller:'editSettingsController'
            }).when('/department-add', {
                templateUrl: 'superAdmin/adddepartment.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'superAdminApp',
                            files:[
                                'resources/scripts/superAdmin/superAdminController.js',
                                
                            ]
                        });
                    }]

                },
                controller:'addDepartmentController'
            }).
            
            when('/department', {
                templateUrl: 'superAdmin/department.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'superAdminApp',
                            files:[
                                'resources/scripts/superAdmin/superAdminController.js',
                                
                            ]
                        });
                    }]

                },
                controller:'viewDepartmentController'
            }).
            
            when('/department-edit/:id', {
                templateUrl: 'superAdmin/adddepartment.html',
                resolve: {
                    loadMyFiles:['$ocLazyLoad',function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name:'superAdminApp',
                            files:[
                                'resources/scripts/superAdmin/superAdminController.js',
                                
                            ]
                        });
                    }]

                },
                controller:'editDepartmentController'
            }).otherwise({
                redirectTo: '/dashboard'
            });
}]);



//Initial Controller for Username
superAdminApp.controller('InitialController', [
    '$route','$routeParams', '$rootScope','$scope',
  'requestHandler',
  '$location',
  function ($route,$routeParams,$rootScope,$scope, requestHandler, $location) {
    $scope.hideValue = 1;
    
      $scope.$on('$routeChangeStart', function (next, current) {
    //	  alert("route change");
      $scope.activeClass = {};
      var currentPage = $location.url().substr(1).split("-");
      console.log(currentPage[0]);
      $scope.activeClass[currentPage[0]] = 'active';
      });
   
      $rootScope.$route=$route;
      $rootScope.$routeParams=$routeParams;
      $rootScope.$on('$routeChangeSuccess',function(event,current,previous){
    	  /*alert("route change success");*/
          if(previous!=undefined){
              $rootScope.previousState=previous.$$route.originalPath;
          }
      });
      requestHandler.getRequest("getCurrentDate.json","").then(function(response){
  		 $rootScope.currentDate=response.data.currentDate;
  		 console.log($rootScope.currentDate);
       });
     
     requestHandler.getRequest("getCurrentName.json","").then(function(response)
    		  {
   		 $rootScope.currentUser=response.data.currentName;
   		 
          
        });
      
 
  }
]);
