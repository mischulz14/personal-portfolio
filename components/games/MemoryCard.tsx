import { ColorThemeContext } from '@/context/ColorThemeContextProvider';
import {
  MemoryCard,
  MemoryCardContext,
} from '@/context/MemoryGameContextProvider';
import { motion, useAnimation } from 'framer-motion';
import { useContext, useEffect, useRef, useState } from 'react';

interface MemoryCardProps {
  card: MemoryCard;
}
export default function MemoryCard({ card }: MemoryCardProps) {
  const gameContext = useContext(MemoryCardContext);
  const [isCardFlipped, setIsCardFlipped] = useState(false); // State to reverse the animation
  const controls = useAnimation(); // Initialize animation controls
  const [isLocked, setIsLocked] = useState(false); // prevents double clicking on the same card
  const isMountedRef = useRef(false);

  useEffect(() => {
    isMountedRef.current = true;

    return () => {
      isMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (!isMountedRef.current) return;
    if (card.isMatched) return;
    if (gameContext.resetBoard) {
      setIsCardFlipped(false);
      setTimeout(() => {
        if (!isMountedRef.current) return;
        controls.start({
          x: 100,
          y: 100,
          opacity: 0,
        });
      }, 1000);
    }
  }, [controls, gameContext.resetBoard]);

  useEffect(() => {
    if (gameContext.flippedUpCards.length < 2) return;

    if (
      gameContext.flippedUpCards[0].id !== card.id &&
      gameContext.flippedUpCards[1].id !== card.id
    ) {
      setIsCardFlipped(false);
    }
  }, [gameContext.flippedUpCards]);

  const handleButtonClick = () => {
    if (gameContext.isCheckingForMatch || card.isMatched || isCardFlipped) {
      console.log(
        'card is already matched, flipped, or another condition prevents click',
      );
      return;
    }

    setIsCardFlipped(true);

    controls.start({
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.2,
        type: 'spring',
        stiffness: 300,
        damping: 20,
      },
    });

    gameContext?.flippedUpCards.push(card);
    if (gameContext.flippedUpCards.length === 2) {
      console.log('2 cards flipped');
      gameContext.checkForMatch();
      return;
    }

    if (gameContext.flippedUpCards.length === 1) {
      console.log('1 card flipped');
      return;
    }
  };

  return (
    <div>
      <button
        onClick={handleButtonClick}
        className={`sm:w-20 sm:h-20 w-16 h-16 shadow-whiteBox !overflow-hidden border-[0.5px] border-white/30 rounded-lg flex items-center justify-center relative ${
          !card.isMatched &&
          !isCardFlipped &&
          'hover:scale-105 hover:border-2 duration-200 transition-all !overflow-hidden'
        }`}
      >
        <motion.div
          animate={controls}
          initial={{ x: 100, y: 100, opacity: 0 }} // Initial off-screen position and hidden
          className="sm:w-10 sm:h-10 w-7 h-7 flex justify-center items-center"
        >
          {card.renderedSvg}
        </motion.div>
        <Triangles controls={controls} />
      </button>
    </div>
  );
}

export function Triangles({ controls }: { controls: any }) {
  const colorContext = useContext(ColorThemeContext);

  return (
    <div>
      <motion.div
        className="h-9 w-9 absolute -top-6 -left-5 rotate-45"
        style={{
          backgroundColor: colorContext.colorThemeColor,
        }}
        animate={controls}
        initial={{ x: 100, y: 100, opacity: 0 }} // Initial off-screen position and hidden
      />
      <motion.div
        className="h-9 w-9 absolute -top-6 -right-5 rotate-45"
        style={{
          backgroundColor: colorContext.colorThemeColor,
        }}
        animate={controls}
        initial={{ x: 100, y: 100, opacity: 0 }}
      />
      <motion.div
        className="h-9 w-9 absolute -bottom-6 -right-5 rotate-45"
        style={{
          backgroundColor: colorContext.colorThemeColor,
        }}
        animate={controls}
        initial={{ x: 100, y: 100, opacity: 0 }}
      />
      <motion.div
        className="h-9 w-9 absolute -bottom-6 -left-5 rotate-45"
        style={{
          backgroundColor: colorContext.colorThemeColor,
        }}
        animate={controls}
        initial={{ x: 100, y: 100, opacity: 0 }}
      />
    </div>
  );
}
