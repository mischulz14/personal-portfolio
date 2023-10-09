import {
  colorCodes,
  ColorOptions,
  ColorThemeContext,
} from '@/context/ColorThemeContextProvider';
import { motion } from 'framer-motion';
import { XOutline } from 'heroicons-react';
import { useContext, useRef, useState } from 'react';
import { useClickAway } from 'react-use';

export default function ChangeColorThemeDropdown() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropDownRef = useRef<HTMLDivElement>(null);
  const colorContext = useContext(ColorThemeContext);
  const colors = Object.keys(colorCodes) as ColorOptions[];

  useClickAway(dropDownRef, () => {
    setIsDropdownOpen(false);
  });

  return (
    <div className="relative" ref={dropDownRef}>
      <button
        className="text-effect text-lg pb-1"
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
            className=" hover:bg-white/30 hover:scale-105 transition-all duration-200 fixed top-20 z-[999999] right-20 border-[0.5px] rounded-lg"
            onClick={() => setIsDropdownOpen(false)}
          >
            <XOutline width={25} height={25} />
          </motion.button>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="fixed top-20 shadow-whiteBox bg-white/20 rounded-lg right-20 flex flex-col"
          >
            {colors.map((color) => (
              <ColorThemeItem key={color} color={color} />
            ))}
          </motion.div>
        </>
      )}
    </div>
  );
}

export function ColorThemeItem({ color }: { color: ColorOptions }) {
  const colorContext = useContext(ColorThemeContext);
  const colorCode = colorCodes[color];
  return (
    <button
      className="px-10 rounded-lg py-2 flex justify-start items-center gap-2 hover:bg-white/30"
      onClick={() => {
        colorContext.changeColorTheme(color);
      }}
    >
      <div
        className="w-3 h-3 rounded-full"
        style={{ backgroundColor: colorCode.primary }}
      />
      <span>{color.toLocaleUpperCase()}</span>
    </button>
  );
}
