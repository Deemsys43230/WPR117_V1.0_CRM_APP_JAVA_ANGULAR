package com.deemsys.project.login;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;

import com.deemsys.project.common.CRMConstants;

public class UserNameCachingAuthenticationFailureHandler extends SimpleUrlAuthenticationFailureHandler {

    public static final String LAST_DEPARTMENT_KEY = "LAST_DEPARTMENT";


    @Override
    public void onAuthenticationFailure(
            HttpServletRequest request, HttpServletResponse response,
            AuthenticationException exception)
            throws IOException, ServletException {

        super.onAuthenticationFailure(request, response, exception);

        String departmentParameter = CRMConstants.DEPARTMENT_PARAMETER;
        String departmentId = request.getParameter(departmentParameter);

        HttpSession session = request.getSession(false);
        if (session != null || isAllowSessionCreation()) {
            request.getSession().setAttribute(LAST_DEPARTMENT_KEY, departmentId);
        }
    }
}