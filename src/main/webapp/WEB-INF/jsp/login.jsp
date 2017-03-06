<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">

	<title>Innova Consulting Group</title>
	<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
	<!-- Main CSS file -->
	<link rel="stylesheet" href="resources/styles/bootstrap.css" />
	<link rel="stylesheet" href="resources/styles/font-awesome.css" />
	<link rel="stylesheet" href="resources/styles/style.css" />
	<link rel="stylesheet" href="resources/styles/responsive.css" />

	<!-- Favicon -->
	<link rel="shortcut icon" href="resources/images/icon/favicon.png">
	<link rel="apple-touch-icon-precomposed" sizes="144x144" href="resources/images/icon/apple-touch-icon-144-precomposed.png">
	<link rel="apple-touch-icon-precomposed" sizes="114x114" href="resources/images/icon/apple-touch-icon-114-precomposed.png">
	<link rel="apple-touch-icon-precomposed" sizes="72x72" href="resources/images/icon/apple-touch-icon-72-precomposed.png">
	<link rel="apple-touch-icon-precomposed" href="resources/images/icon/apple-touch-icon-57-precomposed.png">
	
	<!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
	<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
	<!--[if lt IE 9]>
	  <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
	  <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
	<![endif]-->
	
</head>
<body>
    <div class="col-md-10 col-md-offset-1">
        <div class="col-md-6 col-md-offset-3">
            <br/><br/><br/>
            <div class="jumbotron clearfix">
                <div class="text-center"><img src="resources/images/logo.png" alt=""></div>
                <hr/>
                 <c:if test="${not empty param['error']}">
		                            <div style="color:#FF0000;padding-left:20px;"><i class="fa fa-exclamation-triangle"></i>&nbsp;${sessionScope["SPRING_SECURITY_LAST_EXCEPTION"].message}<br/><br/></div>
		                             </c:if>
                 <form role="form" action="j_spring_security_check" method="post">
                <div class="col-md-10 col-md-offset-1"><br/>
                    <input class="form-control-login" placeholder="Username" name="username" id="username" autofocus>
                    <div class="error-container" style="margin-top:-20px;">
                    <span id="username_error"></span>
                    </div>
                </div>
                <div class="col-md-10 col-md-offset-1">
                <input type="password" class="form-control-login" placeholder="Password" name="password" id="password">
                    <div class="error-container" style="margin-top:-20px;">
                    <span id="password_error"></span>
                    </div>
                </div>
                 <div class="col-md-10 col-md-offset-1">
                <button type="submit" onclick="return checkValidation()" class="btn-readmore">Login</button>
                    <a href="index" class="pull-right margin-top-25"><i class="fa fa-arrow-circle-left">&nbsp;&nbsp;</i>Go To Site Main Page</a>
                </div>
                </form>
            </div>
        </div>
    </div>

	<!-- JS -->
	<script type="text/javascript" src="resources/js/jquery.min.js"></script><!-- jQuery -->
	<script type="text/javascript" src="resources/js/bootstrap.min.js"></script><!-- Bootstrap -->
	
	<script>
	
		/* if(location.search=='?sessionout'){
			document.getElementById('sessionout').style.display = 'inline';
		}else{
			document.getElementById('sessionout').style.display = 'none';
		} */
		
		
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
</body>
</html>