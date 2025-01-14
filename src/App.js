import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MovieDetails from "./pages/MovieDetails";
import ReviewSearch from "./pages/ReviewSearch";
import "@fortawesome/fontawesome-free/css/all.min.css";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/movie/:id" element={<MovieDetails />} />
      <Route path="/search-reviews" element={<ReviewSearch />} />
    </Routes>
  );
};

export default App;
