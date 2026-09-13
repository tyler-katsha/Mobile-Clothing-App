package com.tyler.MobileClothing.wardrobe;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ItemPosition {
    private String itemId;
    private double x;
    private double y;
    private double scale;
    private int zIndex;
}
