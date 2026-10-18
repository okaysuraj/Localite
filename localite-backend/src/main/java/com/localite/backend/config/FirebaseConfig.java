package com.localite.backend.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.auth.oauth2.ServiceAccountCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.List;

/** Loads server credentials from environment variables or a local service-account file. */
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
        if (!FirebaseApp.getApps().isEmpty()) return;
        try {
            FirebaseOptions options = FirebaseOptions.builder()
                    .setCredentials(loadCredentials())
                    .build();
            FirebaseApp.initializeApp(options);
        } catch (IOException error) {
            throw new IllegalStateException("Cannot load Firebase credentials. Check the environment or service-account file.", error);
        }
    }

    private GoogleCredentials loadCredentials() throws IOException {
        String project = unquote(projectId);
        String email = unquote(clientEmail);
        String key = unquote(privateKey).replace("\\n", "\n");
        if (!project.isEmpty() && !email.isEmpty() && !key.isEmpty()) {
            return ServiceAccountCredentials.fromPkcs8(null, email, key, null, List.of())
                    .toBuilder().setProjectId(project).build();
        }
        try (FileInputStream credentials = new FileInputStream("firebase-service-account.json")) {
            return GoogleCredentials.fromStream(credentials);
        }
    }

    private String unquote(String value) {
        String text = value == null ? "" : value.trim();
        if (text.length() >= 2 && ((text.startsWith("\"") && text.endsWith("\""))
                || (text.startsWith("'") && text.endsWith("'")))) {
            return text.substring(1, text.length() - 1);
        }
        return text;
    }
}
