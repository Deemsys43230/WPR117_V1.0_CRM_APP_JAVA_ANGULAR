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

                <!-- /.dropdown -->
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

            <div class="navbar-default sidebar" role="navigation">
                <div class="sidebar-nav navbar-collapse">
                    <ul class="nav" id="side-menu">
                      
                        <li>
                            <a  href="#/dashboard" class="{{activeClass.dashboard}}"><i class="fa fa-dashboard fa-fw"></i> Dashboard</a>
                        </li>
                        <li>
                            <a href="#/department" class="{{activeClass.department}}"><i class="fa fa-id-badge fa-fw"></i>Department</a>
                        </li>
                        <li>
                            <a href="#/accounts" class="{{activeClass.accounts}}"><i class="fa fa-users fa-fw"></i> Accounts</a>
                        </li>
                        <li>
                            <a href="#/reports" class="{{activeClass.reports}}"><i class="fa fa-file fa-fw" ></i> Reports</a>
                           
                            
                        </li>
                        
                       <!--  <li>
                            <a href="forms.html"><i class="fa fa-edit fa-fw"></i> Forms</a>
                        </li>
                        <li>
                            <a href="#"><i class="fa fa-wrench fa-fw"></i> UI Elements</a>
                            <ul class="nav nav-second-level">
                                <li>
                                    <a href="panels-wells.html">Panels and Wells</a>
                                </li>
                                <li>
                                    <a href="buttons.html">Buttons</a>
                                </li>
                                <li>
                                    <a href="notifications.html">Notifications</a>
                                </li>
                                <li>
                                    <a href="typography.html">Typography</a>
                                </li>
                                <li>
                                    <a href="icons.html"> Icons</a>
                                </li>
                                <li>
                                    <a href="grid.html">Grid</a>
                                </li>
                            </ul>
                            /.nav-second-level
                        </li>
                        <li>
                            <a href="#"><i class="fa fa-sitemap fa-fw"></i> Multi-Level Dropdown</a>
                            <ul class="nav nav-second-level">
                                <li>
                                    <a href="#">Second Level Item</a>
                                </li>
                                <li>
                                    <a href="#">Second Level Item</a>
                                </li>
                                <li>
                                    <a href="#">Third Level <span class="fa arrow"></span></a>
                                    <ul class="nav nav-third-level">
                                        <li>
                                            <a href="#">Third Level Item</a>
                                        </li>
                                        <li>
                                            <a href="#">Third Level Item</a>
                                        </li>
                                        <li>
                                            <a href="#">Third Level Item</a>
                                        </li>
                                        <li>
                                            <a href="#">Third Level Item</a>
                                        </li>
                                    </ul>
                                    /.nav-third-level
                                </li>
                            </ul>
                            /.nav-second-level
                        </li>
                        <li>
                            <a href="#"><i class="fa fa-files-o fa-fw"></i> Sample Pages</a>
                            <ul class="nav nav-second-level">
                                <li>
                                    <a href="blank.html">Blank Page</a>
                                </li>
                                <li>
                                    <a href="login.html">Login Page</a>
                                </li>
                            </ul>
                            /.nav-second-level
                        </li>
 -->                    </ul>
                </div>
                <!-- /.sidebar-collapse -->
            </div>
            <!-- /.navbar-static-side -->
        </nav></div>

<div id="page-wrapper" class="ng-view">
</div>
 
<div class="container-fluid" style="background-color:#383838; color:white; height:40px; padding-top:10px;" >
 <div class="footer col-md-12">&copy; 2017 Deemsys Inc - All Rights Reserved</div>
</div>
</body>
</html>