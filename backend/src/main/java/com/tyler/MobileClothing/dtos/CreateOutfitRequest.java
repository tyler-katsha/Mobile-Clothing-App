package com.tyler.MobileClothing.dtos;

import com.tyler.MobileClothing.enums.Season;
import com.tyler.MobileClothing.wardrobe.CanvasData;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CreateOutfitRequest {

    private String userId;
    private String name;
    private String description;
    private List<String> clothingItemIds;
    private CanvasData canvasData;
    private Season season;
    private List<String> tags;

}
