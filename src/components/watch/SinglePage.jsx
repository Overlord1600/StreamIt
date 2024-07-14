import React, { useState, useEffect, useContext } from "react";
import "./style.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import RatingCard from "../Rating/Rating";
import { AuthContext } from "../../context/AuthContext";
import UserContext from "../../context/UserContext";
import {
  WhatsappShareButton,
  WhatsappIcon,
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  TelegramShareButton,
  TelegramIcon,
} from "react-share";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const SinglePage = () => {
  const [loading, setLoading] = useState(true);
  const [watchLater, setWatchLater] = useState(false);
  const { movieId, type } = useParams();
  const { id, token } = useContext(AuthContext);
  const [item, setItem] = useState(null);
  const [items, setItems] = useState([]);
  const [seriesTitle, setSeriesTitle] = useState("");
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/movie/find/${movieId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setItem(response.data);
        if (currentUser) {
          const watch = currentUser.watchLaterList.find(
            (item) => item.movie === movieId
          );
          if (watch) {
            setWatchLater(true);
          }
        }
      } catch (error) {
        console.error("Error fetching movie:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [movieId, currentUser, token]);

  useEffect(() => {
    if (item) {
      setItems(item.episodes || []);
      setSeriesTitle(item.name);
      console.log(item);
    }
  }, [item]);

  const handleWatchLater = async () => {
    setLoading(true);
    try {
      if (!watchLater) {
        setWatchLater(true);
        const watchLaterList = currentUser.watchLaterList || [];
        const data = { movie: movieId };
        watchLaterList.push(data);
        await axios.put(
          `http://localhost:8000/api/user/${id}`,
          { ...currentUser, watchLaterList: watchLaterList },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        alert("Movie added to watch later lists");
      }
    } catch (error) {
      console.error("Error adding to watch later list:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        item && (
          <div>
            <section className="singlePage">
              <div className="singleHeading">
                <h1>{item.name}</h1> <span> | {item.time} | </span>{" "}
                <span> HD </span>
              </div>
              <div className="container">
                <video src={item.video} controls></video>
                <div className="para-rating-container">
                  <div className="para">
                    <h1 className="title">{item.name}</h1>
                    <h1 className="description">{item.desc}</h1>
                    <h1>
                      Ratings: {item.totalRating}/5 ({item.rating.length}{" "}
                      ratings)
                    </h1>
                    <h1>Tags: {item.tags}</h1>
                    <h1>Released on: {item.date}</h1>
                    {type === "Series" &&
                      item.episodes.length > 0 ? (
                        <div className="ep">
                          <h2>Watch Episodes now</h2>
                          <Link
                            to={{
                              pathname: "/episode",
                              state: { items, seriesTitle, movieId },
                            }}
                          >
                            <button className="watchlaterbutton">
                              Watch Episode
                            </button>
                          </Link>
                        </div>
                      ) : null}
                    {watchLater ? (
                      <div>
                        <h1 className="watchlater">Added to watch later</h1>
                      </div>
                    ) : (
                      <div>
                        <h1 className="watchlater">Want to watch later?</h1>
                        <button
                          onClick={handleWatchLater}
                          className="watchlaterbutton"
                        >
                          Add to Watch later
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="rating-cont">
                    <h2 className="rating">Give feedback</h2>
                    <RatingCard movie={item} loadingState={setLoading} />
                  </div>
                </div>
                <div className="soical">
                  <h3>Share:</h3>

                  <i className="px-1">
                    <WhatsappShareButton
                      url={window.location.href}
                      quote={item.name}
                    >
                      <WhatsappIcon
                        logoFillColor="white"
                        size={53}
                        round={true}
                      />
                    </WhatsappShareButton>
                  </i>
                  <i className="px-1">
                    <FacebookShareButton
                      url={window.location.href}
                      quote={item.name}
                    >
                      <FacebookIcon
                        logoFillColor="white"
                        size={53}
                        round={true}
                      />
                    </FacebookShareButton>
                  </i>
                  <i className="px-1">
                    <TwitterShareButton
                      url={window.location.href}
                      quote={item.name}
                    >
                      <TwitterIcon
                        logoFillColor="white"
                        size={53}
                        round={true}
                      />
                    </TwitterShareButton>
                  </i>
                  <i className="px-1">
                    <TelegramShareButton
                      url={window.location.href}
                      quote={item.name}
                    >
                      <TelegramIcon
                        logoFillColor="white"
                        size={53}
                        round={true}
                      />
                    </TelegramShareButton>
                  </i>
                </div>
              </div>
            </section>
          </div>
        )
      )}
    </>
  );
};

export default SinglePage;
