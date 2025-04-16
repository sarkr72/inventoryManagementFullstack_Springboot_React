package com.IMS_Backend.ims_backend.servicesImplementations;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.file.Paths;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.IMS_Backend.ims_backend.exceptions.NotFoundException;
import com.IMS_Backend.ims_backend.model.Company;
import com.IMS_Backend.ims_backend.model.Employee;
import com.IMS_Backend.ims_backend.repository.CompanyRepository;
import com.IMS_Backend.ims_backend.repository.EmployeeRepository;

import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.core.ResponseInputStream;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.*;

@Service
public class S3Service {

    private final S3Client s3Client;
    private final String bucketName;
    private final CompanyRepository companyRepository;
    private final EmployeeRepository employeeRepository;

    public S3Service(
            @Value("${aws.accessKeyId}") String accessKeyId,
            @Value("${aws.secretKey}") String secretKey,
            @Value("${aws.region}") String region,
            @Value("${aws.s3.bucket.name}") String bucketName,
            CompanyRepository companyRepository,
            EmployeeRepository employeeRepository
    ) {
        this.bucketName = bucketName;
        this.companyRepository = companyRepository;
        this.employeeRepository = employeeRepository;

        this.s3Client = S3Client.builder()
                .region(Region.of(region))
                .credentialsProvider(
                        StaticCredentialsProvider.create(AwsBasicCredentials.create(accessKeyId, secretKey))
                )
                .build();
    }

    public void uploadFile(File file, String companyId, String employeeId, String fileType) throws IOException {
        String filePath = String.format("%s/%s/%s", companyId, fileType, file.getName());
        System.out.println("Uploading to: " + filePath);

        PutObjectRequest putRequest = PutObjectRequest.builder()
                .bucket(bucketName)
                .key(filePath)
                .build();

        try (FileInputStream fis = new FileInputStream(file)) {
            s3Client.putObject(putRequest, RequestBody.fromInputStream(fis, file.length()));
        }

        String fileUrl = generateFileUrl(companyId, file.getName(), fileType);

        if ("logos".equals(fileType)) {
            saveFileUrlToDatabase(fileUrl, companyId);
        } else if ("profile-images".equals(fileType) && employeeId != null) {
            saveProfileUrlToDatabase(fileUrl, employeeId);
        } else {
            throw new IllegalArgumentException("Invalid file type or missing employeeId for profile image.");
        }
    }

    public ResponseInputStream<GetObjectResponse> downloadFile(String companyId, String fileName) {
        String filePath = String.format("%s/%s", companyId, fileName);
        GetObjectRequest getRequest = GetObjectRequest.builder()
                .bucket(bucketName)
                .key(filePath)
                .build();

        return s3Client.getObject(getRequest);
    }

    public void deleteFile(String companyId, String fileName) {
        String filePath = String.format("%s/%s", companyId, fileName);
        DeleteObjectRequest deleteRequest = DeleteObjectRequest.builder()
                .bucket(bucketName)
                .key(filePath)
                .build();

        s3Client.deleteObject(deleteRequest);
    }

    public String generateFileUrl(String companyId, String fileName, String fileType) {
        String filePath = String.format("%s/%s/%s", companyId, fileType, fileName);
        return "https://d2isqxcav1j32m.cloudfront.net/" + filePath;
    }

    public void saveFileUrlToDatabase(String fileUrl, String companyId) {
        Company company = companyRepository.findById(Long.parseLong(companyId))
                .orElseThrow(() -> new NotFoundException("Company not found with id: " + companyId));
        company.setLogoUrl(fileUrl);
        companyRepository.save(company);
    }

    public void saveProfileUrlToDatabase(String fileUrl, String employeeId) {
        Employee employee = employeeRepository.findById(Long.parseLong(employeeId))
                .orElseThrow(() -> new NotFoundException("Employee not found with id: " + employeeId));
        employee.setProfileUrl(fileUrl);
        employeeRepository.save(employee);
    }
}
