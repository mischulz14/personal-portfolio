import { motion, useAnimation } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'heroicons-react';
import React, { useState } from 'react';

interface CarouselProps {
  components: React.ReactNode[];
}

const Carousel: React.FC<CarouselProps> = ({ components }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animationState, setAnimationState] = useState('idle');

  const variants = {
    idle: { scale: 1 },
    grow: { scale: 1.05, transition: { duration: 0.2 } },
    shrink: { scale: 1, transition: { duration: 0.2 } },
  };

  const handleNext = () => {
    if (currentIndex < components.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setAnimationState('grow');
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setAnimationState('grow');
    }
  };

  return (
    <div className="relative">
      {currentIndex > 0 && (
        <button
          className="absolute top-1/2 hover:scale-110 transition-all duration-300 -left-[70px] shadow-whiteBox -translate-y-2/3 p-4 rounded-md z-[9999]"
          onClick={handlePrevious}
        >
          <ArrowLeft color="white" />
        </button>
      )}
      <motion.div
        initial="idle"
        animate={animationState}
        variants={variants}
        onAnimationComplete={() => setAnimationState('shrink')}
        transition={{ type: 'spring', stiffness: 200 }}
      >
        {components[currentIndex]}
      </motion.div>
      {currentIndex < components.length - 1 && (
        <button
          className="absolute top-1/2 hover:scale-110 transition-all duration-300 -right-[70px] shadow-whiteBox -translate-y-2/3 p-4 rounded-md z-[9999]"
          onClick={handleNext}
        >
          <ArrowRight color="white" />
        </button>
      )}
    </div>
  );
};

export default Carousel;
