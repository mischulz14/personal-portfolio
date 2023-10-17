import { MemoryCardContext } from '@/context/MemoryGameContextProvider';
import { useTranslation } from 'next-i18next';
import { useContext } from 'react';

import Button from '../ui/Button';

export default function MiniGamesHomescreen({
  setRenderedComponent,
}: {
  setRenderedComponent: React.Dispatch<
    React.SetStateAction<'memory' | 'gameover' | 'home' | 'patterns' | 'win'>
  >;
}) {
  const { t } = useTranslation('common');
  const memoryGameContext = useContext(MemoryCardContext);
  return (
    <>
      <h3 className="text-effect sm:text-2xl text-xl pb-1 ">{t('bored?')}</h3>
      <p className="pb-3">{t('play-minigames')}</p>
      <div className="sm:h-64 sm:w-96 p-10 shadow-whiteBox rounded-lg flex flex-col items-stretch justify-center gap-6">
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
        <Button
          type="primary"
          onClick={() => {
            memoryGameContext.setGoBackToHome(false);
            memoryGameContext.setIsYouWinScreenShown(false);
            setRenderedComponent('patterns');
          }}
        >
          Pattern Match
        </Button>
        <div className="text-center">{t('soon')}</div>
      </div>
    </>
  );
}
