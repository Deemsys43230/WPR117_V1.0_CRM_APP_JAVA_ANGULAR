<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">

<title>Admin Panel</title>
	<link rel="stylesheet" href="resources/styles/bootstrap.css" />
	<link rel="stylesheet" href="resources/styles/sb-admin-2.css"/>
			<link rel="stylesheet" href="resources/styles/font-awesome.css" />
			<link rel="stylesheet" href="resources/angular/angular-flash/angular-flash.css"/>
			
	

</head>
<body ng-app="superAdminApp">

<script type="text/javascript" src="resources/js/jquery.min.js"></script><!-- jQuery -->
	<script type="text/javascript" src="resources/js/bootstrap.min.js"></script><!-- Bootstrap -->
	    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.5/angular.min.js"></script>
	    <script type="text/javascript" src="resources/angular/angular-route-1.4.5.js"></script>
	 <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.5/angular-animate.min.js"></script>
     <script src="scripts/superAdmin/superAdminApp.js" type="text/javascript"></script>
<script type="text/javascript" src="scripts/services/requestHandler.js"></script>
<script type="text/javascript" src="resources/angular/ocLazyLoad.min.js"></script>
<script type="text/javascript" src="resources/angular/angular-cookies-1.4.5.js"></script>
    <script src="resources/angular/angular-utils-pagination/dirPagination.js"></script> 
	<script src="resources/angular/angular-flash/angular-flash.min.js"></script>
	     <script src="scripts/superAdmin/superAdminService.js" type="text/javascript"></script>
	     <script src="scripts/superAdmin/superAdminDirective.js" type="text/javascript"></script>
	     <script type="text/javascript" src="resources/js/superAdmin/metisMenu.min.js"></script>
	     	     <script type="text/javascript" src="resources/js/superAdmin/sb-admin-2.js"></script>
	     	     	<script src="resources/angular/components/datetime/moment.js"></script>
	     	     
	     
	

 <div id="wrapper"  ng-controller="InitialController">

        <!-- Navigation -->
        <nav class="navbar navbar-default navbar-fixed-top" role="navigation">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <p class="navbar-brand">Crash Reports Upload - <mark>Admin Interface</mark></p>
                
            </div>
            <!-- /.navbar-header -->
 
            <ul class="nav navbar-top-links navbar-right">
  <!-- /.dropdown --><span style="color:white;align:right;">sadmin</span>
                <li class="dropdown">
                    <a class="dropdown-toggle" data-toggle="dropdown">
                    
                        <i class="fa fa-user fa-fw"></i> <i class="fa fa-caret-down"></i>
                    </a>
                    <ul class="dropdown-menu dropdown-user">
                       
                        <li><a href="#/changePassword"><i class="fa fa-gear fa-fw"></i>Change Password</a>
                        </li>
                        <li class="divider"></li>
                        <li><a href="j_spring_security_logout"><i class="fa fa-sign-out fa-fw"></i> Logout</a>
                        </li>
                    </ul>
                    <!-- /.dropdown-user -->
                </li>
                <!-- /.dropdown -->
            </ul>
            <!-- /.navbar-top-links -->


                <nav class="main-menu">
        <ul>
                      
<li class="{{activeClass.dashboard}}">
    <a  href="#/dashboard">
   <i class="fa fa-dashboard fa-fw fa-2x"></i>
    <span class="nav-text"> Dashboard</span></a>
</li>


<li class="{{activeClass.department}}">
    <a href="#/department">
    <i class="fa fa-university fa-fw  fa-2x" ></i>
    <!-- <i class="fa fa-id-badge fa-fw fa-2x"></i> -->
    <span class="nav-text">Department</span></a>
</li>


<li class="{{activeClass.accounts}}">
    <a href="#/accounts">
    <i class="fa fa-users fa-fw fa-2x"></i>
    <span class="nav-text">Accounts</span></a>
</li>


<li class="{{activeClass.reports}}">
    <a href="#/reports" >
    <i class="fa fa-file fa-fw fa-2x" ></i>
    <span class="nav-text">Reports</span></a></li>

<li class="{{activeClass.occupants}}">
    <a href="#/occupants" >
    <i class="fa fa-user fa-fw fa-2x" ></i>
    <span class="nav-text">Occupants</span></a></li>
<!--     
<li class="{{activeClass.settings}}">
    <a href="#/settings" >
    <i class="fa fa-gear fa-fw fa-2x" ></i>
    <span class="nav-text">Settings</span></a></li> -->


</ul>
            
       
            
            
        </nav>
                
 </div>
<!-- /.sidebar-collapse -->

<!-- /.sidebar-collapse -->

<!--/.navbar-static-side -->

</nav>



 </div>


<div id="page-wrapper" class="ng-view">
</div>
<div  class="footer">
<span>&nbsp;</span>&copy;2017  Deemsys Inc</div>   

</nav>


 


</body>
</html>