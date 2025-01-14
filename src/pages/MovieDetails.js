import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import Modal from "../components/Modal";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [editingReview, setEditingReview] = useState(null);
  const [reviewSearch, setReviewSearch] = useState("");
  const [filteredReviews, setFilteredReviews] = useState([]);

  useEffect(() => {
    fetchMovie();
    fetchReviews();
  }, [id]);

  useEffect(() => {
    setFilteredReviews(
      reviews.filter(
        (review) =>
          review.reviewComments
            ?.toLowerCase()
            .includes(reviewSearch.toLowerCase()) ||
          review.reviewerName
            ?.toLowerCase()
            .includes(reviewSearch.toLowerCase())
      )
    );
  }, [reviewSearch, reviews]);

  const fetchMovie = () => {
    API.get(`/movies/${id}`)
      .then((response) => setMovie(response.data))
      .catch((error) => console.error("Error fetching movie:", error));
  };

  const fetchReviews = () => {
    API.get("/reviews")
      .then((response) =>
        setReviews(
          response.data.filter((review) => review.movie.id === parseInt(id))
        )
      )
      .catch((error) => console.error("Error fetching reviews:", error));
  };

  const handleDeleteReview = (reviewId) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      API.delete(`/reviews/${reviewId}`)
        .then(() => {
          setReviews((prevReviews) =>
            prevReviews.filter((review) => review.id !== reviewId)
          );
        })
        .catch((error) => {
          console.error("Error deleting review:", error);
          alert("Failed to delete the review. Please try again.");
        });
    }
  };

  const handleEditReview = () => {
    API.patch(`/reviews/${editingReview.id}`, editingReview)
      .then(() => {
        fetchReviews();
        setEditingReview(null); // Close the modal
      })
      .catch((error) => console.error("Error updating review:", error));
  };

  return (
    <div>
      {/* Navbar */}
      <Navbar
        onAddMovieClick={() => navigate("/")}
        onAddReviewClick={() => navigate("/")}
      />

      <div style={{ padding: "20px" }}>
        {movie ? (
          <>
            {/* Movie Header */}
            <div style={styles.movieHeader}>
              <h1 style={styles.movieName}>{movie.name}</h1>
              <p style={styles.movieRating}>
                Avg Rating: {movie.averageRating || "No ratings yet"} / 10
              </p>
            </div>

            {/* Review Search Bar */}
            <div style={styles.reviewSearchContainer}>
              <input
                type="text"
                placeholder="Search reviews..."
                value={reviewSearch}
                onChange={(e) => setReviewSearch(e.target.value)}
                style={styles.searchBar}
              />
            </div>

            {/* Reviews Section */}
            <div>
              <h2 style={styles.sectionTitle}>Reviews</h2>
              {filteredReviews.length > 0 ? (
                filteredReviews.map((review) => (
                  <div key={review.id} style={styles.reviewCard}>
                    {/* Review Comments */}
                    <div style={styles.reviewDetails}>
                      <p style={styles.reviewComment}>
                        {review.reviewComments}
                      </p>
                      <p style={styles.reviewerName}>
                        - {review.reviewerName || "Anonymous"}
                      </p>
                    </div>

                    {/* Review Rating & Actions */}
                    <div style={styles.reviewActions}>
                      <p style={styles.reviewRating}>{review.rating} / 10</p>
                      <div style={styles.actionIcons}>
                        <i
                          className="fa fa-edit"
                          style={styles.icon}
                          onClick={() => setEditingReview(review)}
                        ></i>
                        <i
                          className="fa fa-trash"
                          style={styles.icon}
                          onClick={() => handleDeleteReview(review.id)}
                        ></i>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No reviews found.</p>
              )}
            </div>

            {/* Edit Review Modal */}
            {editingReview && (
              <Modal title="Edit Review" onClose={() => setEditingReview(null)}>
                <div>
                  <label>Reviewer Name:</label>
                  <input
                    type="text"
                    value={editingReview.reviewerName}
                    onChange={(e) =>
                      setEditingReview({
                        ...editingReview,
                        reviewerName: e.target.value,
                      })
                    }
                    style={styles.input}
                  />
                  <label>Rating:</label>
                  <input
                    type="number"
                    value={editingReview.rating}
                    onChange={(e) =>
                      setEditingReview({
                        ...editingReview,
                        rating: e.target.value,
                      })
                    }
                    min="0"
                    max="10"
                    style={styles.input}
                  />
                  <label>Review Comments:</label>
                  <textarea
                    value={editingReview.reviewComments}
                    onChange={(e) =>
                      setEditingReview({
                        ...editingReview,
                        reviewComments: e.target.value,
                      })
                    }
                    style={styles.input}
                  />
                  <button
                    style={styles.submitButton}
                    onClick={handleEditReview}
                  >
                    Update Review
                  </button>
                </div>
              </Modal>
            )}
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

const styles = {
  movieHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    borderBottom: "1px solid #ddd",
    paddingBottom: "10px",
  },
  movieName: { fontSize: "24px", fontWeight: "bold" },
  movieRating: { fontSize: "18px", fontWeight: "bold", color: "#007bff" },
  reviewSearchContainer: {
    marginBottom: "20px",
    textAlign: "left",
  },
  searchBar: {
    padding: "10px",
    fontSize: "14px",
    width: "100%",
    maxWidth: "400px",
  },
  sectionTitle: { fontSize: "20px", margin: "20px 0" },
  reviewCard: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "15px",
    marginBottom: "10px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  },
  reviewDetails: {
    flex: 1,
  },
  reviewComment: {
    fontSize: "16px",
    margin: 0,
    fontWeight: "bold",
  },
  reviewerName: { fontSize: "14px", color: "#555" },
  reviewActions: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  },
  reviewRating: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#007bff",
    marginBottom: "10px",
  },
  actionIcons: { display: "flex", gap: "10px" },
  icon: {
    fontSize: "18px",
    color: "#555",
    cursor: "pointer",
  },
  input: {
    display: "block",
    width: "100%",
    marginBottom: "10px",
    padding: "10px",
    fontSize: "14px",
    border: "1px solid #ddd",
    borderRadius: "5px",
  },
  submitButton: {
    padding: "10px 15px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    width: "100%",
  },
};

export default MovieDetails;
