import { ColorThemeContext } from '@/context/ColorThemeContextProvider';
import { useContext } from 'react';

export default function CandleSvg() {
  const colorContext = useContext(ColorThemeContext);

  return (
    <svg
      className="sm:h-20 sm:w-20 h-14 w-14 memory-svg"
      viewBox="0 0 500 800"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        id="Outline5"
        d="M355 291.5C355 302.622 346.205 315.116 326.531 325.422C307.33 335.479 280.112 342 249.5 342C218.888 342 191.67 335.479 172.469 325.422C152.795 315.116 144 302.622 144 291.5C144 280.378 152.795 267.884 172.469 257.578C191.67 247.521 218.888 241 249.5 241C280.112 241 307.33 247.521 326.531 257.578C346.205 267.884 355 280.378 355 291.5Z"
        fill="white"
        fillOpacity="0.02"
        stroke={colorContext.colorThemeColor}
        strokeWidth="20"
      />
      <line
        id="Outline3"
        x1="357"
        y1="292"
        x2="357"
        y2="601.026"
        stroke={colorContext.colorThemeColor}
        strokeWidth="20"
      />
      <line
        id="Outline2"
        x1="144"
        y1="292"
        x2="144"
        y2="601"
        stroke={colorContext.colorThemeColor}
        strokeWidth="20"
      />
      <line
        id="Outline1"
        x1="248"
        y1="277"
        x2="248"
        y2="205"
        stroke={colorContext.colorThemeColor}
        strokeWidth="20"
      />
      <ellipse
        id="Flamme2"
        cx="249.5"
        cy="223"
        rx="49.5"
        ry="32"
        fill={colorContext.colorThemeColor}
      />
      <path
        id="Flamme1"
        d="M211 205C217.899 167.476 228.638 148.871 251.503 117C254.023 158.257 260.727 178.281 288 205H211Z"
        fill={colorContext.colorThemeColor}
      />
      <path
        id="Vector 4"
        d="M140 593C194.018 640.899 299.642 646.361 358 593"
        stroke={colorContext.colorThemeColor}
        strokeWidth="20"
      />
    </svg>
  );
}
