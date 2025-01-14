import React, { useState } from "react";
import API from "../api/axios";

const AddReview = ({ movieId, onReviewAdded }) => {
  const [reviewerName, setReviewerName] = useState("");
  const [rating, setRating] = useState("");
  const [reviewComments, setReviewComments] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!rating || !reviewComments) {
      setError("Rating and comments are required.");
      return;
    }

    API.post("/reviews", {
      movieId,
      reviewerName: reviewerName || "Anonymous",
      rating: parseFloat(rating),
      reviewComments,
    })
      .then((response) => {
        console.log("Review added:", response.data);
        onReviewAdded(response.data); // Update the review list in the parent
        setReviewerName("");
        setRating("");
        setReviewComments("");
        setError("");
      })
      .catch((error) => {
        console.error("Error adding review:", error);
        setError("Failed to add review. Please try again.");
      });
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <h2>Add a Review</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Name:
            <input
              type="text"
              value={reviewerName}
              onChange={(e) => setReviewerName(e.target.value)}
              style={{ padding: "10px", marginLeft: "10px" }}
            />
          </label>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Rating:
            <input
              type="number"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              style={{ padding: "10px", marginLeft: "10px" }}
              min="0"
              max="10"
            />
          </label>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Comments:
            <textarea
              value={reviewComments}
              onChange={(e) => setReviewComments(e.target.value)}
              style={{
                padding: "10px",
                marginLeft: "10px",
                width: "100%",
                height: "100px",
              }}
            />
          </label>
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit" style={{ padding: "10px", cursor: "pointer" }}>
          Add Review
        </button>
      </form>
    </div>
  );
};

export default AddReview;
