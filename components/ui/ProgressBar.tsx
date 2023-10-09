import { ColorThemeContext } from '@/context/ColorThemeContextProvider';
import { useContext } from 'react';

export default function ProgressBar({ percentage }: { percentage: number }) {
  const colorContext = useContext(ColorThemeContext);
  return (
    <div
      className=" fixed bottom-0 left-0 h-3"
      style={{
        width: `${percentage}%`,
        transition: 'width 0.5s ease-out',
        backgroundColor: colorContext.colorThemeColor,
      }}
    />
  );
}
