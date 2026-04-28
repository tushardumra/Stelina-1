import React, { useState } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HomeSlider = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    fade: true,         // Matches original template transition
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
    beforeChange: (current, next) => setActiveSlide(next), // Tracks which slide is active
    responsive: [
      {
        breakpoint: 1024,
        settings: { arrows: true }
      },
      {
        breakpoint: 768, // Tablet
        settings: { arrows: false }
      }
    ]
  };
  return (
    <div className="home-slider fullwidth rows-space-60">
      <Slider {...settings} className="slider-owl nav-center">
        
        {/* Slide 1 */}
        <div className={`slider-item style4 ${activeSlide === 0 ? 'slick-active' : ''}`}>
          <div className="slider-inner">
            <div className="container">
              <div className="slider-infor">
                <h5 className="title-small animated-text">Sale up to 40% off!</h5>
                <h3 className="title-big animated-text">Limited time.<br />Be quick !</h3>
                <div className="price animated-text">
                  New Price: <span className="number-price">$25.00</span>
                </div>
                <a href="#" className="button animated-text">Shop now</a>
              </div>
            </div>
          </div>
        </div>

        {/* Slide 2 */}
        <div className={`slider-item style5 ${activeSlide === 0 ? 'slick-active' : ''}`}>
          <div className="slider-inner equal-element">
            <div className="container">
              <div className="slider-infor">
                <h5 className="title-small">Start weekend off!</h5>
                <h3 className="title-big">Huge sale<br />Up to 75% Off</h3>
                <div className="when-code">
                  When Use Code: <span className="number-code">STELINA</span>
                </div>
                <a href="#" className="button btn-view-promotion bgroud-style">Shop now</a>
              </div>
            </div>
          </div>
        </div>

        {/* Slide 3 */}
        <div className={`slider-item style6 ${activeSlide === 0 ? 'slick-active' : ''}`}>
          <div className="slider-inner equal-element">
            <div className="container">
              <div className="slider-infor">
                <h5 className="title-small">Make your hand!</h5>
                <h3 className="title-big">New Trending <br />Collection</h3>
                <div className="price">
                  Template Price: <span className="number-price">$89.00</span>
                </div>
                <a href="#" className="button btn-lets-create bgroud-style">Shop now</a>
              </div>
            </div>
          </div>
        </div>

      </Slider>
    </div>
  )
}

export default HomeSlider
