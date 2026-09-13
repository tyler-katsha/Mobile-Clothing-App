package com.tyler.MobileClothing.processingJob;

import com.tyler.MobileClothing.enums.ProcessingStatus;
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

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "processing_jobs")
public class ProcessingJob {

    @Id
    private String id;

    @Indexed
    private String userId;

    @Indexed
    private String clothingItemId;

    @Builder.Default
    private ProcessingStatus status = ProcessingStatus.PENDING;

    private String sourceUrl;
    private String outputUrl;
    private String errorMessage;

    @CreatedDate
    private Instant createdAt;

    @LastModifiedDate
    private Instant updatedAt;
}
