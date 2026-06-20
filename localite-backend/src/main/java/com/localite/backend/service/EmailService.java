package com.localite.backend.service;

import org.springframework.stereotype.Service;

@Service
public class EmailService {

    public void sendRsvpNotification(String toEmail, String eventName, String attendeeName) {
        // Since we are mocking the SMTP server for now, we just log to the console
        System.out.println("==================================================");
        System.out.println("EMAIL NOTIFICATION");
        System.out.println("To: " + toEmail);
        System.out.println("Subject: New RSVP for your event: " + eventName);
        System.out.println("Body: Great news! " + attendeeName + " has just RSVP'd to your event.");
        System.out.println("==================================================");
    }
}
