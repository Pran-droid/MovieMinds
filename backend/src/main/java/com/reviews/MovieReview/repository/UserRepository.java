package com.reviews.MovieReview.repository;

import com.reviews.MovieReview.model.Movie;
import com.reviews.MovieReview.model.User;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User, ObjectId> {
    boolean existsByEmail(String email);
    User findByEmailAndPassword(String email, String password);
}