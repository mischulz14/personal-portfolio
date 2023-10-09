import { ColorThemeContext } from '@/context/ColorThemeContextProvider';
import { AtSymbol, GlobeOutline, Heart, Home, Phone } from 'heroicons-react';
import Image from 'next/image';
import { useContext } from 'react';

export default function Footer() {
  const year = new Date().getFullYear();

  const colorContext = useContext(ColorThemeContext);

  const basicInfo = [
    {
      name: 'Phone',
      value: '+4369911388765',
      icon: <Phone color={colorContext.colorThemeColor} />,
    },
    {
      name: 'Email',
      value: 'mi.schulz@hotmail.com',
      icon: <AtSymbol color={colorContext.colorThemeColor} />,
    },
    {
      name: 'Location',
      value: 'Vienna, Austria',
      icon: <Home color={colorContext.colorThemeColor} />,
    },
    {
      name: 'Languages',
      value:
        'English (C1), German (Native), Spanish (C1), Catalan (A2), French (A2)',
      icon: <GlobeOutline color={colorContext.colorThemeColor} />,
    },
  ];

  return (
    <div className="flex items-center flex-col max-w-xs relative">
      <h2 className="max-w-fit-content self-center mb-6 text-center text-xl font-semibold">
        <span className="text-effect py-2">Contact </span>Information
      </h2>
      {basicInfo.map((info) => (
        <div
          className="flex flex-col justify-center items-center gap-2 my-2"
          key={info.name}
        >
          <div className="flex gap-1 items-center justify-center">
            {info.icon}
            <h3>{info.name}</h3>
          </div>
          {info.name === 'Languages' ? (
            <p className=" max-w-xs text-gray-400 ml-auto text-center">
              {info.value}
            </p>
          ) : (
            <p className=" text-gray-400 ml-auto">{info.value}</p>
          )}
        </div>
      ))}
      <div className="mt-16 text-gray-500 flex gap-2 items-center justify-center">
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
