import { motion, useAnimate, useAnimation, useScroll } from 'framer-motion';
import Image from 'next/image';
import NextLink from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useClickAway } from 'react-use';

import ChangeColorThemeDropdown from './ChangeColorThemeDropdown';

const navs = [
  { text: 'About', href: '#about' },
  { text: 'Techstack', href: '#stack' },
  { text: 'Projects', href: '#portfolio' },
];

export default function Navbar() {
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    console.log(scrollYProgress);
  }, [scrollYProgress]);
  return (
    <>
      <nav className="md:block fixed hidden w-full z-[9999] px-20 py-4">
        {' '}
        {/* z-[9999] is used to make sure that the navbar is always on top of everything else and the links can be clicked */}
        <WebNavbar />
      </nav>
      <nav className="md:hidden fixed w-full z-[9999] px-20 py-4">
        <MobileNav />
      </nav>
    </>
  );
}

function WebNavbar() {
  return (
    <div className="flex gap-10 justify-between items-center px-3">
      <div className="rounded-full overflow-hidden">
        <NextLink href="#hero" passHref>
          <Image width={50} height={50} src="/Logo.png" alt={'logo'} />
        </NextLink>
      </div>
      <div className="flex gap-10 items-center justify-center">
        {navs.map((nav) => (
          <button className="text-effect text-lg pb-1" key={nav.href}>
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

export function MobileNav() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const dropDownRef = useRef<HTMLDivElement>(null);

  const handleNavClick = () => {
    setIsNavOpen(false);
  };

  return (
    <div className="pt-3">
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
          className="fixed top-24 shadow-whiteBox bg-gray-800 rounded-lg right-10 flex flex-col"
        >
          {navs.map((nav) => (
            <button
              onClick={handleNavClick}
              className="text-lg px-8 py-5 hover:bg-white/30 transition-all duration-300 rounded-lg"
              key={nav.href}
            >
              <NextLink href={nav.href} passHref>
                {nav.text}
              </NextLink>
            </button>
          ))}
          <ChangeColorThemeDropdown
            setIsNavOpen={setIsNavOpen}
            isInWebNav={false}
          />
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
  }, [isNavOpen]);

  function handleHamburgerClick() {
    setIsNavOpen(!isNavOpen);
    setIsHamburgerOpen(!isHamburgerOpen);
  }

  const springTransition = {
    type: 'spring',
    stiffness: 300,
    damping: 20,
  };

  return (
    <button
      onClick={handleHamburgerClick}
      className="flex flex-col justify-center gap-2 items-center ml-auto"
    >
      <motion.div
        className="w-16 h-2 bg-white/50 rounded-full"
        initial="closed"
        animate={controlsOpen}
        transition={springTransition}
        variants={variants}
      />
      <motion.div
        className="w-16 h-2 bg-white/50 rounded-full"
        initial="closed"
        animate={controlsHalfOpen}
        transition={springTransition}
        variants={variants}
      />
      <motion.div
        className="w-16 h-2 bg-white/50 rounded-full"
        initial="closed"
        animate={controlsHalfOpenReverse}
        transition={springTransition}
        variants={variants}
      />
    </button>
  );
}
