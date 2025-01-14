import React, { useState } from "react";
import API from "../api/axios";

const EditMovie = ({ movie, onMovieUpdated, onCancel }) => {
  const [name, setName] = useState(movie.name);
  const [releaseDate, setReleaseDate] = useState(
    movie.releaseDate.split("T")[0]
  );
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !releaseDate) {
      setError("Both fields are required.");
      return;
    }

    API.patch(`/movies/${movie.id}`, { name, releaseDate })
      .then((response) => {
        console.log("Movie updated:", response.data);
        onMovieUpdated(response.data); // Update the movie list in parent
        setError("");
      })
      .catch((error) => {
        console.error("Error updating movie:", error);
        setError("Failed to update movie. Please try again.");
      });
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <h2>Edit Movie</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ padding: "10px", marginLeft: "10px" }}
            />
          </label>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Release Date:
            <input
              type="date"
              value={releaseDate}
              onChange={(e) => setReleaseDate(e.target.value)}
              style={{ padding: "10px", marginLeft: "10px" }}
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

export default EditMovie;
