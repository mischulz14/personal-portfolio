import {
  colorCodes,
  ColorOptions,
  ColorThemeContext,
} from '@/context/ColorThemeContextProvider';
import { motion } from 'framer-motion';
import { XOutline } from 'heroicons-react';
import { useContext, useRef, useState } from 'react';
import { useClickAway } from 'react-use';

export default function ChangeColorThemeDropdown({
  isInWebNav = true,
  setIsNavOpen,
}: {
  isInWebNav: boolean;
  setIsNavOpen?: (value: boolean) => void;
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropDownRef = useRef<HTMLDivElement>(null);
  const colorContext = useContext(ColorThemeContext);
  const colors = Object.keys(colorCodes) as ColorOptions[];

  useClickAway(dropDownRef, () => {
    setIsDropdownOpen(false);
  });

  function handleColorClick() {
    setIsDropdownOpen(false);
    setIsNavOpen && setIsNavOpen(false);
  }

  return (
    <div className="relative" ref={dropDownRef}>
      <button
        className={
          isInWebNav
            ? 'text-effect text-lg pb-1'
            : 'text-lg px-6 py-5 hover:bg-white/30 transition-all duration-300 rounded-lg'
        }
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        {' '}
        Change Theme
      </button>
      {isDropdownOpen && (
        <>
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.1, ease: 'linear' }}
            className={
              isInWebNav
                ? 'fixed top-20 shadow-whiteBox bg-white/20 rounded-lg right-20 flex flex-col z-[99999]'
                : 'hidden'
            }
            onClick={() => setIsDropdownOpen(false)}
          >
            <XOutline width={25} height={25} />
          </motion.button>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className={
              isInWebNav
                ? 'fixed top-20 shadow-whiteBox bg-white/20 rounded-lg right-20 flex flex-col'
                : 'absolute top-18 bg-gray-700 rounded-lg right-0 w-[200px] grid grid-cols-2 gap-3 p-2'
            }
          >
            {colors.map((color) => (
              <ColorThemeItem
                onClick={handleColorClick}
                isInWebNav={isInWebNav}
                key={color}
                color={color}
              />
            ))}
          </motion.div>
        </>
      )}
    </div>
  );
}

export function ColorThemeItem({
  color,
  isInWebNav,
  onClick,
}: {
  color: ColorOptions;
  isInWebNav: boolean;
  onClick: () => void;
}) {
  const colorContext = useContext(ColorThemeContext);
  const colorCode = colorCodes[color];
  return (
    <button
      className="px-10 py-2 flex justify-center sm:justify-start items-center rounded-lg gap-2 hover:bg-white/30 hover:scale-110 transition-all duration-300"
      onClick={() => {
        colorContext.changeColorTheme(color);
        onClick();
      }}
      style={{
        backgroundColor: isInWebNav ? '' : colorCode.primary,
        height: isInWebNav ? 'auto' : '50px',
      }}
    >
      <div
        className="w-3 h-3 rounded-full"
        style={{ backgroundColor: colorCode.primary }}
      />
      {isInWebNav && <span>{color.toLocaleUpperCase()}</span>}
    </button>
  );
}
