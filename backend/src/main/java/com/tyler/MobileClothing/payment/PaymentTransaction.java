package com.tyler.MobileClothing.payment;

import com.tyler.MobileClothing.enums.PaymentStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "payment_transactions")
public class PaymentTransaction {

    @Id
    private String id;

    @Indexed
    private String userId;

    @Indexed
    private String gatewayTransactionId; // e.g. Stripe Charge ID or Store Receipt ID

    private double amount;
    private String currency; // e.g. "USD", "ZAR"
    private PaymentStatus status; // "SUCCESSES", "FAILED", "REFUNDED", "INSUFFICIENT_FUNDS"
    private String planName; // e.g. "Pro Monthly"

    @CreatedDate
    private Instant timestamp;
}
