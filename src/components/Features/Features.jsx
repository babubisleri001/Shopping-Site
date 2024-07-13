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
  const scrollContainerRef = useRef(null);
  const screenContainerRef = useRef(null);

  useEffect(() => {
    const handleWheel = (event) => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollLeft += event.deltaY;
      }
    };

    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('wheel', handleWheel);
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('wheel', handleWheel);
      }
    };
  }, []);

  useEffect(() => {
    const handleWheel = (event) => {
      if (screenContainerRef.current) {
        screenContainerRef.current.scrollLeft += event.deltaY;
      }
    };

    const screenContainer = screenContainerRef.current;
    if (screenContainer) {
      screenContainer.addEventListener('wheel', handleWheel);
    }

    return () => {
      if (screenContainer) {
        screenContainer.removeEventListener('wheel', handleWheel);
      }
    };
  }, []);

  return (
    <>
      <div className="heading">
        What's in store for you.
      </div>
      <div className="subHeading">
        Discover our features
      </div>
      <div ref={scrollContainerRef} className="scrollingContainer">
        <div className="element first">
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
      <div ref={screenContainerRef} className="scrollingContainer">
        <div className="element first">
          <div className="imageHeading">Mockup-Engine Gen1</div>
          <img src={image5} alt="Screen 1" />
        </div>
        <div className="element">
          <div className="imageHeading">Rookus-Xpress Engine</div>
          <img src={image6} alt="Screen 2" />
        </div>
        <div className="element">
          <div className="imageHeading">Rookus Inpainting</div>
          <img src={image7} alt="Screen 3" />
        </div>
      </div>
    </>
  );
};

export default Features;
