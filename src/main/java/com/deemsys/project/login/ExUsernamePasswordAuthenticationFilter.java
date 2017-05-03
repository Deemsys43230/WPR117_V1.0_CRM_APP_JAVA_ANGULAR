package com.deemsys.project.login;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.deemsys.project.common.CRMConstants;

public class ExUsernamePasswordAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
	
	private String extraParameter = CRMConstants.DEPARTMENT_PARAMETER;
	private String delimiter = CRMConstants.USERNAME_DELIMETER;
	
	@Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        final String dbValue = request.getParameter(getExtraParameter());
        request.getSession().setAttribute(getExtraParameter(), dbValue);
        return super.attemptAuthentication(request, response); 
    } 
	
	@Override
	protected String obtainUsername(HttpServletRequest request) {
		String username = request.getParameter(getUsernameParameter());
		String extraInput = request.getParameter(getExtraParameter()) == null ? ""
		: request.getParameter(getExtraParameter());
		
		String combinedUsername = "";
		String extParam = extraInput.trim();
		if (extParam.length() == 0) {
		combinedUsername = username;
		} else {
		combinedUsername = username + getDelimiter() + extraInput;
		}
		return combinedUsername;
	}
	/**
	* @return The parameter name which will be used to obtain the extra input
	* from the login request
	*/
	public String getExtraParameter() {
	return this.extraParameter;
	}

	/**
	* @param extraParameter
	* The parameter name which will be used to obtain the extra
	* input from the login request
	*/
	public void setExtraParameter(String extraParameter) {
		this.extraParameter = extraParameter;
	}

	/**
	* @return The delimiter string used to separate the username and extra
	* input values in the string returned by
	* obtainUsername()
	*/
	public String getDelimiter() {
		return this.delimiter;
	}

	/**
	* @param delimiter
	* The delimiter string used to separate the username and extra
	* input values in the string returned by
	* obtainUsername()
	*/
	public void setDelimiter(String delimiter) {
		this.delimiter = delimiter;
	}
}
