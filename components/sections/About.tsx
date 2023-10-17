import { ColorThemeContext } from '@/context/ColorThemeContextProvider';
import { useTranslation } from 'next-i18next';
import { useContext } from 'react';

export default function About() {
  const colorContext = useContext(ColorThemeContext);
  const { t } = useTranslation();
  return (
    <>
      <div className="block -mt-10 sm:mt-0 relative">
        <h1 className="pb-8 sm:text-3xl text-2xl font-semibold text-center">
          {t('common:about-me')}
        </h1>
        <div className="absolute -top-10 -right-4 w-28 h-28 z-[-1]">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path
              fill={colorContext.colorThemeColor}
              d="M44.3,-52.2C58.2,-41.2,70.7,-27.9,74.4,-12.3C78.2,3.4,73.2,21.4,63.3,34.6C53.3,47.8,38.4,56.2,22.6,61.7C6.8,67.3,-9.8,70.1,-26.3,66.5C-42.7,63,-58.9,53.2,-66.2,39C-73.4,24.8,-71.8,6.2,-65.5,-8.5C-59.2,-23.1,-48.4,-33.9,-36.7,-45.4C-25,-56.8,-12.5,-69,1.4,-70.6C15.2,-72.2,30.4,-63.3,44.3,-52.2Z"
              transform="translate(100 100)"
            />
          </svg>
        </div>
      </div>
      <p className="block sm:text-xl leading-8 text-center max-w-lg">
        {t('common:about-me-description')}
      </p>
    </>
  );
}
