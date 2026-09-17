package com.tyler.MobileClothing.user;

import com.tyler.MobileClothing.enums.AuthProvider;
import com.tyler.MobileClothing.enums.Gender;
import com.tyler.MobileClothing.enums.Role;
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
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "user")
public class User {

    @Id
    private String id;

    @Indexed(unique = true)
    private String email;

    private String password;
    private String name;

    @Builder.Default
    private AuthProvider provider = AuthProvider.LOCAL;

    @Builder.Default
    private Set<Role> role = Set.of(Role.USER);

    @Builder.Default
    private SubscriptionTier subscriptionTier = SubscriptionTier.FREE;

    private UserPreferences userPreferences;
    private Gender gender;
    private String avatarUrl;
    private String city;

    @CreatedDate
    private Instant createdAt;

    @LastModifiedDate
    private Instant updatedAt;

    @Builder.Default
    private boolean isEnabled = false;
}
