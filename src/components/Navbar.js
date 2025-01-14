import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ onAddMovieClick, onAddReviewClick }) => {
  const navigate = useNavigate();

  return (
    <div style={styles.navbar}>
      <h1 style={styles.logo} onClick={() => navigate("/")}>
        MOVIECRITIC
      </h1>
      <div style={styles.navButtons}>
        <button style={styles.button} onClick={onAddMovieClick}>
          Add New Movie
        </button>
        <button style={styles.button} onClick={onAddReviewClick}>
          Add New Review
        </button>
      </div>
    </div>
  );
};

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#f5f5f5",
    borderBottom: "1px solid #ddd",
    cursor: "pointer",
  },
  logo: { fontSize: "24px", fontWeight: "bold", color: "#333" },
  navButtons: { display: "flex", gap: "10px" },
  button: {
    padding: "10px 15px",
    fontSize: "14px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Navbar;
