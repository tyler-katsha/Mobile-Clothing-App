package com.tyler.MobileClothing.wardrobe;

import com.tyler.MobileClothing.enums.Season;
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
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "outfits")
public class Outfit {

    @Id
    private String id;

    @Indexed
    private String userId;

    private String name;
    private String description;

    // References to ClothingItem document ids
    private List<String> clothingItemIds;

    private CanvasData canvasData;

    private Season season;
    private List<String> tags;

    @Builder.Default
    private boolean favorite = false;

    @Builder.Default
    private int wearCount = 0;

    private Instant lastWornAt;

    @CreatedDate
    private Instant createdAt;

    @LastModifiedDate
    private Instant updatedAt;
}
