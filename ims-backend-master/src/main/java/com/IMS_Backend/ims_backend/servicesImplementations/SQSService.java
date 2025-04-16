package com.IMS_Backend.ims_backend.servicesImplementations;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.sqs.SqsClient;
import software.amazon.awssdk.services.sqs.model.DeleteMessageRequest;
import software.amazon.awssdk.services.sqs.model.Message;
import software.amazon.awssdk.services.sqs.model.ReceiveMessageRequest;

@Service
public class SQSService {

	private final SqsClient sqsClient;

	private final String queueUrl;

	private NotificationService notificationService;

	public SQSService(NotificationService notificationService, @Value("${sqs.queue.url}") String queueUrl,
			@Value("${aws.accessKeyId}") String accessKeyId, @Value("${aws.secretKey}") String secretKey) {
		this.notificationService = notificationService;
		this.sqsClient = SqsClient.builder().region(Region.US_EAST_2).credentialsProvider(
				StaticCredentialsProvider.create(AwsBasicCredentials.create(accessKeyId, secretKey))).build();
		this.queueUrl = queueUrl;
	}

	@Scheduled(fixedRate = 5000)
	public void pollQueue() {
		ReceiveMessageRequest receiveRequest = ReceiveMessageRequest.builder().queueUrl(queueUrl).maxNumberOfMessages(5)
				.waitTimeSeconds(10).build();
		List<Message> messages = sqsClient.receiveMessage(receiveRequest).messages();
		for (Message msg : messages) {
			System.out.println("Received: " + msg.body());
			notificationService.sendNotification(msg.body());
			sqsClient.deleteMessage(
					DeleteMessageRequest.builder().queueUrl(queueUrl).receiptHandle(msg.receiptHandle()).build());
		}
	}
}
