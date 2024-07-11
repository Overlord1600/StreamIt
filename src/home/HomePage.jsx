import React, { useContext, useEffect, useState } from "react";
import Homes from "../components/homes/Homes";
import Upcomming from "../components/upcoming/Upcomming";
import axios from "axios";
import { ChoiceContext } from "../context/ChoiceContext";
import { AuthContext } from "../context/AuthContext";
import GenreList from "../components/GenreCard/GenreList";
import Loader from "../components/Loader/Loader";

const HomePage = () => {
  const { token } = useContext(AuthContext);
  const { choice } = useContext(ChoiceContext);
  const [topItems, setTopItems] = useState([]);
  const [recent, setRecent] = useState([]);
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (!token) {
          console.error("No token found!");
          return;
        }

        const type = choice === "Movie" ? "Movie" : "Series";

        const movieListUrl = `http://localhost:8000/api/movieList/?type=${type}`;
        const topRatedUrl = `http://localhost:8000/api/movie/top-rated?type=${type}`;
        const recentUrl = `http://localhost:8000/api/movie/recent?type=${type}`;
        const trendingUrl = `http://localhost:8000/api/movie/random?type=${type}`;

        const [trendingResponse, recentResponse, topRatedResponse] = await Promise.all([
          axios.get(trendingUrl, { headers: { Authorization: `Bearer ${token}` } }),
          axios.get(recentUrl, { headers: { Authorization: `Bearer ${token}` } }),
          axios.get(topRatedUrl, { headers: { Authorization: `Bearer ${token}` } })
        ]);

        setTrending(trendingResponse.data);
        setRecent(recentResponse.data);
        setTopItems(topRatedResponse.data);

        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [choice, token]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Homes />
          <Upcomming items={recent} title={`Recent ${choice === "Movie" ? "Movies" : "Series"}`} key={"1"} />
          {choice === "Movie" ? <GenreList title={'Popular genre'} /> : null}
          <Upcomming items={trending} title={`Trending ${choice === "Movie" ? "Movies" : "Series"}`} key={"2"} />
          <Upcomming items={topItems} title={`Top Rated ${choice === "Movie" ? "Movies" : "Series"}`} key={"3"} />
        </>
      )}
    </>
  );
};

export default HomePage;
