package com.tyler.MobileClothing.wardrobe;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OutfitRepository extends MongoRepository<Outfit,String> {
    List<Outfit> findByUserId(String userId);
    List<Outfit> findByUserIdAndFavoriteTrue(String userId);
}
