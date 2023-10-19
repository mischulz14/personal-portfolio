import {
  MemoryCard as MemoryCardType,
  MemoryCardContext,
} from '@/context/MemoryGameContextProvider';
import { motion } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import { useContext, useEffect, useState } from 'react';
import { useLocalStorage } from 'react-use';

import Button from '../ui/Button';
import MemoryCard from './MemoryCard';

export default function MemoryCardContainer() {
  const { t } = useTranslation('common');
  const memoryGameContext = useContext(MemoryCardContext);
  const [memoryCards, setMemoryCards] = useState<MemoryCardType[]>([]);
  const [triesInLocalStorage] = useLocalStorage('tries');

  useEffect(() => {
    setMemoryCards(shuffle([...memoryGameContext.cards]));
  }, [memoryGameContext.cards]);

  return (
    <>
      <div className="flex sm:flex-row flex-col justify-between w-full px-6">
        <p>
          {t('tries')}: {memoryGameContext.tries}
        </p>
        <p>
          {t('least-tries')}:{' '}
          {triesInLocalStorage ? Number(triesInLocalStorage) : 0}
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
        kind="tertiary"
      >
        {t('back')}
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
