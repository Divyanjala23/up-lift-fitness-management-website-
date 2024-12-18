import React from 'react'
import { Link } from 'react-router-dom';
import '../assets/css/slider.css';

const Slider = () => {
  return (
    // <!--? slider Area Start-->
        <div class="slider-area position-relative">
            <div class="slider-active">
                {/* <!-- Single Slider --> */}
                
                {/* <!-- Single Slider --> */}
                <div class="single-slider slider-height d-flex align-items-center">
                    <div class="container">
                        <div class="row">
                            <div class="col-xl-7 col-lg-9 col-md-8 col-sm-9">
                                <div class="hero__caption">
                                    <span data-animation="fadeInLeft" data-delay="0.1s">with patrick potter</span>
                                    <h1 data-animation="fadeInLeft" data-delay="0.4s">Build Perfect body Shape for good and Healthy life.</h1>
                                    <Link to="/signup" class="btn hero-btn" data-animation="fadeInLeft" data-delay="0.8s">became a member</Link>
                                </div>
                            </div>
                        </div>
                    </div>          
                </div>
                <div class="video-icon">
                <a class="popup-video btn-icon" href="https://www.youtube.com/watch?v=ruX4Le0kBng"><i class="fas fa-play"></i></a>
            </div>
            </div>
            {/* <!-- Video icon --> */}
            
        </div>
        // <!-- slider Area End-->
  )
}

export default Slider