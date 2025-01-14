import React, { useState } from "react";
import API from "../api/axios";

const ReviewSearch = () => {
  const [query, setQuery] = useState("");
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    setLoading(true);
    API.get("/reviews")
      .then((response) => {
        const filteredReviews = response.data.filter(
          (review) =>
            review.reviewerName?.toLowerCase().includes(query.toLowerCase()) ||
            review.reviewComments
              ?.toLowerCase()
              .includes(query.toLowerCase()) ||
            String(review.rating).includes(query)
        );
        setReviews(filteredReviews);
        setError("");
      })
      .catch((error) => {
        console.error("Error fetching reviews:", error);
        setError("Failed to fetch reviews. Please try again.");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Search Reviews</h1>
      <input
        type="text"
        placeholder="Search by reviewer name, rating, or comments..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ padding: "10px", width: "100%", marginBottom: "20px" }}
      />
      <button
        onClick={handleSearch}
        style={{
          padding: "10px",
          backgroundColor: "blue",
          color: "white",
          cursor: "pointer",
        }}
      >
        Search
      </button>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : reviews.length > 0 ? (
        <div>
          {reviews.map((review) => (
            <div
              key={review.id}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                marginBottom: "10px",
              }}
            >
              <h3>{review.reviewerName || "Anonymous"}</h3>
              <p>Rating: {review.rating}</p>
              <p>{review.reviewComments}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No reviews found.</p>
      )}
    </div>
  );
};

export default ReviewSearch;
