var adminApp=angular.module('ReportSearchModule',[]);

adminApp.service('reportSearchService',function(){
	var crashDate="";
	var reportNumber="";
	var firstName="";
	var lastName="";
	var addedOnFromDate="";
	var addedOnToDate="";
	var reportType=1;
	var verifiedStatus="4";
	var pageNumber=1;
	var itemsPerPage="10";
	var searchType=1;
	
	this.getCrashDate=function(){
		return crashDate;
	};
	
	this.setCrashDate=function(crashDateInput){
		crashDate = crashDateInput;
	};
	
	this.getReportNumber=function(){
		return reportNumber;
	};
	
	this.setReportNumber=function(reportNumberInput){
		reportNumber = reportNumberInput;
	};
	
	this.getFirstName=function(){
		return firstName;
	};
	
	this.setFirstName=function(firstNameInput){
		firstName = firstNameInput;
	};
	
	this.getLastName=function(){
		return lastName;
	};
	
	this.setLastName=function(lastNameInput){
		lastName = lastNameInput;
	};
	
	this.getReportType=function(){
		return reportType;
	};
	
	this.setReportType=function(reportTypeInput){
		reportType = reportTypeInput;
	};
	
	this.getVerifiedStatus=function(){
		return verifiedStatus;
	};
	
	this.setVerifiedStatus=function(verifiedStatusInput){
		verifiedStatus = verifiedStatusInput;
	};
	
	this.getAddedOnFromDate=function(){
		return addedOnFromDate;
	};
	
	this.setAddedOnFromDate=function(addedOnFromDateInput){
		addedOnFromDate = addedOnFromDateInput;
	};
	
	this.getAddedOnToDate=function(){
		return addedOnToDate;
	};
	
	this.setAddedOnToDate=function(addedOnToDateInput){
		addedOnToDate = addedOnToDateInput;
	};
	
	this.getPageNumber=function(){
		return pageNumber;
	};
	
	this.setPageNumber=function(pageNumberInput){
		pageNumber = pageNumberInput;
	};
	
	this.getItemsPerPage=function(){
		return itemsPerPage;
	};
	
	this.setItemsPerPage=function(itemsPerPageInput){
		itemsPerPage = itemsPerPageInput;
	};
	
	this.getSearchType=function(){
		return searchType;
	};
	
	this.setSearchType=function(searchTypeInput){
		searchType = searchTypeInput;
	};
	
	this.resetSearchData=function(){
		crashDate="";
		reportNumber="";
		firstName="";
		lastName="";
		addedOnFromDate="";
		addedOnToDate="";
		reportType=1;
		verifiedStatus="4";
		pageNumber=1;
		itemsPerPage="10";
		searchType=1;
	};
});