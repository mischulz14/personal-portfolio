import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import Button from '../ui/Button';
import PatternMatch from './PatternMatch';

export interface PatternMatchProps {
  setRenderedComponent: React.Dispatch<
    React.SetStateAction<'memory' | 'gameover' | 'home' | 'patterns'>
  >;
}

export default function PatternMatchExplication({
  setRenderedComponent,
}: PatternMatchProps) {
  const [showPatternMatch, setShowPatternMatch] = useState(false);
  const { t } = useTranslation('common');
  return (
    <>
      {!showPatternMatch && (
        <div className="flex flex-col justify-center items-center gap-4 max-w-sm text-center shadow-whiteBox p-8 rounded-lg">
          <div>{t('pattern-match-description')}</div>
          <Button onClick={() => setShowPatternMatch(true)} type="secondary">
            Start
          </Button>
        </div>
      )}
      {showPatternMatch && (
        <PatternMatch
          setShowPatternMatch={setShowPatternMatch}
          setRenderedComponent={setRenderedComponent}
        />
      )}
    </>
  );
}
