package com.reviews.MovieReview.service;

import com.reviews.MovieReview.model.Watchlist;
import com.reviews.MovieReview.repository.WatchlistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WatchlistService {
    @Autowired
    private WatchlistRepository watchlistRepository;

    public Watchlist addToWatchlist(String userId, String imdbId, String title, String poster) {
        // Check if movie already exists in user's watchlist
        if (watchlistRepository.findByUserIdAndImdbId(userId, imdbId).isPresent()) {
            throw new RuntimeException("Movie already in watchlist");
        }

        Watchlist watchlist = new Watchlist();
        watchlist.setUserId(userId);
        watchlist.setImdbId(imdbId);
        watchlist.setTitle(title);
        watchlist.setPoster(poster);

        return watchlistRepository.save(watchlist);
    }

    public List<Watchlist> getUserWatchlist(String userId) {
        return watchlistRepository.findByUserId(userId);
    }

    public void removeFromWatchlist(String userId, String imdbId) {
        watchlistRepository.deleteByUserIdAndImdbId(userId, imdbId);
    }
}