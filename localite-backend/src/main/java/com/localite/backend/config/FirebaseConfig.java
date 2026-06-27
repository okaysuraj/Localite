package com.localite.backend.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.annotation.PostConstruct;
import java.io.FileInputStream;
import java.io.IOException;

@Configuration
public class FirebaseConfig {

    @Value("${FIREBASE_PROJECT_ID:}")
    private String projectId;

    @Value("${FIREBASE_CLIENT_EMAIL:}")
    private String clientEmail;

    @Value("${FIREBASE_PRIVATE_KEY:}")
    private String privateKey;

    @PostConstruct
    public void init() {
        try {
            GoogleCredentials credentials;
            
            if (projectId != null && !projectId.isEmpty() && clientEmail != null && !clientEmail.isEmpty() && privateKey != null && !privateKey.isEmpty()) {
                // Normalize newlines: convert any literal \n to actual newlines, then escape them properly for JSON
                privateKey = privateKey.replace("\\n", "\n").replace("\n", "\\n");
                
                String jsonConfig = String.format(
                    "{\"type\":\"service_account\",\"project_id\":\"%s\",\"private_key\":\"%s\",\"client_email\":\"%s\"}",
                    projectId, privateKey, clientEmail
                );
                
                credentials = GoogleCredentials.fromStream(new java.io.ByteArrayInputStream(jsonConfig.getBytes()));
                System.out.println("Firebase initialized using Environment Variables.");
            } else {
                // Fallback to local JSON file
                FileInputStream serviceAccount = new FileInputStream("firebase-service-account.json");
                credentials = GoogleCredentials.fromStream(serviceAccount);
                System.out.println("Firebase initialized using local JSON file.");
            }

            FirebaseOptions options = FirebaseOptions.builder()
                    .setCredentials(credentials)
                    .build();

            if (FirebaseApp.getApps().isEmpty()) {
                FirebaseApp.initializeApp(options);
            }
        } catch (IOException e) {
            System.err.println("Warning: Firebase initialization failed. " + e.getMessage());
        }
    }
}
