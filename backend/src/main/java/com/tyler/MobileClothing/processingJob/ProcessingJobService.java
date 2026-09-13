package com.tyler.MobileClothing.processingJob;

import com.tyler.MobileClothing.dtos.DispatchJobRequest;
import com.tyler.MobileClothing.dtos.UpdateProcessedImageRequest;
import com.tyler.MobileClothing.enums.ProcessingStatus;
import com.tyler.MobileClothing.wardrobe.ClothingItemService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Lazy;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.time.Instant;
import java.util.Map;

@Slf4j
@Service
public class ProcessingJobService {

    private final Logger logger = LoggerFactory.getLogger(ProcessingJobService.class);

    private final ProcessingJobRepository processingJobRepository;
    private final ClothingItemService clothingItemService;
    private final WebClient webClient;

    public ProcessingJobService(ProcessingJobRepository processingJobRepository, @Lazy ClothingItemService clothingItemService, WebClient webClient){
        this.processingJobRepository =  processingJobRepository;
        this.clothingItemService = clothingItemService;
        this.webClient = webClient;
    }
    public ProcessingJob createAndDispatchJob(DispatchJobRequest request) {

        var job = ProcessingJob.builder()
                .userId(request.getUserId())
                .clothingItemId(request.getSavedItemId())
                .sourceUrl(request.getRawUploadImageUrl())
                .createdAt(Instant.now())
                .updatedAt(Instant.now())
                .build();

        ProcessingJob savedJob = processingJobRepository.save(job);

        executeImageSegmentationAsync(savedJob.getId(),request.getSavedItemId(),request.getUserId(),request.getRawUploadImageUrl());

        return savedJob;
    }

    @Async("imageProcessingExecutor")
    private void executeImageSegmentationAsync(String id, String savedItemId, String userId, String rawUploadImageUrl) {

        var job = processingJobRepository.findById(id).orElse(null);

        if(job == null) return;

        job.setStatus(ProcessingStatus.PROCESSING);
        job.setUpdatedAt(Instant.now());

        processingJobRepository.save(job);

        var uri = "http:localhost:8001/api/v1/remove-bg"; // during testing
        var keySent = "imageUrl";
        var expectedKey = "outputUrl";

        try{
            Map<?, ?> response = webClient.post()
                    .uri(uri)
                    .bodyValue(Map.of(keySent,rawUploadImageUrl))
                    .retrieve()
                    .bodyToMono(Map.class)
                    .block();

            if(response != null && response.containsKey(expectedKey)){

                var processedUrl = (String) response.get(expectedKey);

                job.setOutputUrl(processedUrl);
                job.setStatus(ProcessingStatus.COMPLETED);
                job.setUpdatedAt(Instant.now());

                processingJobRepository.save(job);

                var imageRequest = UpdateProcessedImageRequest.builder()
                        .itemId(savedItemId)
                        .userId(userId)
                        .transparentPngImage(processedUrl)
                        .build();
                
                clothingItemService.updateProcessedImage(imageRequest);
            } else{
                throw new RuntimeException("Missing outputUrl from python service");
            }

        } catch (Exception e){
            logger.error("Failed processing image for item {}: {}",savedItemId,e.getMessage());

            job.setStatus(ProcessingStatus.FAILED);
            job.setErrorMessage(e.getMessage());
            job.setUpdatedAt(Instant.now());

            processingJobRepository.save(job);

            clothingItemService.markItemFailed(savedItemId,userId);
        }
    }

}
