import React from "react";
import { Link } from "react-router-dom";

const HomeCard = ({ item: { _id, cover, titleImage, tags, desc, date, time, rating,type } }) => {
  return (
    <div className="home">
      <div className="coverImage">
        <img src={cover} alt="Movie Cover" />
        <div className="overlay">
          <div className="infoBox">
            <div className="fitimage"><img src={titleImage} alt="Title" className="titleImage" /></div>
            
            <div className="movieDetails">
              <span>{date}</span>
              <span>{tags}</span>
              <span>{time}</span>
            </div>
            <p className="desc">{desc}</p>
            <div className="playButton">
              <Link to={`/singlepage/${_id}/${type}`}>
                <button>
                  <div className="img">
                    <img src="./images/play-button.png" alt="play-button" />
                    <img src="./images/play.png" className="change" alt="play-button" />
                  </div>
                  WATCH NOW
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeCard;
