import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import GenreCard from "./GenreCard";

// Sample genres with image URLs
const genres = [
  { name: 'Comedy', image: 'url_to_comedy_image.jpg' },
  { name: 'Action', image: 'url_to_action_image.jpg' },
  { name: 'Crime', image: 'url_to_crime_image.jpg' },
  { name: 'Adventure', image: 'url_to_adventure_image.jpg' },
  { name: 'Horror', image: 'url_to_horror_image.jpg' }
];

const SampleNextArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="control-btn" onClick={onClick}>
      <button className="next">
        <i className="fa fa-chevron-right"></i>
      </button>
    </div>
  );
};

const SamplePrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="control-btn" onClick={onClick}>
      <button className="prev">
        <i className="fa fa-chevron-left"></i>
      </button>
    </div>
  );
};

// Function to generate random colors
const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const GenreList = ({ title }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <section className="upcome">
        <div className="container">
          <div className="heading flexSB">
            <h1 style={{ fontSize: 35 }}>{title}</h1>
            
          </div>
          <div className="content">
            <Slider {...settings}>
              {genres.map((item, index) => {
                const backgroundColor = getRandomColor();
                return (
                  <GenreCard
                    genre={item.name}
                    backgroundColor={backgroundColor}
                    image={item.image}
                    key={item.name}
                  />
                );
              })}
            </Slider>
          </div>
        </div>
      </section>
    </>
  );
};

export default GenreList;
