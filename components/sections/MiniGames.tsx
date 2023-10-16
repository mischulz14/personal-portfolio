import {
  MemoryCard as MemoryCardType,
  MemoryCardContext,
} from '@/context/MemoryGameContextProvider';
import { motion } from 'framer-motion';
import { useContext, useEffect, useState } from 'react';

import MemoryCard from '../games/MemoryCard';
import MemoryCardContainer from '../games/MemoryCardContainer';
import Button from '../ui/Button';

export default function MiniGames() {
  const memoryGameContext = useContext(MemoryCardContext);

  const [renderedComponent, setRenderedComponent] = useState<
    'memory' | 'win' | 'home'
  >('home');

  useEffect(() => {
    memoryGameContext.goBackToHome ? setRenderedComponent('home') : null;
  }, [memoryGameContext.goBackToHome]);
  useEffect(() => {
    memoryGameContext.isYouWinScreenShown ? setRenderedComponent('win') : null;
  }, [memoryGameContext.isYouWinScreenShown]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-wrap gap-3 justify-center items-center rounded-lg flex-col"
    >
      {renderedComponent === 'home' && (
        <>
          <h3 className="text-effect sm:text-2xl text-xl pb-1 ">Bored?</h3>
          <p className="pb-3">Play some Minigames:</p>
          <div className="sm:h-64 sm:w-96 p-10 shadow-whiteBox rounded-lg flex flex-col items-center justify-center gap-6">
            <Button
              type="primary"
              onClick={() => {
                memoryGameContext.setGoBackToHome(false);
                memoryGameContext.setIsYouWinScreenShown(false);
                setRenderedComponent('memory');
              }}
            >
              Memory
            </Button>
            <button>More coming soon...</button>
          </div>
        </>
      )}
      {renderedComponent === 'memory' && <MemoryCardContainer />}
      {renderedComponent === 'win' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex flex-col justify-center items-center gap-6 p-10 shadow-whiteBox rounded-lg"
        >
          <p className="font-bold text-2xl">You Won!</p>
          <Button
            type="primary"
            onClick={() => {
              setRenderedComponent('home');
            }}
          >
            Back to Minigame selection
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
}

function shuffle(array: any[]) {
  return array.sort(() => Math.random() - 0.5);
}
