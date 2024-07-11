import React, { useContext, useEffect, useState } from "react";
import "./genreCard.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import UserContext from "../../context/UserContext";
import { AuthContext } from "../../context/AuthContext";

const GenreCard = ({ genre, image,backgroundColor }) => {
  const [items,setMovies] = useState([]);
  const {token} = useContext(AuthContext);
  const title = genre;
  useEffect(() => {
    const fetchData = async () => {
    try {
        const response = await axios.get(
          `http://localhost:8000/api/movieList/?genre=${genre}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const movieList = await Promise.all(response.data[0].content.map(async(item) => {
          const res = await axios.get(`http://localhost:8000/api/movie/find/${item}`,{
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          return res.data;
        }))
        setMovies(movieList);
      }
     catch (err) {
      console.log(err);
    }
  }
    fetchData();
  },[]);
  return (
    <Link to={{ pathname: "/all", state: { items ,title } }}>
        <div className="genre-card" style={{ backgroundImage: `url(${image})` }}>
      <div className="overlay" style={{ backgroundColor }}>
        <div className="genre-content">
          <h2 className="genre-title">{genre}</h2>
        </div>
      </div>
    </div>
    </Link>
  );
};

export default GenreCard;
