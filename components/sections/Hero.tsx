import { ColorThemeContext } from '@/context/ColorThemeContextProvider';
import Image from 'next/image';
import NextImage from 'next/image';
import Link from 'next/link';
import { useContext } from 'react';

const Hero = () => {
  const colorContext = useContext(ColorThemeContext);
  return (
    <div className="flex relative -mt-20 sm:mt-0">
      <div>
        <h1
          data-cy="homePageTitle"
          className="pl-10 sm:pl-0 mb-6 text-3xl font-semi sm:px-0 title"
        >
          <span className="inline-block py-2 text-effect font-bold">Hi,</span>{' '}
          I&rsquo;m Michael!
        </h1>
        <p className="text-center sm:text-start text-md sm:text-lg description pr-2 sm:pr-0">
          I&rsquo;m a software developer from Vienna, nice to meet you!
        </p>
      </div>
      <div className="relative h-full w-full">
        <svg
          className="scale-150 pb-20"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill={colorContext.colorThemeColor}
            d="M41.5,-49.7C53.8,-39.2,63.6,-26.1,66.5,-11.5C69.4,3.1,65.2,19.2,56.8,31.9C48.4,44.6,35.7,53.9,20.5,62C5.2,70,-12.6,76.8,-25,71.2C-37.3,65.5,-44.2,47.5,-49.9,31.7C-55.6,15.9,-60,2.3,-60,-12.8C-60,-27.9,-55.5,-44.4,-44.8,-55.1C-34.1,-65.8,-17,-70.7,-1.2,-69.3C14.7,-67.9,29.3,-60.1,41.5,-49.7Z"
            transform="translate(100 100)"
          />
        </svg>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          width={250}
          height={250}
          alt="profile"
          src="/profilepic.png"
          className="absolute -top-10 left-0"
        />
      </div>
    </div>
  );
};

export default Hero;
