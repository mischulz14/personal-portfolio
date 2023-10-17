import {
  MemoryCard as MemoryCardType,
  MemoryCardContext,
} from '@/context/MemoryGameContextProvider';
import { motion } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import { useContext, useEffect, useState } from 'react';

import GameOverScreen from '../games/GameOverScreen';
import MemoryCard from '../games/MemoryCard';
import MemoryCardContainer from '../games/MemoryCardContainer';
import MiniGamesHomescreen from '../games/MiniGamesHomescreen';
import PatternMatch from '../games/PatternMatch';
import PatternMatchExplication from '../games/PatternMatchExplication';
import YouWonScreen from '../games/YouWonScreen';
import Button from '../ui/Button';

export default function MiniGames() {
  const memoryGameContext = useContext(MemoryCardContext);

  const { t } = useTranslation('common');
  const [renderedComponent, setRenderedComponent] = useState<
    'memory' | 'gameover' | 'home' | 'patterns' | 'win'
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
        <MiniGamesHomescreen setRenderedComponent={setRenderedComponent} />
      )}
      {renderedComponent === 'memory' && <MemoryCardContainer />}
      {renderedComponent === 'patterns' && (
        <PatternMatchExplication setRenderedComponent={setRenderedComponent} />
      )}
      {renderedComponent === 'gameover' && (
        <GameOverScreen setRenderedComponent={setRenderedComponent} />
      )}
      {renderedComponent === 'win' && (
        <YouWonScreen setRenderedComponent={setRenderedComponent} />
      )}
    </motion.div>
  );
}
