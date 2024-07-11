import React, { useContext, useEffect, useState } from "react";
import Upcomming from "../upcoming/Upcomming";
import axios from "axios";

import "./categories.css";

import { AuthContext } from "../../context/AuthContext";
import Loader from "../Loader/Loader"; // Ensure you have the Loader component

const Categories = () => {
  const { token } = useContext(AuthContext);
  const [movieData, setMovieData] = useState({
    Comedy: [],
    Horror: [],
    Action: [],
    Crime: [],
    Adventure: []
  });
  const [loading, setLoading] = useState(true); // Added loading state

  const genres = ['Comedy', 'Horror', 'Action', 'Crime', 'Adventure'];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true before fetching data
      const newData = { ...movieData };
      for (let i = 0; i < genres.length; i++) {
        try {
          const response = await axios.get(
            `http://localhost:8000/api/movieList/?genre=${genres[i]}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.data[0]) {
            let list = [];
            await Promise.all(
              response.data[0].content.map(async (item) => {
                const movie = await axios.get(`http://localhost:8000/api/movie/find/${item}`, {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                });
                list.push(movie.data);
                newData[genres[i]] = list;
                return item;
              })
            );
          } else {
            newData[genres[i]] = [];
          }
        } catch (error) {
          console.log(error);
        }
      }
      setMovieData(newData);
      setLoading(false); // Set loading to false after fetching data
    };

    fetchData();
  }, [token]);

  return (
    <>
      <h1 className="listtitle">{'Categories'}</h1>
      {loading ? (
        <Loader /> // Show loader while loading
      ) : (
        genres.map((genre) => (
          <Upcomming
            key={genre}
            items={movieData[genre]}
            title={`${genre}`}
          />
        ))
      )}
    </>
  );
};

export default Categories;
