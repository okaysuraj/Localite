package com.localite.backend.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.annotation.PostConstruct;
import java.io.FileInputStream;
import java.io.IOException;

@Configuration
public class FirebaseConfig {

    @PostConstruct
    public void init() {
        try {
            GoogleCredentials credentials;
            
            // Check if environment variables are set
            String projectId = System.getenv("FIREBASE_PROJECT_ID");
            String clientEmail = System.getenv("FIREBASE_CLIENT_EMAIL");
            String privateKey = System.getenv("FIREBASE_PRIVATE_KEY");
            
            if (projectId != null && clientEmail != null && privateKey != null) {
                // Parse the private key properly (replace literal \n with actual newline if needed)
                privateKey = privateKey.replace("\\n", "\n");
                
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
