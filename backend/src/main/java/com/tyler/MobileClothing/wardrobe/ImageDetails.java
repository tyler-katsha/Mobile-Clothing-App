package com.tyler.MobileClothing.wardrobe;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ImageDetails {

    private String originalUrl;
    private String noBgUrl;
    private String thumbnailUrl;

}
