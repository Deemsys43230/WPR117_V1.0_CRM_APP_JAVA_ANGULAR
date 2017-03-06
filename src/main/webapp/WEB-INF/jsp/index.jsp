<!DOCTYPE html>
<html lang="en">
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<head>
	<meta charset="UTF-8">
	
	<title>Innova Consulting Group</title>
	
	<meta property="og:image" content="<c:out value="${image}"/>"/>
	<meta property="og:title" content="<c:out value="${title}"/>"/>
	<meta property="og:description" content="<c:out value="${description}"/>" />
	<meta property="og:url" content="<c:out value="${url}"/>"/>
	<meta property="og:site_name" content="Innova Consulting Group"/>
	<meta property="og:type" content="website"/>
	<meta name="author" content="Innova Consulting Group"/>
	<meta property="fb:app_id" content="2054449691447123">
	
	<!-- Main CSS file -->
	<link rel="stylesheet" href="resources/styles/bootstrap.css" />
	<link rel="stylesheet" href="resources/styles/owl-carousel.css" />
	<link rel="stylesheet" href="resources/styles/magnific-popup.css" />
	<link rel="stylesheet" href="resources/styles/font-awesome.css" />
	<link rel="stylesheet" href="resources/styles/style.css" />
	<link rel="stylesheet" href="resources/styles/responsive.css" />

	<!-- Favicon -->
	<link rel="shortcut icon" href="resources/images/icon/favicon.png">
	<link rel="apple-touch-icon-precomposed" sizes="144x144" href="resources/styles/icon/apple-touch-icon-144-precomposed.png">
	<link rel="apple-touch-icon-precomposed" sizes="114x114" href="resources/styles/icon/apple-touch-icon-114-precomposed.png">
	<link rel="apple-touch-icon-precomposed" sizes="72x72" href="resources/styles/icon/apple-touch-icon-72-precomposed.png">
	<link rel="apple-touch-icon-precomposed" href="resources/styles/icon/apple-touch-icon-57-precomposed.png">
	
	<!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
	<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
	<!--[if lt IE 9]>
	  <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
	  <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
	<![endif]-->
	
</head>

    <!-- SLIDER -->
	<section id="slider">
		<div id="home-carousel" class="carousel slide" data-ride="carousel">
			<div class="carousel-inner">
				<div class="item active" style="background-image: url(resources/images/slider/01.jpg)">
					<div class="carousel-caption container">
						<div class="row">
							<div class="col-sm-7">
								<h1>You are entire </h1>
								<h2>creative world</h2>
								<p>This is Photoshop's version  of Lorem Ipsum. Proin gravida nibh vel velit auctor. Aenean sollicitudin, lorem quis bibendum auctor.</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div> <!--/#home-carousel-->
    </section>
<body>

	
    	<!-- SERVICES -->
	<section id="services">
		<div class="container">
			<div class="col-md-6">
			<p>This page is for the Police Department oficials to upload
				crash reports. (Sign in required)</p>
			<hr />
			<p>Not what you are looking for? To Search and Download your
				crash reports.</p>
			<hr />
			<div class="text-center">
				<a href="search" class="btn btn-lg btn-primary" >Search Report</a>
			</div>
		</div>
				<div class="col-md-6 login-form">
				<p>To Upload Reports</p>
						<h4>Sign In</h4>
						<hr/>
						<form class="contact-form" name="indexjobForm" action="j_spring_security_check" method="post" novalidate>
                            <h5>Username<span class="text-red"><sup>*</sup></span></h5>
                                <input type="text" name="username" placeholder="Username" id="username" maxlength="25">
                                <div class="error-container" >
                                 <div ng-show="submitted">
	                          			<span ng-cloak ng-show="indexjobForm.firstName.$error.required">Please Enter First Name</span>
	                          			<span ng-cloak ng-show="!indexjobForm.firstName.$error.required&&indexjobForm.firstName.$error.validateName">Please Enter Valid Name</span>
	                              </div>
                              	</div>
                            	<h5>Password</span><span class="text-red"><sup>*</sup></span></h5>
                                <input type="text" placeholder="Password" name="password" id="password">
                                <div class="error-container" >
                                 <div ng-show="submitted">
	                          			<span ng-cloak ng-show="indexjobForm.lastName.$error.required">Please Enter Last Name</span>
	                          			<span ng-cloak ng-show="!indexjobForm.lastName.$error.required&&indexjobForm.lastName.$error.validateName">Please Enter Valid Name</span>
	                              </div>
                              	</div>                               
                                <input type="submit" name="submit" value="Sign In" class="btn">
                            	<div flash-message="2000" class="col-md-8 pull-right no-padding"></div>
                    	</form>
			</div>
		</div>
	</section>
	<!-- /SERVICES -->

	<!-- FOOTER -->
	<footer id="footer">
		<div class="container">
			<div class="row">
				<!-- SOCIAL ICONS -->
				<!--<div class="col-sm-6 col-sm-push-6 footer-social-icons">
					<span>Follow us:</span>
					<a href="#"><i class="fa fa-facebook"></i></a>
					<a href="#"><i class="fa fa-twitter"></i></a>
					<a href="#"><i class="fa fa-google-plus"></i></a>
					<a href="#"><i class="fa fa-pinterest-p"></i></a>
				</div>-->
				<!-- /SOCIAL ICONS -->
				<div class="col-sm-12 copyright text-center">
					<p>&copy; 2016 <a href="">Deemsys Inc</a>. All Rights Reserved.</p>
				</div>
			</div>
		</div>
	</footer>
	<!-- /FOOTER -->


	<!-- Scroll-up -->
	<div class="scroll-up">
		<ul><li><a href=""><i class="fa fa-angle-up"></i></a></li></ul>
	</div>

	
	<!-- JS -->
	<script type="text/javascript" src="resources/js/jquery.min.js"></script><!-- jQuery -->
	<script type="text/javascript" src="resources/js/bootstrap.min.js"></script><!-- Bootstrap -->

    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.5/angular.min.js"></script>
     <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.5/angular-animate.min.js"></script>
    <script type="text/javascript" src="scripts/app.js"></script>
    <script type="text/javascript" src="scripts/services/requestHandler.js"></script>
    <script type="text/javascript" src="resources/angular/angular-route-1.4.5.js"></script>
    <script type="text/javascript" src="resources/angular/ocLazyLoad.min.js"></script>
    <script type="text/javascript" src="resources/angular/angular-cookies-1.4.5.js"></script>

	<script type="text/javascript" src="resources/js/jquery.parallax.js"></script><!-- Parallax -->
	<script type="text/javascript" src="resources/js/smoothscroll.js"></script><!-- Smooth Scroll -->
	<script type="text/javascript" src="resources/js/masonry.pkgd.min.js"></script><!-- masonry -->
	<script type="text/javascript" src="resources/js/jquery.fitvids.js"></script><!-- fitvids -->
	<script type="text/javascript" src="resources/js/owl.carousel.min.js"></script><!-- Owl-Carousel -->
	<script type="text/javascript" src="resources/js/jquery.counterup.min.js"></script><!-- CounterUp -->
	<script type="text/javascript" src="resources/js/waypoints.min.js"></script><!-- CounterUp -->
	<script type="text/javascript" src="resources/js/jquery.isotope.min.js"></script><!-- isotope -->
	<script type="text/javascript" src="resources/js/jquery.magnific-popup.min.js"></script><!-- magnific-popup -->
	<script type="text/javascript" src="resources/js/scripts.js"></script><!-- Scripts -->
	
	<!-- Directive -->
	<script type="text/javascript" src="resources/scripts/directives/fileUpload.js"></script>
    <script src="resources/angular/angular-flash/angular-flash.min.js"></script>
    <link rel="stylesheet" href="resources/angular/angular-flash/angular-flash.css"/>
     <!-- dirPagination -->
    <script src="resources/angular/angular-utils-pagination/dirPagination.js"></script> 
</body>
</html>