import './Hero.scss';
import { motion } from 'framer-motion';
import iPhone from '../../assets/DEMO-removebg.png';
import { useState } from 'react';
import Waitlist from '../Waitlist/Waitlist'; // Ensure correct import path
import ImageGen from '../ImageGen/ImageGen'; // Ensure correct import path

const Hero = ({ title }) => {
  const [showWaitlist, setShowWaitlist] = useState(false);
  const [showImageGen, setShowImageGen] = useState(false);

  const handleCloseModal = () => {
    setShowWaitlist(false);
    setShowImageGen(false);
  };

  const handleWaitlistClick = () => {
    setShowWaitlist(true);
  };

  const handleImageGenClick = () => {
    console.log("Generate via Prompt button clicked");
    setShowImageGen(true);
  };

  const swipeVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div className="wrapper">
      <div className="title">
        <img src={title} alt="Title" />
        <div className="desc-container">
          <motion.div
            className="desc-line desc-line-1"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: '100%', opacity: 1 }}
            transition={{ duration: 3, ease: 'easeInOut' }}
          >
            <span>WEAR YOUR CREATIVITY</span>.<span style={{ fontStyle: 'italic' }}>EXPRESS YOURSELF</span>
          </motion.div>
          <motion.div
            className="desc-line desc-line-2"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: '100%', opacity: 1 }}
            transition={{ duration: 3, ease: 'easeInOut', delay: 3 }}
          >
            <strong>ROOKUS,</strong> WHERE AI MEETS FASHION
          </motion.div>
        </div>
        <div className="button-container">
          <motion.button
            className="waitlist-button"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: 'easeInOut', delay: 6 }}
            onClick={handleWaitlistClick}
          >
            Waitlist
          </motion.button>
          <motion.button
            className="waitlist-button" // Using the same class as waitlist-button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: 'easeInOut', delay: 6.5 }}
            onClick={handleImageGenClick}
          >
            Generate via Prompt
          </motion.button>
        </div>
        <div className="carousel-container">
          <motion.div
            className="carousel"
            initial="hidden"
            animate="visible"
            variants={swipeVariants}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            <motion.div className="carousel-item">
              <img src="src\assets\image (4).png" alt="Slide 1" />
            </motion.div>
            <motion.div className="carousel-item">
              <img src="src\assets\sanemi.jpg" alt="Slide 2" />
            </motion.div>
            <motion.div className="carousel-item">
              <img src="src/assets/satan.jpg" alt="Slide 3" />
            </motion.div>
            <motion.div className="carousel-item">
              <img src="src/assets/satan.jpg" alt="Slide 3" />
            </motion.div>
            <motion.div className="carousel-item">
              <img src="src/assets/satan.jpg" alt="Slide 3" />
            </motion.div>
            <motion.div className="carousel-item">
              <img src="src/assets/satan.jpg" alt="Slide 3" />
            </motion.div>
            {/* Add more slides as needed */}
          </motion.div>
        </div>
      </div>
      <div className="app">
        <img src={iPhone} alt="iPhone" />
      </div>
      {showWaitlist && (
        <div className="modal-backdrop" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={handleCloseModal}>×</button>
            <Waitlist />
          </div>
        </div>
      )}
      {showImageGen && (
        <div className="modal-backdrop" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={handleCloseModal}>×</button>
            <ImageGen />
          </div>
        </div>
      )}
    </div>
  );
};

export default Hero;
