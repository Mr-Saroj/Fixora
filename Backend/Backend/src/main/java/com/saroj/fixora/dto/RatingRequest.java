package com.saroj.fixora.dto;

public class RatingRequest {

    private Integer rating; // 1-5, required
    private String review;  // optional

    public Integer getRating() { return rating; }
    public void setRating(Integer rating) { this.rating = rating; }

    public String getReview() { return review; }
    public void setReview(String review) { this.review = review; }
}