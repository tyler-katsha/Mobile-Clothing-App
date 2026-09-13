package com.tyler.MobileClothing.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DispatchJobRequest {
    private String userId;
    private String savedItemId;
    private String rawUploadImageUrl;
}
