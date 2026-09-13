package com.tyler.MobileClothing.wardrobe;

import com.tyler.MobileClothing.dtos.CreateOutfitRequest;
import com.tyler.MobileClothing.exceptions.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OutfitService {

    private final OutfitRepository outfitRepository;
    private final ClothingItemRepository clothingItemRepository;

    public Outfit createOutfit(CreateOutfitRequest request){
        if(request.getClothingItemIds() == null || request.getClothingItemIds().isEmpty()){
            throw new IllegalArgumentException("An outfit must contain at least one clothing item");
        }

        List<ClothingItem> items = clothingItemRepository.findAllById(request.getClothingItemIds());

        if(items.size() != request.getClothingItemIds().size()){
            throw new IllegalArgumentException("One or more clothing items do not exist");
        }

        boolean unauthorized = items.stream().anyMatch(item -> !item.getUserId().equals(request.getUserId()) || item.isArchived());

        if(unauthorized){
            throw new SecurityException("Cannot add garments from another user's wardrobe or archived items");
        }


        var outfit = Outfit.builder()
                .userId(request.getUserId())
                .name(request.getName())
                .description(request.getDescription())
                .clothingItemIds(request.getClothingItemIds())
                .canvasData(request.getCanvasData())
                .season(request.getSeason())
                .tags(request.getTags())
                .favorite(false)
                .wearCount(0)
                .createdAt(Instant.now())
                .updatedAt(Instant.now())
                .build();

        return outfitRepository.save(outfit);
    }

    public List<Outfit> getUserByOutfits(String userId){
        return outfitRepository.findByUserId(userId);
    }

    public Outfit recordOutfitWorn(String outfitId,String userId){
        var outfit = outfitRepository.findById(outfitId)
                .orElseThrow(() -> new ResourceNotFoundException("Outfit not found"));

        if(!outfit.getUserId().equals(userId)){
            throw new SecurityException("Unauthorized access to outfit");
        }

        outfit.setWearCount(outfit.getWearCount() + 1);
        outfit.setLastWornAt(Instant.now());
        outfit.setUpdatedAt(Instant.now());

        return outfitRepository.save(outfit);
    }

    public Outfit toggleFavorite(String outfitId,String userId){
        var outfit = outfitRepository.findById(outfitId)
                .orElseThrow(() -> new ResourceNotFoundException("Outfit not found"));

        if(!outfit.getUserId().equals(userId)){
            throw new SecurityException("Unauthorized access to outfit");
        }

        outfit.setFavorite(!outfit.isFavorite());
        outfit.setUpdatedAt(Instant.now());
        return outfitRepository.save(outfit);
    }

    public void deleteOutfit(String outfitId,String userId){
        var outfit = outfitRepository.findById(outfitId)
                .orElseThrow(() -> new ResourceNotFoundException("Outfit not found"));

        if(!outfit.getUserId().equals(userId)){
            throw new SecurityException("Unauthorized access to outfit");
        }

        outfitRepository.delete(outfit);
    }
}
