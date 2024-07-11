import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import MoviesGrid from "../AllItems/AllItems";
import UserContext from "../../context/UserContext";
import Loader from "../Loader/Loader"; // Ensure you have the Loader component

const WatchLater = () => {
  const { id, token } = useContext(AuthContext);
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true before fetching data
      try {
        if (currentUser.watchLaterList) {
          const movies = await Promise.all(
            currentUser.watchLaterList.map(async (item) => {
              const res = await axios.get(`http://localhost:8000/api/movie/find/${item.movie}`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
              return res.data;
            })
          );
          setList(movies);
        } else {
          setList([]);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };
    fetchData();
  }, [currentUser, token]);

  console.log(list);
  
  return loading ? <Loader /> : <MoviesGrid movies={list} title={"Watch Later List"} />;
};

export default WatchLater;
