package com.deemsys.project.APIRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.deemsys.project.common.CRMProperties;
import com.google.gson.Gson;

@Service
public class APIRequestService {
	
	@Autowired
	CRMProperties crmProperties;
	
	public String saveRunnerReportInCRO(CrashReportForm crashReportForm){
		RestTemplate restTemplate = new RestTemplate();
		Gson gson=new Gson();
		String requestJson = gson.toJson(crashReportForm);
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);

		HttpEntity<String> entity = new HttpEntity<String>(requestJson,headers);
		String result=restTemplate.postForObject(crmProperties.getProperty("CROAppDomain")+crmProperties.getProperty("saveRunnerReportAPI"), entity, String.class);
		
		return result;
	}
}
