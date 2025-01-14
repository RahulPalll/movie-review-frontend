import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Modal from "../components/Modal";
import API from "../api/axios";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [isMovieModalOpen, setIsMovieModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [newMovie, setNewMovie] = useState({ name: "", releaseDate: "" });
  const [newReview, setNewReview] = useState({
    movieId: "",
    reviewerName: "",
    rating: "",
    reviewComments: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = () => {
    API.get("/movies").then((response) => setMovies(response.data));
  };

  const handleMovieCardClick = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  const handleDeleteMovie = (movieId) => {
    if (window.confirm("Are you sure you want to delete this movie?")) {
      API.delete(`/movies/${movieId}`)
        .then(() => fetchMovies())
        .catch((error) => console.error("Error deleting movie:", error));
    }
  };

  const handleEditMovie = (movie) => {
    setNewMovie({ name: movie.name, releaseDate: movie.releaseDate });
    setIsMovieModalOpen(true);
  };

  const handleAddMovie = () => {
    if (!newMovie.name || !newMovie.releaseDate) {
      alert("Please fill all fields!");
      return;
    }
    API.post("/movies", newMovie)
      .then(() => {
        fetchMovies();
        setIsMovieModalOpen(false);
        setNewMovie({ name: "", releaseDate: "" });
      })
      .catch((error) => console.error("Error adding movie:", error));
  };

  const handleAddReview = () => {
    if (!newReview.movieId || !newReview.rating || !newReview.reviewComments) {
      alert("Please fill all fields!");
      return;
    }
    API.post("/reviews", newReview)
      .then(() => {
        fetchMovies();
        setIsReviewModalOpen(false);
        setNewReview({
          movieId: "",
          reviewerName: "",
          rating: "",
          reviewComments: "",
        });
      })
      .catch((error) => console.error("Error adding review:", error));
  };

  const filteredMovies = movies.filter((movie) =>
    movie.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <Navbar
        onAddMovieClick={() => setIsMovieModalOpen(true)}
        onAddReviewClick={() => setIsReviewModalOpen(true)}
      />

      {/* Tagline */}
      <div style={styles.tagline}>The best movie review site</div>

      {/* Search Bar */}
      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search movies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.searchBar}
        />
      </div>

      {/* Movie Cards */}
      <div style={styles.movieGrid}>
        {filteredMovies.map((movie) => (
          <div key={movie.id} style={styles.movieCard}>
            <div onClick={() => handleMovieCardClick(movie.id)}>
              <h3>{movie.name}</h3>
              <p>
                Release Date: {new Date(movie.releaseDate).toLocaleDateString()}
              </p>
              <p>Avg Rating: {movie.averageRating || "No ratings yet"}</p>
            </div>

            {/* Icons */}
            <div style={styles.cardActions}>
              <i
                className="fa fa-edit"
                style={styles.iconEdit}
                onClick={(e) => {
                  e.stopPropagation();
                  handleEditMovie(movie);
                }}
              ></i>
              <i
                className="fa fa-trash"
                style={styles.iconDelete}
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteMovie(movie.id);
                }}
              ></i>
            </div>
          </div>
        ))}
      </div>

      {/* Add Movie Modal */}
      {isMovieModalOpen && (
        <Modal
          title="Add/Edit Movie"
          onClose={() => setIsMovieModalOpen(false)}
        >
          <div>
            <label>Movie Name:</label>
            <input
              type="text"
              value={newMovie.name}
              onChange={(e) =>
                setNewMovie({ ...newMovie, name: e.target.value })
              }
              style={styles.input}
            />
            <label>Release Date:</label>
            <input
              type="date"
              value={newMovie.releaseDate}
              onChange={(e) =>
                setNewMovie({ ...newMovie, releaseDate: e.target.value })
              }
              style={styles.input}
            />
            <button style={styles.submitButton} onClick={handleAddMovie}>
              {newMovie.name ? "Update Movie" : "Add Movie"}
            </button>
          </div>
        </Modal>
      )}

      {/* Add Review Modal */}
      {isReviewModalOpen && (
        <Modal
          title="Add New Review"
          onClose={() => setIsReviewModalOpen(false)}
        >
          <div>
            <label>Select Movie:</label>
            <select
              value={newReview.movieId}
              onChange={(e) =>
                setNewReview({ ...newReview, movieId: e.target.value })
              }
              style={styles.input}
            >
              <option value="">Select a movie</option>
              {movies.map((movie) => (
                <option key={movie.id} value={movie.id}>
                  {movie.name}
                </option>
              ))}
            </select>
            <label>Reviewer Name:</label>
            <input
              type="text"
              value={newReview.reviewerName}
              onChange={(e) =>
                setNewReview({ ...newReview, reviewerName: e.target.value })
              }
              style={styles.input}
            />
            <label>Rating:</label>
            <input
              type="number"
              value={newReview.rating}
              onChange={(e) =>
                setNewReview({ ...newReview, rating: e.target.value })
              }
              min="0"
              max="10"
              style={styles.input}
            />
            <label>Review Comments:</label>
            <textarea
              value={newReview.reviewComments}
              onChange={(e) =>
                setNewReview({ ...newReview, reviewComments: e.target.value })
              }
              style={styles.input}
            />
            <button style={styles.submitButton} onClick={handleAddReview}>
              Add Review
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

const styles = {
  tagline: {
    textAlign: "left",
    padding: "10px 20px",
    fontSize: "16px",
    color: "#555",
    fontStyle: "italic",
  },
  searchContainer: {
    padding: "20px",
  },
  searchBar: {
    padding: "10px",
    fontSize: "14px",
    width: "300px",
  },
  movieGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "20px",
    padding: "20px",
  },
  movieCard: {
    position: "relative",
    backgroundColor: "#f9f9f9",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "15px",
    textAlign: "center",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    cursor: "pointer",
  },
  cardActions: {
    position: "absolute",
    bottom: "10px",
    right: "10px",
    display: "flex",
    gap: "10px",
  },
  iconEdit: {
    fontSize: "18px",
    color: "#007bff",
    cursor: "pointer",
  },
  iconDelete: {
    fontSize: "18px",
    color: "red",
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

export default HomePage;
