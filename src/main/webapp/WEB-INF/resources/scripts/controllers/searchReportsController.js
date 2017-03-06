/**
 * Created by user on 18/5/16.
 */

var commonApp = angular.module('commonApp',['flash','requestModule']);
commonApp.controller('SearchReportsController',['$scope','$http',function($scope,$http){

	$scope.showResult=false;	
	
}]);