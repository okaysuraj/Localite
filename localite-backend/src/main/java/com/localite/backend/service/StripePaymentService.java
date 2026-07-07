package com.localite.backend.service;

import org.springframework.stereotype.Service;
import java.util.logging.Logger;

@Service
public class StripePaymentService {

    private static final Logger logger = Logger.getLogger(StripePaymentService.class.getName());
    private static final double PLATFORM_FEE_PERCENTAGE = 0.10; // 10% fee

    public boolean processPayment(double amount, String currency, String sourceToken) {
        // Mock Stripe payment processing
        logger.info("Processing Stripe payment: " + amount + " " + currency + " using token " + sourceToken);
        
        double platformFee = calculatePlatformFee(amount);
        double hostPayout = amount - platformFee;
        
        logger.info("Platform Fee collected: " + platformFee);
        logger.info("Host Payout: " + hostPayout);
        
        // Assume success for mock
        return true;
    }

    public double calculatePlatformFee(double amount) {
        return amount * PLATFORM_FEE_PERCENTAGE;
    }
}
