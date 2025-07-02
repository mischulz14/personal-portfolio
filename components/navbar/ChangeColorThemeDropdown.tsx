import {
  colorCodes,
  ColorOptions,
  ColorThemeContext,
} from '@/context/ColorThemeContextProvider';
import { motion } from 'framer-motion';
import { XOutline } from 'heroicons-react';
import { useTranslation } from 'next-i18next';
import { useContext, useRef, useState } from 'react';
import { useClickAway } from 'react-use';

export default function ChangeColorThemeDropdown({
  isInWebNav = true,
}: {
  isInWebNav: boolean;
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropDownRef = useRef<HTMLDivElement>(null);
  const colorContext = useContext(ColorThemeContext);
  const colors = Object.keys(colorCodes) as ColorOptions[];
  const { t } = useTranslation();

  useClickAway(dropDownRef, () => {
    setIsDropdownOpen(false);
  });

  return (
    <div className="relative" ref={dropDownRef}>
      <button
        className={
          isInWebNav
            ? 'text-effect text-base pb-1'
            : 'text-base px-6 py-5 hover:bg-white/30 transition-all duration-300 rounded-lg'
        }
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        {t('common:change-theme')}
      </button>
      {isDropdownOpen && (
        <>
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1, ease: 'linear' }}
            className={
              isInWebNav
                ? 'fixed top-3 shadow-whiteBox bg-white/20 rounded-lg right-3 flex flex-col z-[99999]'
                : 'hidden'
            }
            onClick={() => setIsDropdownOpen(false)}
          >
            <XOutline width={25} height={25} />
          </motion.button>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className={
              isInWebNav
                ? 'fixed top-3 shadow-whiteBox bg-white/20 rounded-lg right-3 grid grid-cols-2 gap-3 p-2'
                : 'absolute top-18 bg-gray-700 rounded-lg right-0 w-full grid grid-cols-3 gap-3 p-2'
            }
          >
            {colors.map((color) => (
              <ColorThemeItem
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
}: {
  color: ColorOptions;
  isInWebNav: boolean;
}) {
  const { t } = useTranslation('common');
  const colorContext = useContext(ColorThemeContext);
  const colorCode = colorCodes[color];
  return (
    <button
      className="lg:px-10 py-2 flex justify-center sm:justify-start items-center rounded-lg gap-2 hover:bg-white/30 transition-all duration-300"
      onClick={() => {
        colorContext.changeColorTheme(color);
      }}
      style={{
        backgroundColor: isInWebNav ? '' : colorCode.primary,
        height: isInWebNav ? 'auto' : '30px',
      }}
    >
      <div
        className="w-3 h-3 rounded-full"
        style={{ backgroundColor: colorCode.primary }}
      />
      {isInWebNav && <span>{t(color).toLocaleUpperCase()}</span>}
    </button>
  );
}
