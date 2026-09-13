package com.tyler.MobileClothing.processingJob;

import com.tyler.MobileClothing.enums.ProcessingStatus;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProcessingJobRepository extends MongoRepository<ProcessingJob,String> {
    List<ProcessingJob> findByStatus(ProcessingStatus status);
}
