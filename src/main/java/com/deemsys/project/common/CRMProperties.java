package com.deemsys.project.common;

import java.io.InputStream;
import java.net.URL;
import java.util.Properties;

import org.springframework.stereotype.Service;

@Service
public class CRMProperties {
	
	public String getProperty(String propertyName){
		String propertyValue="";
		try{
			Properties properties = new Properties();
			InputStream inputStream = null;
			inputStream=this.getClass().getResourceAsStream("/application.properties");
			properties.load(inputStream);
			propertyValue=properties.getProperty(propertyName);
		}catch(Exception e){
			
		}
		return propertyValue;
	}
	
	public String getTempLocation(){
		ClassLoader classLoader = this.getClass().getClassLoader();
		URL tempLocation=classLoader.getResource("temp");
		return tempLocation.toString();
	}
}
