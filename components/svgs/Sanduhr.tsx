import { ColorThemeContext } from '@/context/ColorThemeContextProvider';
import { useContext } from 'react';

export default function SanduhrSvg() {
  const colorContext = useContext(ColorThemeContext);
  return (
    <svg
      className="sm:h-20 sm:w-20 h-14 w-14 memory-svg"
      viewBox="0 0 500 800"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        id="Rectangle 49"
        x="126"
        y="128"
        rx="28"
        fill={colorContext.colorThemeColor}
      />
      <rect
        id="Rectangle 50"
        x="126"
        y="610"
        rx="28"
        fill={colorContext.colorThemeColor}
      />
      <path
        id="Vector 5"
        d="M183.216 617C117.145 557.583 115.384 480.957 183.216 442.76C251.048 404.564 248.125 400.378 183.216 359.042C118.308 317.706 120.881 263.906 183.216 178"
        stroke={colorContext.colorThemeColor}
        strokeWidth="20"
      />
      <path
        id="Vector 6"
        d="M331.286 617C396.697 557.583 398.44 480.957 331.286 442.76C264.132 404.564 267.027 400.378 331.286 359.042C395.545 317.706 392.998 263.906 331.286 178"
        stroke={colorContext.colorThemeColor}
        strokeWidth="20"
      />
      <path
        id="Vector 7"
        d="M176.5 298.169C222.892 297.882 260.472 313.902 331.986 295.201C403.5 276.5 291.031 370.062 262.266 371.531C233.5 373 130.109 298.455 176.5 298.169Z"
        fill={colorContext.colorThemeColor}
        stroke={colorContext.colorThemeColor}
        strokeWidth="20"
      />
      <path
        id="Vector 8"
        d="M198.328 605.778C206.265 616.005 279.489 604.238 309.086 605.778C338.682 607.318 277.322 534.181 255.394 541.517C219.115 549.12 190.391 595.551 198.328 605.778Z"
        fill={colorContext.colorThemeColor}
        stroke={colorContext.colorThemeColor}
        strokeWidth="20"
      />
      <rect
        id="Rectangle 51"
        x="251"
        y="367"
        rx="6.5"
        fill={colorContext.colorThemeColor}
      />
    </svg>
  );
}
