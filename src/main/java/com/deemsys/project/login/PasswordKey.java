package com.deemsys.project.login;

import org.springframework.security.authentication.dao.SaltSource;
import org.springframework.security.core.userdetails.UserDetails;

public class PasswordKey implements SaltSource{

	@Override
	public Object getSalt(UserDetails arg0) {
		// TODO Auto-generated method stub
		return "aGmghfgk12gkll17";
	}
	
	
}
