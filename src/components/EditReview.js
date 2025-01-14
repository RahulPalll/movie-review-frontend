import React, { useState } from "react";
import API from "../api/axios";

const EditReview = ({ review, onReviewUpdated, onCancel }) => {
  const [rating, setRating] = useState(review.rating);
  const [reviewComments, setReviewComments] = useState(review.reviewComments);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!rating || !reviewComments) {
      setError("Rating and comments are required.");
      return;
    }

    API.patch(`/reviews/${review.id}`, {
      rating: parseFloat(rating),
      reviewComments,
    })
      .then((response) => {
        console.log("Review updated:", response.data);
        onReviewUpdated(response.data);
        setError("");
      })
      .catch((error) => {
        console.error("Error updating review:", error);
        setError("Failed to update review. Please try again.");
      });
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <h2>Edit Review</h2>
      <form onSubmit={handleSubmit}>
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
          Save Changes
        </button>
        <button
          type="button"
          onClick={onCancel}
          style={{ padding: "10px", marginLeft: "10px", cursor: "pointer" }}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditReview;
