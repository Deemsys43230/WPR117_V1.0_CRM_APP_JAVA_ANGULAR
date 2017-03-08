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
            }).
            when('/reports', {
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
            }).
            otherwise({
                redirectTo: '/reports'
            });
    }]);

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
