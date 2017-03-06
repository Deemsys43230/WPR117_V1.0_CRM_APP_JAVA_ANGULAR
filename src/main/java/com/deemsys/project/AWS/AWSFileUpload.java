package com.deemsys.project.AWS;

import java.io.File;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.amazonaws.AmazonClientException;
import com.amazonaws.AmazonServiceException;
import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.deemsys.project.common.CRMProperties;

@Service
public class AWSFileUpload {
	
	@Autowired
	CRMProperties crmProperties;
	
	public void uploadFileToAWSS3(String filePath,String fileName){
		
		String bucketName=crmProperties.getProprty("bucketName");
		String folderName=crmProperties.getProprty("folderName");
		try{
		// credentials object identifying user for authentication
		// user must have AWSConnector and AmazonS3FullAccess
		AWSCredentials awsCredentials = new BasicAWSCredentials(crmProperties.getProprty("accessKey"), crmProperties.getProprty("secretKey"));
		
		// Create Connection Based on Credentials
		AmazonS3 s3Client = new AmazonS3Client(awsCredentials);
		System.out.println("Creating Connection.........................");
		// Upload File to S3 Bucket Folder
		s3Client.putObject(new PutObjectRequest(bucketName, folderName+fileName, new File(filePath)).withCannedAcl(CannedAccessControlList.PublicRead));
		System.out.println("File Uploaded...............................");
		}catch(AmazonServiceException ase){
			 System.out.println("Caught an AmazonServiceException, which " +
		        		"means your request made it " +
		                "to Amazon S3, but was rejected with an error response" +
		                " for some reason.");
		        System.out.println("Error Message:    " + ase.getMessage());
		        System.out.println("HTTP Status Code: " + ase.getStatusCode());
		        System.out.println("AWS Error Code:   " + ase.getErrorCode());
		        System.out.println("Error Type:       " + ase.getErrorType());
		        System.out.println("Request ID:       " + ase.getRequestId());
		}catch(AmazonClientException ace){
			 System.out.println("Caught an AmazonClientException, which " +
		        		"means the client encountered " +
		                "an internal error while trying to " +
		                "communicate with S3, " +
		                "such as not being able to access the network.");
		        System.out.println("Error Message: " + ace.getMessage());
		}
		
		
		
	}
}
