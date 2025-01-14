import React, { useState } from "react";
import API from "../api/axios";

const AddMovie = ({ onMovieAdded }) => {
  const [name, setName] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !releaseDate) {
      setError("Both fields are required.");
      return;
    }

    API.post("/movies", { name, releaseDate })
      .then((response) => {
        console.log("Movie added:", response.data);
        onMovieAdded(response.data); // Update the movie list in parent component
        setName("");
        setReleaseDate("");
        setError("");
      })
      .catch((error) => {
        console.error("Error adding movie:", error);
        setError("Failed to add movie. Please try again.");
      });
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <h2>Add a New Movie</h2>
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
          Add Movie
        </button>
      </form>
    </div>
  );
};

export default AddMovie;
