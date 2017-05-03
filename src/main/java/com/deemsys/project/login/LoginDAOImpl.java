package com.deemsys.project.login;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;

import org.hibernate.Criteria;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.deemsys.project.common.BasicQuery;
import com.deemsys.project.common.CRMConstants;
import com.deemsys.project.entity.Users;

/**
 * 
 * @author Deemsys
 *
 */
@Repository
@Transactional
public class LoginDAOImpl implements LoginDAO,UserDetailsService{
	
	
	@Autowired
	SessionFactory sessionFactory;
	
	@Override
	public void save(Users entity) {
		// TODO Auto-generated method stub
		this.sessionFactory.getCurrentSession().save(entity);
	}

	@Override
	public void merge(Users entity) {
		// TODO Auto-generated method stub
		this.sessionFactory.getCurrentSession().merge(entity);
	}	
	
	@Override
	public Users get(Integer id) {
		// TODO Auto-generated method stub
		return (Users) this.sessionFactory.getCurrentSession().get(Users.class, id);
	}

	@Override
	public Users update(Users entity) {
		// TODO Auto-generated method stub
		this.sessionFactory.getCurrentSession().merge(entity);
		return null;
	}

	@Override
	public void delete(Integer id) {
		// TODO Auto-generated method stub
		this.sessionFactory.getCurrentSession().delete(this.get(id));
		
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Users> getAll() {
		// TODO Auto-generated method stub
		return this.sessionFactory.getCurrentSession().createCriteria(Users.class).list();
	}

	@Override
	public List<Users> find(String paramName, String paramValue) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Users> find(String paramName, Long paramValue) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Users> find(String paramName, Integer paramValue) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Users> find(BasicQuery query) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Users> find(String queryString, String[] paramNames,
			String[] paramValues) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Users> find(String ParamName, Date date1, Date date2) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Users> find(String ParamName, Date date) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean disable(Integer id) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean enable(Integer id) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean checkName(String name) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean checkName(Integer id, String name) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public List<Users> getActiveList() {
		// TODO Auto-generated method stub
		return null;
	}

	//Function that overrides the default spring security
	// User Name will be combined with police department Id while login by Login Form
	// User Name alone will be return while getting oauth
	@Override
	public UserDetails loadUserByUsername(String username)
			throws UsernameNotFoundException {
		// TODO Auto-generated method stub
		
		String splitUserDetails[]=username.split(CRMConstants.USERNAME_DELIMETER);
		String userName=splitUserDetails[0];
		String departmentId="";
		
		if(splitUserDetails.length<=1){
			// Getting Department Id By User Oauth Login
			HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
			departmentId=request.getParameter(CRMConstants.DEPARTMENT_PARAMETER);
		}else{
			// Getting Department Id By User Form Login
			departmentId=splitUserDetails[1];
		}
		Users userLoginDetails=this.getByUsernameAndDepartment(userName,Integer.parseInt(departmentId));
		List<GrantedAuthority> grantedAuthorities = new ArrayList<GrantedAuthority>();
		
		if(userLoginDetails!=null)
			grantedAuthorities=buildUserAuthority(userLoginDetails);
		
		return buildUserForAuthentication(username, userLoginDetails, grantedAuthorities);
	}
	
	public List<GrantedAuthority> buildUserAuthority(Users users){
		Set<GrantedAuthority> setGrantedAuthorities = new HashSet<GrantedAuthority>();
		setGrantedAuthorities.add(new SimpleGrantedAuthority(users.getRoles().getRole()));
		List<GrantedAuthority> buildGrantedAuthorities = new ArrayList<GrantedAuthority>(setGrantedAuthorities);
		return buildGrantedAuthorities;
	}
	
	public User buildUserForAuthentication(String username, Users userLoginDetails, List<GrantedAuthority> grantedAuthorities){
		String password;
		boolean isEnable=true,accountNonExpired=true,credentialsNonExpired=true,accountNonLocked=true;
		if(userLoginDetails==null){
			password="";
		}else{
			password=userLoginDetails.getPassword();
			if(userLoginDetails.getIsEnable()==1){
				isEnable=true;
			}else{
				isEnable=false;
			}
		}
		
		return new User(username, password, isEnable, accountNonExpired, credentialsNonExpired, accountNonLocked, grantedAuthorities);
	}
	
	@Override
	public Users getByUsername(String username) {
		// TODO Auto-generated method stub
		return (Users) this.sessionFactory.getCurrentSession().createCriteria(Users.class).add(Restrictions.eq("username", username)).uniqueResult();
	}

	@Override
	public Users getByUsernameAndDepartment(String username,Integer departmentId) {
		// TODO Auto-generated method stub
		Criteria criteria = this.sessionFactory.getCurrentSession().createCriteria(Users.class,"u1");
		criteria.createAlias("u1.accounts", "a1");
		criteria.add(Restrictions.and(Restrictions.eq("u1.username", username),Restrictions.eq("a1.policeDepartment.policeDepartmentId", departmentId)));
		return (Users) criteria.uniqueResult();
	}
	

}
