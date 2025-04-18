//package com.IMS_Backend.ims_backend.controller;
//
//import java.io.File;
//import java.io.IOException;
//
//import org.apache.commons.io.IOUtils;
//import org.springframework.http.HttpHeaders;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.MediaType;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//import org.springframework.web.multipart.MultipartFile;
//
//import com.IMS_Backend.ims_backend.servicesImplementations.S3Service;
//import com.amazonaws.services.s3.model.S3Object;
//import com.amazonaws.services.s3.model.S3ObjectInputStream;
//
//@CrossOrigin("*")
//@RestController
//@RequestMapping("/api/files")
//public class FileController {
//
//    private final S3Service s3Service;
//
//    public FileController(S3Service s3Service) {
//        this.s3Service = s3Service;
//    }
//
//    @PostMapping("/upload/{companyId}")
//    public ResponseEntity<String> uploadFile(
//            @RequestParam("file") MultipartFile file, 
//            @PathVariable String companyId,
//            @RequestParam(value = "employeeId", required = false) String employeeId) {
//        System.out.println("here2" + companyId + employeeId);
//        File tempFile = null;
//        try {
//            tempFile = convertMultipartFileToFile(file);
//            if (employeeId != null) {
//                s3Service.uploadFile(tempFile, companyId, employeeId, "profile-images");
//            } else {
//                s3Service.uploadFile(tempFile, companyId, null, "logos");
//            }
//            
//            return ResponseEntity.ok("File uploaded successfully!");
//        } catch (IOException e) {
//            e.printStackTrace();
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error converting file.");
//        } catch (Exception e) {
//            e.printStackTrace();
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error uploading file: " + e.getMessage());
//        } finally {
//            if (tempFile != null && tempFile.exists()) {
//                tempFile.delete();
//            }
//        }
//    }
//    
//    private File convertMultipartFileToFile(MultipartFile multipartFile) throws IOException {
//        File tempFile = new File(System.getProperty("java.io.tmpdir") + "/" + multipartFile.getOriginalFilename());
//        multipartFile.transferTo(tempFile);
//        return tempFile;
//    }
//
//
//    @GetMapping("/download/{companyId}/{fileName}")
//    public ResponseEntity<byte[]> downloadFile(@PathVariable String companyId, @PathVariable String fileName) throws IOException {
//        try {
//            S3Object s3Object = s3Service.downloadFile("2", fileName);
//            S3ObjectInputStream inputStream = s3Object.getObjectContent();
//            byte[] content = IOUtils.toByteArray(inputStream);
//
//            return ResponseEntity.ok()
//                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + fileName)
//                    .contentType(MediaType.APPLICATION_OCTET_STREAM)
//                    .body(content);
//        } catch (Exception e) {
//            e.printStackTrace();
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
//        }
//    }
//
//    @DeleteMapping("/delete/{companyId}/{fileName}")
//    public ResponseEntity<String> deleteFile(@PathVariable String companyId, @PathVariable String fileName) {
//        try {
//            s3Service.deleteFile(companyId, fileName);
//            return ResponseEntity.ok("File deleted successfully!");
//        } catch (Exception e) {
//            e.printStackTrace();
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting file: " + e.getMessage());
//        }
//    }
//}

package com.IMS_Backend.ims_backend.controller;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.IMS_Backend.ims_backend.servicesImplementations.S3Service;

import software.amazon.awssdk.core.ResponseInputStream;
import software.amazon.awssdk.services.s3.model.GetObjectResponse;
//import software.amazon.awssdk.core.sync.ResponseInputStream;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/files")
public class FileController {

    private final S3Service s3Service;

    public FileController(S3Service s3Service) {
        this.s3Service = s3Service;
    }

    @PostMapping("/upload/{companyId}")
    public ResponseEntity<String> uploadFile(
            @RequestParam("file") MultipartFile file,
            @PathVariable String companyId,
            @RequestParam(value = "employeeId", required = false) String employeeId) {

        File tempFile = null;
        try {
            tempFile = convertMultipartFileToFile(file);
            if (employeeId != null) {
                s3Service.uploadFile(tempFile, companyId, employeeId, "profile-images");
            } else {
                s3Service.uploadFile(tempFile, companyId, null, "logos");
            }

            return ResponseEntity.ok("File uploaded successfully!");
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error converting file.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error uploading file: " + e.getMessage());
        } finally {
            if (tempFile != null && tempFile.exists()) {
                tempFile.delete();
            }
        }
    }

    private File convertMultipartFileToFile(MultipartFile multipartFile) throws IOException {
        File tempFile = new File(System.getProperty("java.io.tmpdir") + "/" + multipartFile.getOriginalFilename());
        multipartFile.transferTo(tempFile);
        return tempFile;
    }

    @GetMapping("/download/{companyId}/{fileName}")
    public ResponseEntity<byte[]> downloadFile(@PathVariable String companyId, @PathVariable String fileName) {
        try {
            ResponseInputStream<GetObjectResponse> inputStream = s3Service.downloadFile(companyId, fileName);
            byte[] content = inputStream.readAllBytes();

            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + fileName)
                    .contentType(MediaType.APPLICATION_OCTET_STREAM)
                    .body(content);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @DeleteMapping("/delete/{companyId}/{fileName}")
    public ResponseEntity<String> deleteFile(@PathVariable String companyId, @PathVariable String fileName) {
        try {
            s3Service.deleteFile(companyId, fileName);
            return ResponseEntity.ok("File deleted successfully!");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting file: " + e.getMessage());
        }
    }
}
