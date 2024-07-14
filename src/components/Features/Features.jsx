import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import image1 from '../../assets/1.png';
import image2 from '../../assets/2.png';
import image3 from '../../assets/3.png';
import image5 from '../../assets/5.png';
import image6 from '../../assets/6.png';
import image7 from '../../assets/7.png';

import './Features.scss';

const Features = () => {
  return (
    <div className='wrapper'>
      <div className="title">
        <div className="heading">
          What's in store for you.
        </div>
        <div className="subHeading">
          Discover our features
        </div>
      </div>
        <div className="features-container">
          <div className="row">
          <div className="element">
            <div className="imageHeading">Verified Community</div>
            <img src={image1} alt="Feature 1" />
          </div>
          <div className="element">
            <div className="imageHeading">Online Store</div>
            <img src={image2} alt="Feature 2" />
          </div>
          <div className="element">
            <div className="imageHeading">Mockup Engine</div>
            <img src={image3} alt="Feature 3" />
          </div>
          </div>
          <div className="row">
            <div className="square">
              <div className="imageHeading">Mockup-Engine Gen1</div>
              <img src={image5} alt="Screen 1" />
            </div>
            <div className="square">
              <div className="imageHeading">Rookus-Xpress Engine</div>
              <img src={image6} alt="Screen 2" />
            </div>
            <div className="square">
              <div className="imageHeading">Rookus Inpainting</div>
              <img src={image7} alt="Screen 3" />
            </div>
          </div>
        </div>
      </div>
  );
};

export default Features;
