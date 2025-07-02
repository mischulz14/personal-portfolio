import { motion } from 'framer-motion';
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
    grow: { scale: 1.02, transition: { duration: 0.2 } },
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
          className="absolute bg-black/40 sm:bottom-1/2 -top-[20%] sm:top-auto hover:scale-105 transition-all duration-300 sm:-left-[70px] left-0 shadow-whiteBox translate-y-1/3 p-4 rounded-md z-[9999]"
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
        {components ? components[currentIndex] : null}
      </motion.div>
      {currentIndex < components.length - 1 && (
        <button
          className="absolute bg-black/40 sm:bottom-1/2 -top-[20%] sm:top-auto  hover:scale-105 transition-all duration-300 sm:-right-[70px] right-0 shadow-whiteBox translate-y-1/3 p-4 rounded-md z-[9999]"
          onClick={handleNext}
        >
          <ArrowRight color="white" />
        </button>
      )}
    </div>
  );
};

export default Carousel;
