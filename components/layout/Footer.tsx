import { ColorThemeContext } from '@/context/ColorThemeContextProvider';
import { AtSymbol, GlobeOutline, Heart, Home, Phone } from 'heroicons-react';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { useContext } from 'react';

import Accordion from '../ui/Accordion';

export default function Footer() {
  const year = new Date().getFullYear();
  const { t } = useTranslation('common');

  const colorContext = useContext(ColorThemeContext);

  const basicInfo = [
    {
      name: t('phone'),
      value: '+4369911388765',
      icon: <Phone color={colorContext.colorThemeColor} />,
    },
    {
      name: t('email'),
      value: 'mi.schulz@hotmail.com',
      icon: <AtSymbol color={colorContext.colorThemeColor} />,
    },
    {
      name: t('location'),
      value: t('location-value'),
      icon: <Home color={colorContext.colorThemeColor} />,
    },
    {
      name: t('languages'),
      value: `${t('english')}, ${t('german')}, ${t('spanish')}, ${t(
        'catalan',
      )}, ${t('french')}`,
      icon: <GlobeOutline color={colorContext.colorThemeColor} />,
    },
  ];

  return (
    <div className="flex items-center flex-col max-w-xs relative">
      <h2 className="max-w-fit-content self-center mb-3 text-center text-xl font-semibold">
        {t('contact-info')}
      </h2>
      <div className="flex flex-col gap-1 ">
        {basicInfo.map((info) => (
          <Accordion
            className="!p-2"
            key={info.name}
            title={
              <div className="flex gap-6 items-center">
                <div className="bg-gray-300 p-1 rounded-lg">{info.icon}</div>
                <div>{info.name}</div>
              </div>
            }
          >
            {info.value}
          </Accordion>
        ))}
      </div>

      <div className="mt-6 text-gray-500 flex gap-2 items-center justify-center">
        <span> Made with </span>
        <Heart color={colorContext.colorThemeColor} />
        <span>by Michael Schulz</span>
      </div>
      <div className="mt-4 flex text-gray-500 gap-2 items-center justify-center">
        <span>
          {/* copyright sign*/}
          &#169;
        </span>
        <span>Copyright Michael Schulz {year}</span>
      </div>
    </div>
  );
}
