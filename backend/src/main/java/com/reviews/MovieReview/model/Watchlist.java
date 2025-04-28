package com.reviews.MovieReview.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "watchlists")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Watchlist {
    @Id
    private ObjectId id;
    private String userId;
    private String imdbId;
    private String title;
    private String poster;
}