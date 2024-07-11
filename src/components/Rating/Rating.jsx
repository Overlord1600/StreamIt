import React, { useContext, useEffect, useState } from "react";
import "./rating.css";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import UserContext from "../../context/UserContext";

const RatingCard = ({ movie, loadingState }) => {
  const { token, id } = useContext(AuthContext);
  const [userRating, setUserRating] = useState(0);
  const [hasRated, setHasRated] = useState(false);
  const { currentUser, setCurrentUser } = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      loadingState(true);
      try {
        if (currentUser) {
          const userRatings = currentUser.ratings;
          const movieRating = userRatings.find(rating => rating.movie === movie._id);
          if (movieRating) {
            setUserRating(movieRating.rating);
            setHasRated(true);
          }
        }
      } catch (error) {
        console.error('Error fetching user ratings:', error);
      } finally {
        loadingState(false);
      }
    };
    fetchData();
  }, [currentUser, movie._id, loadingState]);

  const setRating = async (userrating) => {
    loadingState(true);
    try {
      const userRatings = currentUser.ratings || [];
      const updatedRatings = [...userRatings, { movie: movie._id, rating: userrating }];
      await axios.put(`http://localhost:8000/api/user/${id}`, { ...currentUser, ratings: updatedRatings }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const updatedMovieRating = [...movie.rating, userrating];
      const totalRatingValue = updatedMovieRating.reduce((acc, rating) => acc + rating, 0) / updatedMovieRating.length;
      await axios.put(`http://localhost:8000/api/movie/${movie._id}`, { ...movie, rating: updatedMovieRating, totalRating: totalRatingValue }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setCurrentUser(prev => ({ ...prev, ratings: updatedRatings }));
    } catch (error) {
      console.error('Error setting rating:', error);
    } finally {
      loadingState(false);
    }
  };

  const handleRating = async (rate) => {
    if (!hasRated) {
      loadingState(true);
      setUserRating(rate);
      setHasRated(true);
      await setRating(rate);
    }
  };

  return (
    <div className="rating-card">
      <div className="rating-card-info">
        <span className="rating-value">{userRating}/5</span>
        <span className="rating-reviews">stars</span>
      </div>
      <div className="rating-card-stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            className={`star-button ${userRating >= star ? "active" : ""}`}
            onClick={() => handleRating(star)}
          >
            {userRating >= star ? "★" : "☆"}
          </button>
        ))}
      </div>
      <div className="rating-card-feedback">
        <span>{hasRated ? 'Thanks for your rating' : 'What do you think about this movie?'}</span>
      </div>
    </div>
  );
};

export default RatingCard;
