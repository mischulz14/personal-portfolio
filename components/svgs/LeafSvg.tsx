import { ColorThemeContext } from '@/context/ColorThemeContextProvider';
import { useContext } from 'react';

export default function LeafSvg() {
  const colorContext = useContext(ColorThemeContext);
  return (
    <svg
      className="sm:h-20 sm:w-20 h-14 w-14 memory-svg"
      viewBox="0 0 500 800"
      fill="none"
      xmlns="http://www.w3.org/2000/svg "
    >
      <path
        id="Vector 9"
        d="M249.5 59.5C149.064 151.787 41.8499 245.818 20 369C-1.84989 492.182 67.9998 584.5 124.5 617.5C181 650.5 204.806 609.5 229 667.5C253.195 725.5 249.5 739.5 249.5 739.5C249.5 739.5 256 705 268.5 667.5C281 630 315 653.5 377.5 617.5C440 581.5 499.31 484.037 481 369C427.397 242.74 374.106 175.352 249.5 59.5Z"
        stroke={colorContext.colorThemeColor}
        strokeWidth="20"
      />
      <path
        id="Vector 10"
        d="M251 706.5V102"
        stroke={colorContext.colorThemeColor}
        strokeWidth="20"
      />
      <path
        id="Vector 11"
        d="M250.5 580C146.937 545.163 112.226 505.153 74 413M250.5 580C146.937 545.163 112.226 505.153 74 413"
        stroke={colorContext.colorThemeColor}
        strokeWidth="20"
      />
      <path
        id="Vector 12"
        d="M250.5 452C188.617 421.918 161.933 399.493 141 341"
        stroke={colorContext.colorThemeColor}
        strokeWidth="20"
      />
      <path
        id="Vector 15"
        d="M251 580C354.563 545.163 389.274 505.153 427.5 413M251 580C354.563 545.163 389.274 505.153 427.5 413"
        stroke={colorContext.colorThemeColor}
        strokeWidth="20"
      />
      <path
        id="Vector 16"
        d="M255.5 452C317.383 421.918 344.067 399.493 365 341"
        stroke={colorContext.colorThemeColor}
        strokeWidth="20"
      />
    </svg>
  );
}
