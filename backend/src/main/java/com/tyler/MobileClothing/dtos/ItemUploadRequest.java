package com.tyler.MobileClothing.dtos;

import com.tyler.MobileClothing.enums.Category;
import com.tyler.MobileClothing.enums.Season;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ItemUploadRequest {

    private String userId;
    private String title;
    private Category category;
    private String subCategory;
    private List<String> colors;
    private List<Season> seasons;
    private String rawUploadImageUrl;
    // Optional choices
    private List<String> occasions;
    private String brand;
}
