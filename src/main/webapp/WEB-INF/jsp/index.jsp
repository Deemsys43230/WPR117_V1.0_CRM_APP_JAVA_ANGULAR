<!DOCTYPE html>
<html lang="en">
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<head>
	<meta charset="UTF-8">
	
	<title>Police Reports</title>
		
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
    <div class="container" style="width:92%;">
		<img src="resources/images/slider/01.jpg" style="width:100%;"/>
	</div>
<body>

	
    	<!-- SERVICES -->
	<section id="services">
		<div class="container">
			<div class="col-md-6">
			<p class="brown-text">This page is for the Police Department officials to upload
				crash reports. (Sign in required)</p>
			<hr />	
		</div>
		
				<div class="col-md-6 login-form">
						<h4>Sign In</h4>
						<hr/>
						<c:if test="${not empty param['error']}">
		                            <div style="color:#FF0000;padding-left:20px;"><i class="fa fa-exclamation-triangle"></i>&nbsp;${sessionScope["SPRING_SECURITY_LAST_EXCEPTION"].message}<br/><br/></div>
		                             </c:if>
						<form class="contact-form" name="indexjobForm" action="j_spring_security_check" method="post" novalidate>
						<div id="sessionout" style="color:#FF0000">Your Session has been expired. Please login again!<br/><br/></div>
                            <h5>Username<span class="text-red"><sup>*</sup></span></h5>
                                <input type="text" class="form-control" name="username" placeholder="Username" id="username" maxlength="25">
                                <div class="error-container" >
                                 <span id="username_error"></span>
                              	</div>
                            	<h5>Password</span><span class="text-red"><sup>*</sup></span></h5>
                                <input type="password" class="form-control" placeholder="Password" name="password" id="password">
                                <div class="error-container" >
                                 <span id="password_error"></span>
                              	</div>                               
                                <input type="submit" name="submit" onclick="return checkValidation()" value="Sign In" class="btn-send">
                    	</form>
			</div>
			<div class="col-md-12" style="padding:20px;">
			<p class="brown-text">Not what you are looking for?
			<a href="/CRM">Click Here</a> to search and download your crash reports.</p>
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
					<p>&copy; 2017 <a href="">Deemsys Inc</a>. All Rights Reserved.</p>
				</div>
			</div>
		</div>
	</footer>
	<!-- /FOOTER -->


	<!-- Scroll-up -->
	<div class="scroll-up">
		<ul><li><a href=""><i class="fa fa-angle-up"></i></a></li></ul>
	</div>

	
	
	<script>
	if(location.search=='?sessionout'){
		document.getElementById('sessionout').style.display = 'inline';
	}else{
		document.getElementById('sessionout').style.display = 'none';
	}
	
	function checkValidation(){
		var username=document.getElementById("username").value;
		var password=document.getElementById("password").value;
	
		document.getElementById("username_error").innerText="";
		document.getElementById("password_error").innerText="";
		
		var error=false;
		if(username==""){
			error=true;
			document.getElementById("username_error").innerText="Please Enter Username";
		}
		if(password==""){
			error=true;
			document.getElementById("password_error").innerText="Please Enter Password";
		}
		if(error){
			return false;
		}else{
			return true;
		}
	}
	</script>
	
	
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