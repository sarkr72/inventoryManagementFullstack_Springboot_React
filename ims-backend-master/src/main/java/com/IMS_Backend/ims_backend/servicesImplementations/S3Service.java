package com.IMS_Backend.ims_backend.servicesImplementations;

import java.io.File;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.IMS_Backend.ims_backend.model.Company;
import com.IMS_Backend.ims_backend.repository.CompanyRepository;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.S3Object;

@Service
public class S3Service {

    private final AmazonS3 amazonS3;
    private final String bucketName;
    
	@Autowired
	private CompanyRepository companyRepository;
	
    public S3Service(
        @Value("${aws.accessKeyId}") String accessKeyId,
        @Value("${aws.secretKey}") String secretKey,
        @Value("${aws.region}") String region,
        @Value("${aws.s3.bucket.name}") String bucketName, CompanyRepository companyRepository
    ) {
        this.bucketName = bucketName;

        BasicAWSCredentials awsCredentials = new BasicAWSCredentials(accessKeyId, secretKey);
        this.amazonS3 = AmazonS3ClientBuilder.standard()
                .withRegion(region)
                .withCredentials(new AWSStaticCredentialsProvider(awsCredentials))
                .build();
        this.companyRepository = companyRepository;
    }

    public void uploadFile(File file, String companyId) {
        String filePath = String.format("%s/%s", companyId, file.getName());
        amazonS3.putObject(new PutObjectRequest(bucketName, filePath, file));
        String fileUrl = generateFileUrl(companyId, file.getName()); // Generate the URL
        saveFileUrlToDatabase(fileUrl);
    }

    public S3Object downloadFile(String companyId,  String fileName) {
    	String filePath = String.format("%s/%s", companyId, fileName);
        return amazonS3.getObject(bucketName, filePath);
    }

    public void deleteFile(String companyId, String fileName) {
        String filePath = String.format("%s/%s", companyId, fileName);
        amazonS3.deleteObject(bucketName, filePath);
    }
    
    public String generateFileUrl(String companyId, String fileName) {
        String filePath = String.format("%s/%s", companyId, fileName);
        return amazonS3.getUrl(bucketName, filePath).toString();
    }
    
    public void saveFileUrlToDatabase(String fileUrl) {
        Company cp = new Company("company1", "add1", "con1", fileUrl);
        companyRepository.save(cp);
    }
    
}
