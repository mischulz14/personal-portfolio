import { ColorThemeContext } from '@/context/ColorThemeContextProvider';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'heroicons-react';
import { useContext, useState } from 'react';

interface AccordionProps {
  additionalButton?: React.ReactNode;
  badge?: React.ReactNode;
  boldTitle?: boolean;
  children: React.ReactNode;
  customButton?: React.ReactNode | undefined;
  title: string;
}

/* Accordion component
 * @param {React.ReactNode} badge - Badge to display on the right side of the accordion title (optional)
 * @param {React.ReactNode} children - Content to display when the accordion is open
 * @param {string} title - Title of the accordion
 * @param {React.ReactNode} customButton - Custom button to display on the right side of the accordion title (optional)
 * @param {React.ReactNode} additionalButton - Additional button to display on the right side of the accordion title (optional)
 * @param {boolean} boldTitle - Bold text of the accordion title (optional)
 * Accordion Card with title/badge and button sticks to the top of the page when the accordion is open
 */

export default function Accordion({
  title,
  boldTitle,
  children,
  badge,
  customButton,
  additionalButton,
}: AccordionProps) {
  const [open, setOpen] = useState(false);
  const colorContext = useContext(ColorThemeContext);

  return (
    <>
      <div
        className="flex justify-between rounded-md px-6 py-4 items-center border-2 border-transparent text-gray-200 bg-opacity-60"
        onClick={() => {
          setOpen((prev) => !prev);
        }}
        style={{
          backgroundColor: colorContext.colorThemeColor,
        }}
      >
        <div className="flex gap-4">
          <span className={boldTitle ? 'font-bold' : ''}>{title}</span>
          <span>{badge ? badge : null}</span>
        </div>
        {customButton ? (
          customButton
        ) : (
          <>
            {additionalButton ? additionalButton : null}
            <button className="rounded-full">
              <span>{open ? <ChevronUp /> : <ChevronDown />}</span>
            </button>
          </>
        )}
      </div>
      <motion.div
        animate={{ height: open ? 'auto' : 0 }}
        className="overflow-hidden"
        initial={false}
        transition={{ duration: 0.3 }}
      >
        <div className="px-6 py-4 !border-0 mb-4 bg-gray-800 rounded-lg">
          {children}
        </div>
      </motion.div>
    </>
  );
}
