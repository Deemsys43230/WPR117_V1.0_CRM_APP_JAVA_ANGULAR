package com.deemsys.project.login;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.encoding.Md5PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class PasswordEncryptor {

	@Autowired
	PasswordKey passwordKey;
	
	public String encodePassword(String password){
		
		Md5PasswordEncoder md5PasswordEncoder=new Md5PasswordEncoder();
		String encryptedPassword=md5PasswordEncoder.encodePassword(password, passwordKey.getSalt(null));
		return encryptedPassword;
		
	}
}
