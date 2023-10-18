import { ColorThemeContext } from '@/context/ColorThemeContextProvider';
import { useContext } from 'react';

export default function PencilSvg() {
  const colorContext = useContext(ColorThemeContext);
  return (
    <>
      <svg
        className="sm:h-20 sm:w-20 h-14 w-14 memory-svg"
        viewBox="0 0 541 821"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          id="Rectangle 41"
          x="277"
          y="235"
          fill="black"
          fillOpacity="0.08"
        />
        <rect
          id="Rectangle 43"
          x="240"
          y="235"
          fill="black"
          fillOpacity="0.03"
        />
        <rect
          id="Rectangle 44"
          x="240"
          y="98"
          fill="black"
          fillOpacity="0.03"
        />
        <rect
          id="Rectangle 42"
          x="277"
          y="98"
          fill="black"
          fillOpacity="0.08"
        />
        <path
          id="Vector 3"
          d="M258 706.5L276.5 663H257.75H239L258 706.5Z"
          stroke="black"
          strokeOpacity="0.15"
          strokeWidth="20"
        />
        <path
          id="Outline 4"
          d="M195 180C212.641 180 283.017 180 316 180"
          stroke={colorContext.colorThemeColor}
          strokeWidth="20"
        />
        <path
          id="Outline 3"
          d="M201 225.5H313.5"
          stroke={colorContext.colorThemeColor}
          strokeWidth="20"
        />
        <path
          id="Outline 2"
          d="M202 594L229.12 574L253.632 594L279.708 574L311 594"
          stroke={colorContext.colorThemeColor}
          strokeWidth="20"
        />
        <path
          id="Outline 1"
          d="M193 137.5V589.5L258.5 725L321.5 589.5V137.5C317.984 115.919 312.059 106.364 288 98H222.5C202.553 108.498 196.033 117.114 193 137.5Z"
          stroke={colorContext.colorThemeColor}
          strokeWidth="20"
        />
      </svg>
    </>
  );
}
