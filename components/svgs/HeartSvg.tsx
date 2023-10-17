import { ColorThemeContext } from '@/context/ColorThemeContextProvider';
import { useContext } from 'react';

export default function HeartSvg() {
  const colorContext = useContext(ColorThemeContext);

  return (
    <svg viewBox="0 0 500 800" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M243.371 294.433C243.371 294.433 192.893 149.508 95.82 188.736C-1.25287 227.963 7.62232 288.439 24.8181 337.474C42.0139 386.509 243.371 672 243.371 672C243.371 672 461.369 396.861 478.564 337.474C495.76 278.088 490.213 201.812 384.265 188.736C278.317 175.66 243.371 294.433 243.371 294.433Z"
        stroke={colorContext.colorThemeColor}
        strokeWidth="20"
      />
    </svg>
  );
}
