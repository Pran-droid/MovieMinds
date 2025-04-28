package com.reviews.MovieReview.repository;

import com.reviews.MovieReview.model.Watchlist;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface WatchlistRepository extends MongoRepository<Watchlist, ObjectId> {
    List<Watchlist> findByUserId(String userId);
    Optional<Watchlist> findByUserIdAndImdbId(String userId, String imdbId);
    void deleteByUserIdAndImdbId(String userId, String imdbId);
}