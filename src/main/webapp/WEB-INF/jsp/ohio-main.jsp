<!DOCTYPE html>
<html lang="en">
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<head>
	<meta charset="UTF-8">
	
	<title>Police Reports</title>
		
	<!-- Main CSS file -->
	<link rel="stylesheet" href="resources/styles/bootstrap.css" />
	<link rel="stylesheet" href="resources/styles/font-awesome.css" />
	<link rel="stylesheet" href="resources/styles/style.css" />
	<link rel="stylesheet" href="resources/styles/responsive.css" />

	
	<!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
	<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
	<!--[if lt IE 9]>
	  <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
	  <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
	<![endif]-->
	
</head>

    <!-- SLIDER -->
     <div class="container" style="width:92%;">
		<img src="resources/images/slider/main.jpg" style="width:100%;"/>
	</div> 
<body>
<div class="min-height-200">
<section id="services">
	<div class="container search-form min-content-container">
		<div class="col-md-12">
			<h4>Police Departments <span class="pull-right"><a href="/CRM/" class="btn btn-default"><i class="fa fa-reply"> Back to Search</i></a></span></h4>
			
				<hr />
		</div>
		<div class="col-md-12" id="sessionout" style="color:#FF0000">Your Session has been expired. Please login again!<br/><br/></div>
		<div class="col-md-12">
			<div class="col-md-4"><label>Select Your Police Department:</label></div>
			<div class="col-md-5">
			<select id="policeDepartment" name="policeDepartment" class="form-control">
			<option value="">-- Select --</option>
			<option value="boardman">Boardman</option>
			<option value="fairborn">Fairborn</option>
			</select>
			<span id="ploiceDepartment_error" style="color:red;"></span>
			</div>
			<div class="col-md-1"></div>
			<div class="col-md-2"><a class="btn btn-default" onclick="goToLoginPage()">Go !</a></div>
		</div>
	</div>
</section>
</div>
<!-- <div class="col-md-12 search-form" style="min-height: 500px;">
<div class="container">
			<div class="row">
		
		</div>
		</div>
</div> -->
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
				<div class="col-sm-12 copyright text-center" >
					<p>&copy; 2017 Deemsys Inc. All Rights Reserved.</p>
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
</body>
<script type="text/javascript">
if(location.search=='?sessionout'){
	document.getElementById('sessionout').style.display = 'inline';
}else{
	document.getElementById('sessionout').style.display = 'none';
}

function goToLoginPage(){
	var redirectUrl=$("#policeDepartment").val();
	$("#ploiceDepartment_error").text("");
	var error=false;
	if(redirectUrl==''){
		error=true;
		$("#ploiceDepartment_error").text("Please Select Department");
	}
	
	if(!error){
		window.location=window.location.origin+"/CRM/"+redirectUrl;
	}
}
</script>
</html>
