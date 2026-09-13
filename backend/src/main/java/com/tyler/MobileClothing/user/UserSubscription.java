package com.tyler.MobileClothing.user;

import com.tyler.MobileClothing.enums.SubscriptionTier;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "user_subscription")
public class UserSubscription {
    @Id
    private String id;

    @Indexed(unique = true)
    private String userId;

    @Indexed
    private String gatewayCustomerId; // "cus_NSfa23"
    private String gatewaySubscriptionId; // "sub_1M23"
    private String paymentProvider; // "STRIPE", "APPLE_IAP", "GOOGLE_PLAY"

    @Builder.Default
    private SubscriptionTier tier = SubscriptionTier.FREE;

    private int customItemUploadLimit; // e.g. 20 for free unlimited (-1) for PRO
    private int monthlyProcessingQuota; // e.g. max background removals per month

    private Instant currentPeriodStart;
    private Instant currentPeriodEnd;
    private boolean cancelAtPeriodEnd;

    @CreatedDate
    private Instant createdAt;

    @LastModifiedDate
    private Instant updatedAt;
}
