package com.deemsys.project.login;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

public class CustomAuthenticationToken extends UsernamePasswordAuthenticationToken {

	public CustomAuthenticationToken(Object principal, Object credentials) {
		super(principal, credentials);
		// TODO Auto-generated constructor stub
	}

}
