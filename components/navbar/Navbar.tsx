import { ColorThemeContext } from '@/context/ColorThemeContextProvider';
import { motion, useAnimate, useAnimation, useScroll } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import NextLink from 'next/link';
import { useContext, useEffect, useRef, useState } from 'react';

import ChangeColorThemeDropdown from './ChangeColorThemeDropdown';

export const springTransition = {
  type: 'spring',
  stiffness: 300,
  damping: 20,
};

export default function Navbar({
  setHideScrollDiv,
  hideNav,
  progressBarPercentage,
}: {
  setHideScrollDiv: React.Dispatch<React.SetStateAction<boolean>>;
  hideNav: boolean;
  progressBarPercentage: number;
}) {
  const { t } = useTranslation();
  const navs = [
    { text: t('common:about-me'), href: '#about' },
    { text: t('contact'), href: '#contact' },
    { text: t('common:projects'), href: '#portfolio' },
    { text: 'Github', href: 'https://github.com/mischulz14' },
    { text: t('common:bored'), href: '#games' },
  ];

  if (hideNav) {
    return null;
  }

  return (
    <>
      <nav
        onClick={() => setHideScrollDiv(true)}
        className="xl:block fixed hidden w-full z-20 px-20 py-4 transition-all duration-300"
        style={{
          backgroundColor: `rgba(255, 255, 255, ${
            progressBarPercentage > 30 ? 0.08 : 0
          })`,
        }}
      >
        {' '}
        {/* z-[9999] is used to make sure that the navbar is always on top of everything else and the links can be clicked */}
        <WebNavbar navs={navs} />
      </nav>
      <nav
        onClick={() => setHideScrollDiv(true)}
        className="xl:hidden fixed w-full z-20 px-8 py-4"
      >
        <MobileNav navs={navs} />
      </nav>
    </>
  );
}

function WebNavbar({ navs }: { navs: { text: string; href: string }[] }) {
  return (
    <div className="flex gap-10 justify-between items-center px-3">
      <div className="flex gap-10 items-center justify-center w-full py-1">
        {navs.map((nav) => (
          <button className="text-base pb-1 text-effect" key={nav.href}>
            <NextLink href={nav.href} passHref>
              {nav.text}
            </NextLink>
          </button>
        ))}
        <ChangeColorThemeDropdown isInWebNav />
      </div>
    </div>
  );
}

export function MobileNav({
  navs,
}: {
  navs: { text: string; href: string }[];
}) {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const dropDownRef = useRef<HTMLDivElement>(null);
  const colorContext = useContext(ColorThemeContext);

  const handleNavClick = () => {
    setIsNavOpen(false);
  };

  return (
    <div className="pt-3 flex w-full relative z-20 justify-end">
      <Hamburger
        isHamburgerOpen={isHamburgerOpen}
        setIsHamburgerOpen={setIsHamburgerOpen}
        isNavOpen={isNavOpen}
        setIsNavOpen={setIsNavOpen}
      />
      {isNavOpen && (
        <motion.div
          ref={dropDownRef}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="fixed top-24 shadow-whiteBox bg-gray-800 rounded-lg right-0 w-full h-full"
        >
          <div className=" bg-gray-800 rounded-lg right-0 flex flex-col gap-1 w-full justify-center items-center">
            {navs.map((nav) => (
              <button
                onClick={handleNavClick}
                className="text-base px-8 py-5 hover:bg-white/30 transition-all duration-300 rounded-lg"
                key={nav.href}
              >
                <NextLink href={nav.href} passHref>
                  {nav.text}
                </NextLink>
              </button>
            ))}
            <ChangeColorThemeDropdown isInWebNav={false} />
          </div>
        </motion.div>
      )}
    </div>
  );
}

export function Hamburger({
  isNavOpen,
  setIsNavOpen,
  isHamburgerOpen,
  setIsHamburgerOpen,
}: {
  isNavOpen: boolean;
  setIsNavOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isHamburgerOpen: boolean;
  setIsHamburgerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const controlsOpen = useAnimation();
  const controlsHalfOpen = useAnimation();
  const controlsHalfOpenReverse = useAnimation();

  const variants = {
    open: {
      rotate: 90,
      translateY: 4,
      opacity: 0,
    },
    closed: {
      rotate: 0,
      translateY: 0,
      opacity: 1,
    },
    halfOpen: {
      rotate: 45,
    },
    halfOpenReverse: {
      rotate: -45,
      translateY: -16,
    },
  };

  useEffect(() => {
    if (isNavOpen) {
      controlsOpen.start(variants.open);
      controlsHalfOpen.start(variants.halfOpen);
      controlsHalfOpenReverse.start(variants.halfOpenReverse);
    } else {
      controlsOpen.start(variants.closed);
      controlsHalfOpen.start(variants.closed);
      controlsHalfOpenReverse.start(variants.closed);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isNavOpen]);

  function handleHamburgerClick() {
    setIsNavOpen(!isNavOpen);
    setIsHamburgerOpen(!isHamburgerOpen);
  }

  return (
    <button
      onClick={handleHamburgerClick}
      className="flex flex-col justify-center gap-2 items-center pb-3"
    >
      <motion.div
        className="w-16 h-2 bg-gray-400 rounded-full"
        initial="closed"
        animate={controlsOpen}
        transition={springTransition}
        variants={variants}
      />
      <motion.div
        className="w-16 h-2 bg-gray-400 rounded-full"
        initial="closed"
        animate={controlsHalfOpen}
        transition={springTransition}
        variants={variants}
      />
      <motion.div
        className="w-16 h-2 bg-gray-400 rounded-full"
        initial="closed"
        animate={controlsHalfOpenReverse}
        transition={springTransition}
        variants={variants}
      />
    </button>
  );
}
