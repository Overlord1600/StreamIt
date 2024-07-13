import React from "react"

import { WhatsappShareButton, WhatsappIcon, FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon, TelegramShareButton, TelegramIcon } from 'react-share'

import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { Link } from "react-router-dom"

const SampleNextArrow = (props) => {
  const { onClick } = props
  return (
    <div className='control-btn' onClick={onClick}>
      <button className='next'>
        <i class='fa fa-chevron-right'></i>
      </button>
    </div>
  )
}
const SamplePrevArrow = (props) => {
  const { onClick } = props
  return (
    <div className='control-btn' onClick={onClick}>
      <button className='prev'>
        <i class='fa fa-chevron-left'></i>
      </button>
    </div>
  )
}
const Episodes = ({ items , seriesTitle,movieId}) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
    ],
  }
  return (
    <>
      {
      <Slider {...settings}>
        {items.map((item,index) => {
                return (
                  <>
                        <div>
            <section className='singlePage'>
              <div className='singleHeading'>
              <Link to={`/singlepage/${movieId}/Series`}><h1>{seriesTitle}</h1></Link>   <span> | Episode {index+1}  </span> <span> | {item.time} | </span> <span> HD </span>
              </div>
              <div className='container'>
                <video src={item.video} controls></video>
                <div className='para-rating-container'>
                  <div className='para'>
                    <h1 className="title">{item.name}</h1>
                    <h1 className="description">{item.desc}</h1>
                    <h1>Released on : {item.date}</h1>
                  </div>
                </div>
               
              </div>
            </section>
          </div>
                  </>
                )
              })}
      </Slider>
      
          }
    </>
  )
}

export default Episodes;
