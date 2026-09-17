package com.tyler.MobileClothing.wardrobe;

import com.tyler.MobileClothing.user.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/outfits")
@RequiredArgsConstructor
public class OutfitController {

    private final OutfitService outfitService;

    @GetMapping
    public ResponseEntity<Page<Outfit>> findAllOutfit(){
        return null;
    }

    @PostMapping
    public ResponseEntity<Outfit> createOutfit(){
        return null;
    }

    @PutMapping
    public ResponseEntity<Outfit> updateOutfit(){
        return null;
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteOutfit(){
        return null;
    }

    @PostMapping("/{outfitId}")
    public ResponseEntity<Outfit> toggleOutfitFavorite(@PathVariable String outfitId, @AuthenticationPrincipal UserPrincipal principal){
        return ResponseEntity.ok(outfitService.toggleFavorite(outfitId,principal.getUserId()));
    }

    @PostMapping("/{outfitId}/worn")
    public ResponseEntity<Outfit> recordOutfitWorn(@PathVariable String outfitId, @AuthenticationPrincipal UserPrincipal principal){
        return ResponseEntity.ok(outfitService.toggleFavorite(outfitId,principal.getUserId()));
    }

}
