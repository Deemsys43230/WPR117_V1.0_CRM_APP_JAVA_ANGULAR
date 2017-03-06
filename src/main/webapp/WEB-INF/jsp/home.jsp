<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">

	<title>Innova Consulting Group</title>
	
	<!-- Main CSS file -->
	<link rel="stylesheet" href="resources/styles/bootstrap.css" />
	<link rel="stylesheet" href="resources/styles/owl-carousel.css" />
	<link rel="stylesheet" href="resources/styles/magnific-popup.css" />
	<link rel="stylesheet" href="resources/styles/font-awesome.css" />
	<link rel="stylesheet" href="resources/styles/style.css" />
	<link rel="stylesheet" href="resources/styles/responsive.css" />
	<link rel="stylesheet" href="resources/styles/multi-select.css" />
	<link rel="stylesheet" href="resources/angular/angular-flash/angular-flash.css">

	<!-- Favicon -->
	<link rel="shortcut icon" href="resources/images/icon/favicon.png">
	<link rel="apple-touch-icon-precomposed" sizes="144x144" href="resources/images/icon/apple-touch-icon-144-precomposed.png">
	<link rel="apple-touch-icon-precomposed" sizes="114x114" href="resources/images/icon/apple-touch-icon-114-precomposed.png">
	<link rel="apple-touch-icon-precomposed" sizes="72x72" href="resources/images/icon/apple-touch-icon-72-precomposed.png">
	<link rel="apple-touch-icon-precomposed" href="resources/images/icon/apple-touch-icon-57-precomposed.png">
	
	<link rel="stylesheet" href="http://cdnjs.cloudflare.com/ajax/libs/select2/3.4.5/select2.css">
	<link rel="stylesheet" href="http://cdnjs.cloudflare.com/ajax/libs/selectize.js/0.8.5/css/selectize.default.css">
	
	<!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
	<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
	<!--[if lt IE 9]>
	  <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
	  <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
	<![endif]-->
	
</head>
<body ng-app="adminApp">
    <div ng-controller="InitialController">
        <div class="admin-side-bar">
            <div class="admin-logo"><img src="resources/images/logo-slogan-white.png"/></div>
            <ul class="admin-side-menu">
                <li><a href="#dashboard" class="{{activeClass.dashboard}}"><i class="fa fa-dashboard"></i> Dashboard</a></li>
                <li><a href="#jobManagement-jobList" class="{{activeClass.jobManagement}}"><i class="fa fa-suitcase"></i> Job Management</a></li>
                 <li><a href="#employers-List"  class="{{activeClass.employers}}"><i class="fa fa-user"></i> Employers</a></li>
                <li><a href="#jobSeekers-List"  class="{{activeClass.jobSeekers}}"><i class="fa fa-users"></i> Job Seekers</a></li>
               	<li><a href="#siteManagement-contactDetails" class="{{activeClass.siteManagement}}"><i class="fa fa-cogs"></i> Site Management</a></li>
                <li><a href="#capabilitySheet" class="{{activeClass.capabilitySheet}}"><i class="fa fa-files-o"></i> Capability Sheet</a></li>
                <li ng-cloak><a href="#contactUs-Messages" class="{{activeClass.contactUs}}"><i class="fa fa-inbox"></i> Contact Us Messages ({{unreadMessageCount}})</a></li>
             </ul>
        </div>

        <div class="admin-content-box clearfix">
            <div class="message-bar">
                <div class="user-name">Hi, admin <a href="j_spring_security_logout"><i class="fa fa-sign-out fa-fw"></i> Logout</a></div>
                <h3 class="admin-title" ng-bind="header"></h3>
            </div>

            <div ng-view></div>
            
        </div>
        <div class="admin-footer">&copy; 2016 Innova. All Rights Reserved.</div>
    </div>


	<!-- Scroll-up -->
	<div class="scroll-up">
		<ul><li><a href=""><i class="fa fa-angle-up"></i></a></li></ul>
	</div>

	
	<!-- JS -->
	<script type="text/javascript" src="resources/js/jquery.min.js"></script><!-- jQuery -->
	<script type="text/javascript" src="resources/js/bootstrap.min.js"></script><!-- Bootstrap -->

    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.5/angular.min.js"></script>
     <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.5/angular-animate.min.js"></script>
    <script type="text/javascript" src="resources/scripts/adminApp.js"></script>
    <script type="text/javascript" src="resources/angular/angular-route-1.4.5.js"></script>
    <script type="text/javascript" src="resources/angular/ocLazyLoad.min.js"></script>
    <script type="text/javascript" src="resources/angular/angular-cookies-1.4.5.js"></script>
    <script type="text/javascript" src="scripts/services/requestHandler.js"></script>
    <script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.2.18/angular-sanitize.js"></script>
    <script src="resources/angular/angular-summer.js"></script>

	<script type="text/javascript" src="resources/js/jquery.parallax.js"></script><!-- Parallax -->
	<script type="text/javascript" src="resources/js/smoothscroll.js"></script><!-- Smooth Scroll -->
	<script type="text/javascript" src="resources/js/masonry.pkgd.min.js"></script><!-- masonry -->
	<script type="text/javascript" src="resources/js/jquery.fitvids.js"></script><!-- fitvids -->
	<script type="text/javascript" src="resources/js/owl.carousel.min.js"></script><!-- Owl-Carousel -->
	<script type="text/javascript" src="resources/js/jquery.counterup.min.js"></script><!-- CounterUp -->
	<script type="text/javascript" src="resources/js/waypoints.min.js"></script><!-- CounterUp -->
	<script type="text/javascript" src="resources/js/jquery.isotope.min.js"></script><!-- isotope -->
	<script type="text/javascript" src="resources/js/jquery.magnific-popup.min.js"></script><!-- magnific-popup -->
	<script type="text/javascript" src="http://maps.googleapis.com/maps/api/js"></script><!-- google map -->
	<script type="text/javascript" src="resources/js/scripts.js"></script><!-- Scripts -->
	<script src="resources/js/multi-select.js"></script>
    <script src="resources/js/jquery.contact-buttons.js"></script>
    <script src="resources/angular/angular-flash/angular-flash.min.js"></script>
    <script src="resources/angular/angular-utils-pagination/dirPagination.js"></script>
    <!-- <script src="resources/angular/angular-media-preview-master/dist/angular-media-preview.min.js"></script> -->
</body>
</html>