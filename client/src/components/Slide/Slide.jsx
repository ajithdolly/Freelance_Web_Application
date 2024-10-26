import "./Slide.scss";

import React from "react";
import { Slider } from "infinite-react-carousel/lib";



const Slide = ({children,slidesToShow,arrowsScroll}) => {
  return (
    <div className="slide">
      <div className="container">
        <Slider slidesToShow ={slidesToShow} arrowsScroll={arrowsScroll}>
            {children}
        </Slider>
      </div>
    </div>
  );
};

export default Slide;