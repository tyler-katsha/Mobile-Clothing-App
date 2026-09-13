package com.tyler.MobileClothing.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UpdateProcessedImageRequest {
    private String itemId;
    private String userId;
    private String transparentPngImage;
}
