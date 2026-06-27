package com.localite.backend.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import jakarta.annotation.PostConstruct;
import java.io.FileInputStream;
import java.io.IOException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Configuration
public class FirebaseConfig {
    private static final Logger logger = LoggerFactory.getLogger(FirebaseConfig.class);

    @Value("${FIREBASE_PROJECT_ID:}")
    private String projectId;

    @Value("${FIREBASE_CLIENT_EMAIL:}")
    private String clientEmail;

    @Value("${FIREBASE_PRIVATE_KEY:}")
    private String privateKey;

    private String clean(String value) {
        if (value != null && value.length() >= 2) {
            if ((value.startsWith("\"") && value.endsWith("\"")) || (value.startsWith("'") && value.endsWith("'"))) {
                return value.substring(1, value.length() - 1);
            }
        }
        return value;
    }

    @PostConstruct
    public void init() {
        try {
            logger.info("Initializing Firebase...");
            logger.info("projectId length: {}", projectId != null ? projectId.length() : "null");
            logger.info("clientEmail length: {}", clientEmail != null ? clientEmail.length() : "null");
            logger.info("privateKey length: {}", privateKey != null ? privateKey.length() : "null");

            GoogleCredentials credentials;
            
            if (projectId != null && !projectId.isEmpty() && clientEmail != null && !clientEmail.isEmpty() && privateKey != null && !privateKey.isEmpty()) {
                String cleanProjectId = clean(projectId);
                String cleanClientEmail = clean(clientEmail);
                String cleanPrivateKey = clean(privateKey).replace("\\n", "\n").replace("\n", "\\n");
                
                String jsonConfig = String.format(
                    "{\"type\":\"service_account\",\"project_id\":\"%s\",\"private_key\":\"%s\",\"client_email\":\"%s\"}",
                    cleanProjectId, cleanPrivateKey, cleanClientEmail
                );
                
                credentials = GoogleCredentials.fromStream(new java.io.ByteArrayInputStream(jsonConfig.getBytes()));
                logger.info("Firebase initialized using Environment Variables.");
            } else {
                // Fallback to local JSON file
                logger.warn("Environment variables missing or empty. Falling back to local firebase-service-account.json file...");
                FileInputStream serviceAccount = new FileInputStream("firebase-service-account.json");
                credentials = GoogleCredentials.fromStream(serviceAccount);
                logger.info("Firebase initialized using local JSON file.");
            }

            FirebaseOptions options = FirebaseOptions.builder()
                    .setCredentials(credentials)
                    .build();

            if (FirebaseApp.getApps().isEmpty()) {
                FirebaseApp.initializeApp(options);
            }
            logger.info("Firebase successfully initialized!");
        } catch (Exception e) {
            logger.error("FATAL ERROR: Firebase initialization failed!", e);
            throw new RuntimeException("Firebase initialization failed! Check Render logs for details.", e);
        }
    }
}
