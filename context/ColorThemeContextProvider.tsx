import { createContext, useEffect, useState } from 'react';
import { useLocalStorage } from 'react-use';

type ColorThemeContextType = {
  colorThemeColor: string;
  changeColorTheme: (color: ColorOptions) => void;
};

export type ColorOptions =
  | 'green'
  | 'blue'
  | 'orange'
  | 'pink'
  | 'red'
  | 'purple';

export const ColorThemeContext = createContext<ColorThemeContextType>({
  colorThemeColor: 'green',
  changeColorTheme: () => {},
});

export const colorCodes = {
  green: {
    primary: '#429585',
    secondary: '#071b17',
  },
  blue: {
    primary: '#0b5d77',
    secondary: '#051220',
  },
  orange: {
    primary: '#bd770a',
    secondary: '#21180d',
  },
  pink: {
    primary: '#c75a7d',
    secondary: '#220c1b',
  },
  red: {
    primary: '#d82222',
    secondary: '#27120f',
  },
  purple: {
    primary: '#9622d8',
    secondary: '#1f0e1f',
  },
};

export default function ColorThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [primaryColorInLocalStorage, setPrimaryColorInLocalStorage] =
    useLocalStorage('color', colorCodes.green.primary);
  const [secondaryColorInLocalStorage, setSecondaryColorInLocalStorage] =
    useLocalStorage('secondaryColor', colorCodes.green.secondary);

  const [colorThemeColor, setColorThemeColor] = useState(
    primaryColorInLocalStorage
      ? primaryColorInLocalStorage
      : colorCodes.green.primary,
  );

  useEffect(() => {
    // Use the useEffect hook
    changeColorInRoot(
      primaryColorInLocalStorage
        ? primaryColorInLocalStorage
        : colorCodes.green.primary,
      secondaryColorInLocalStorage
        ? secondaryColorInLocalStorage
        : colorCodes.green.secondary,
    );
  }, [primaryColorInLocalStorage, secondaryColorInLocalStorage]);

  function changeColorTheme(color: ColorOptions) {
    // find the color code from the color name
    const newColor = colorCodes[color];

    setColorThemeColor(newColor.primary);
    setPrimaryColorInLocalStorage(newColor.primary);
    setSecondaryColorInLocalStorage(newColor.secondary);

    changeColorInRoot(newColor.primary, newColor.secondary);
  }

  return (
    <ColorThemeContext.Provider value={{ colorThemeColor, changeColorTheme }}>
      {children}
    </ColorThemeContext.Provider>
  );
}

function changeColorInRoot(newPrimaryColor: string, newSecondaryColor: string) {
  // change the color of the root element
  // change :root css variables
  document.documentElement.style.setProperty(
    '--bg-theme-color',
    newSecondaryColor,
  );
  document.documentElement.style.setProperty('--theme-color', newPrimaryColor);
}
