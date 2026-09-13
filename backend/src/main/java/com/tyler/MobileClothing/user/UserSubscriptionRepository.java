package com.tyler.MobileClothing.user;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserSubscriptionRepository extends MongoRepository<UserSubscriptionRepository,String> {
    Optional<UserSubscription> findByUserId(String userId);
}
