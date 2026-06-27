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
import java.util.HashMap;
import java.util.Map;
import com.fasterxml.jackson.databind.ObjectMapper;

@Configuration
public class FirebaseConfig {

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
            GoogleCredentials credentials;
            
            if (projectId != null && !projectId.isEmpty() && clientEmail != null && !clientEmail.isEmpty() && privateKey != null && !privateKey.isEmpty()) {
                String cleanProjectId = clean(projectId);
                String cleanClientEmail = clean(clientEmail);
                String cleanPrivateKey = clean(privateKey).replace("\\n", "\n");
                
                Map<String, String> jsonMap = new HashMap<>();
                jsonMap.put("type", "service_account");
                jsonMap.put("project_id", cleanProjectId);
                jsonMap.put("private_key", cleanPrivateKey);
                jsonMap.put("client_email", cleanClientEmail);
                
                ObjectMapper mapper = new ObjectMapper();
                byte[] jsonBytes = mapper.writeValueAsBytes(jsonMap);
                
                credentials = GoogleCredentials.fromStream(new java.io.ByteArrayInputStream(jsonBytes));
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
