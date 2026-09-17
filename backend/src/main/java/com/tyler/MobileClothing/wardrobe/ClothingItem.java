package com.tyler.MobileClothing.wardrobe;

import com.tyler.MobileClothing.enums.Category;
import com.tyler.MobileClothing.enums.ProcessingStatus;
import com.tyler.MobileClothing.enums.Season;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.index.CompoundIndexes;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "clothing_items")
@CompoundIndexes({
        @CompoundIndex(name = "user_category_idx", def = "{'userId': 1, 'category': 1}"),
        @CompoundIndex(name = "user_status_idx", def = "{'userId': 1, 'processingStatus': 1}")
})
public class ClothingItem {

    @Id
    private String id;

    @Indexed
    private String userId;

    private String title;
    private Category category;
    private String subCategory;

    private List<String> colors;
    private List<Season> seasons;
    private List<String> occasions;
    private String brand;

    private ImageDetails imageDetails;

    @Builder.Default
    private ProcessingStatus processingStatus = ProcessingStatus.PENDING;

    @Builder.Default
    private boolean archived = false;
    
    @Builder.Default
    private boolean favorite = false;

    @CreatedDate
    private Instant createdAt;

    @LastModifiedDate
    private Instant updatedAt;
}
