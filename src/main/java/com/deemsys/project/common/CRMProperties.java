package com.deemsys.project.common;

import java.io.InputStream;
import java.util.Properties;

import org.springframework.stereotype.Service;

@Service
public class CRMProperties {
	
	public String getProprty(String propertyName){
		String propertyValue="";
		try{
			Properties properties = new Properties();
			InputStream inputStream = null;
			inputStream=this.getClass().getResourceAsStream("/application.proprties");
			properties.load(inputStream);
			propertyValue=properties.getProperty(propertyName);
		}catch(Exception e){
			
		}
		return propertyValue;
	}
}
