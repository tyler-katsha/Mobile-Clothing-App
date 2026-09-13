package com.tyler.MobileClothing.wardrobe;

import com.tyler.MobileClothing.enums.Category;
import com.tyler.MobileClothing.enums.ProcessingStatus;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClothingItemRepository extends MongoRepository<ClothingItem,String> {
    List<ClothingItem> findByUserIdAndArchivedFalse(String userId);
    List<ClothingItem> findByUserIdAndCategoryAndArchivedFalse(String userId, Category category);
    List<ClothingItem> findByUserIdAndProcessingStatus(String userId, ProcessingStatus status);
    long countByUserIdAndArchivedFalse(String userId);
}
