import {
  MemoryCard as MemoryCardType,
  MemoryCardContext,
} from '@/context/MemoryGameContextProvider';
import { motion } from 'framer-motion';
import { useContext, useEffect, useState } from 'react';
import { useLocalStorage } from 'react-use';

import Button from '../ui/Button';
import MemoryCard from './MemoryCard';

export default function MemoryCardContainer() {
  const memoryGameContext = useContext(MemoryCardContext);
  const [memoryCards, setMemoryCards] = useState<MemoryCardType[]>([]);
  const [triesInLocalStorage] = useLocalStorage('tries');

  useEffect(() => {
    setMemoryCards(shuffle([...memoryGameContext.cards]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="flex justify-between w-full px-6">
        <p>Tries: {memoryGameContext.tries}</p>
        <p>
          HighScore: {triesInLocalStorage ? Number(triesInLocalStorage) : 0}
        </p>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="grid sm:grid-cols-4 grid-cols-3 gap-3 justify-center shadow-whiteBox rounded-lg p-5 max-w-md"
      >
        {memoryCards.map((card) => {
          return <MemoryCard key={card.id} card={card} />;
        })}
      </motion.div>
      <Button
        onClick={() => {
          memoryGameContext.setGoBackToHome(true);
          memoryGameContext.resetGame();
          memoryGameContext.setIsYouWinScreenShown(false);
        }}
        type="tertiary"
      >
        Back
      </Button>
    </>
  );
}

export function shuffle(array: any) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    // @ts-ignore
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // @ts-ignore
    temporaryValue = array[currentIndex];
    // @ts-ignore
    array[currentIndex] = array[randomIndex];
    // @ts-ignore
    array[randomIndex] = temporaryValue;
  }

  return array;
}
