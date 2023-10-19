import { motion } from 'framer-motion';
import { useTranslation } from 'next-i18next';

import Button from '../ui/Button';

export default function GameOverScreen({
  setRenderedComponent,
}: {
  setRenderedComponent: React.Dispatch<
    React.SetStateAction<'memory' | 'gameover' | 'home' | 'patterns' | 'win'>
  >;
}) {
  const { t } = useTranslation('common');
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col justify-center items-center gap-6 p-10 shadow-whiteBox rounded-lg"
    >
      <p className="font-bold text-xl">Game Over.</p>
      <p className="font-bold text-center">{t('didnt-win')}</p>
      <p className="font-bold text-center">{t('not-bored-lost')}</p>
      <Button
        kind="primary"
        onClick={() => {
          setRenderedComponent('home');
        }}
      >
        {t('back-to-minigames')}
      </Button>
    </motion.div>
  );
}
