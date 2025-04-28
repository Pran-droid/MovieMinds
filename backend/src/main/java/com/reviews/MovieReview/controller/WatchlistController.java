package com.reviews.MovieReview.controller;

import com.reviews.MovieReview.model.Watchlist;
import com.reviews.MovieReview.service.WatchlistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/watchlist")
public class WatchlistController {
    @Autowired
    private WatchlistService watchlistService;

    @PostMapping("/add")
    public ResponseEntity<?> addToWatchlist(@RequestBody Map<String, String> payload) {
        try {
            Watchlist watchlist = watchlistService.addToWatchlist(
                    payload.get("userId"),
                    payload.get("imdbId"),
                    payload.get("title"),
                    payload.get("poster")
            );
            return new ResponseEntity<>(watchlist, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<Watchlist>> getUserWatchlist(@PathVariable String userId) {
        return new ResponseEntity<>(watchlistService.getUserWatchlist(userId), HttpStatus.OK);
    }

    @DeleteMapping("/{userId}/{imdbId}")
    public ResponseEntity<Void> removeFromWatchlist(
            @PathVariable String userId,
            @PathVariable String imdbId) {
        watchlistService.removeFromWatchlist(userId, imdbId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}