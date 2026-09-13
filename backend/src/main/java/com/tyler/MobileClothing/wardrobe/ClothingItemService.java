package com.tyler.MobileClothing.wardrobe;

import com.tyler.MobileClothing.dtos.DispatchJobRequest;
import com.tyler.MobileClothing.dtos.ItemUploadRequest;
import com.tyler.MobileClothing.dtos.UpdateProcessedImageRequest;
import com.tyler.MobileClothing.enums.Category;
import com.tyler.MobileClothing.enums.ProcessingStatus;
import com.tyler.MobileClothing.enums.SubscriptionTier;
import com.tyler.MobileClothing.exceptions.ResourceNotFoundException;
import com.tyler.MobileClothing.exceptions.TierException;
import com.tyler.MobileClothing.processingJob.ProcessingJobService;
import com.tyler.MobileClothing.user.UserSubscriptionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ClothingItemService {

    private final ClothingItemRepository clothingItemRepository;
    private final UserSubscriptionRepository userSubscriptionRepository;
    private final ProcessingJobService processingJobService;

    public ClothingItem initiateItemUpload(ItemUploadRequest request){

        var sub = userSubscriptionRepository.findByUserId(request.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("Subscription record missing"));

        var existingActiveItems = clothingItemRepository.countByUserIdAndArchivedFalse(request.getUserId());

        if(sub.getTier() == SubscriptionTier.FREE && existingActiveItems >= sub.getCustomItemUploadLimit()){
            throw new TierException("Free tier upload limit of " + sub.getCustomItemUploadLimit() + " reached. Upgrade to Pro.");
        }

        var item = ClothingItem.builder()
                .userId(request.getUserId())
                .title(request.getTitle())
                .category(request.getCategory())
                .subCategory(request.getSubCategory())
                .colors(request.getColors())
                .seasons(request.getSeasons())
                .imageDetails(ImageDetails.builder()
                        .originalUrl(request.getRawUploadImageUrl())
                        .build()).
                processingStatus(ProcessingStatus.PENDING)
                .archived(false)
                .createdAt(Instant.now())
                .updatedAt(Instant.now())
                .build();

        // Optional addon for clothing item
        if(request.getOccasions() != null && !request.getOccasions().isEmpty()){
            item.setOccasions(request.getOccasions());
        }

        if(request.getBrand() != null && !request.getBrand().isEmpty()){
            item.setBrand(request.getBrand());
        }

        var savedItem = clothingItemRepository.save(item);

        DispatchJobRequest job = DispatchJobRequest.builder()
                .userId(request.getUserId())
                .savedItemId(savedItem.getId())
                .rawUploadImageUrl(request.getRawUploadImageUrl())
                .build();

        processingJobService.createAndDispatchJob(job);

        return savedItem;
    }


    public List<ClothingItem> getUserWardrobe(String userId){
        return clothingItemRepository.findByUserIdAndArchivedFalse(userId);
    }

    public List<ClothingItem> getUserItemsByCategory(String userId, Category category){
        return clothingItemRepository.findByUserIdAndCategoryAndArchivedFalse(userId,category);
    }

    public void updateProcessedImage(UpdateProcessedImageRequest request){
        var item = clothingItemRepository.findById(request.getItemId())
                .orElseThrow(() -> new ResourceNotFoundException("Item not found"));

        item.getImageDetails().setNoBgUrl(request.getTransparentPngImage());
        item.setProcessingStatus(ProcessingStatus.COMPLETED);
        item.setUpdatedAt(Instant.now());

        clothingItemRepository.save(item);
    }
    public void markItemFailed(String itemId,String userId){
        var item = clothingItemRepository.findById(itemId)
                .orElseThrow(() -> new ResourceNotFoundException("Item not found"));

        item.setProcessingStatus(ProcessingStatus.FAILED);
        item.setUpdatedAt(Instant.now());

        clothingItemRepository.save(item);
    }

    public void archiveItem(String itemId,String userId){
        var item = clothingItemRepository.findById(itemId)
                .orElseThrow(() -> new ResourceNotFoundException("Item not found"));

        if(!item.getUserId().equals(userId)){
            throw new SecurityException("Unauthorized access to clothing item!");
        }

        item.setArchived(true);
        item.setUpdatedAt(Instant.now());

        clothingItemRepository.save(item);
    }
}
