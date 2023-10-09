import { motion, useScroll } from 'framer-motion';
import Image from 'next/image';
import NextLink from 'next/link';
import { useEffect } from 'react';

import ChangeColorThemeDropdown from './ChangeColorThemeDropdown';

const navs = [
  { text: 'About', href: '#about' },
  { text: 'Techstack', href: '#stack' },
  { text: 'Projects', href: '#portfolio' },
];

export function Navbar({ percentage }: { percentage: number }) {
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    console.log(scrollYProgress);
  }, [scrollYProgress]);
  return (
    <div className="md:block fixed hidden w-full z-[9999] px-20 py-4">
      {' '}
      {/* z-[9999] is used to make sure that the navbar is always on top of everything else and the links can be clicked */}
      <WebNavbar />
    </div>
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
        <ChangeColorThemeDropdown />
      </div>
    </div>
  );
}

export default Navbar;
