import { ColorThemeContext } from '@/context/ColorThemeContextProvider';
import { useContext } from 'react';

interface ButtonProps {
  children: React.ReactNode;
  type?: 'primary' | 'outlined' | 'secondary' | 'tertiary';
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  disabled?: boolean;
}

export default function Button({
  children,
  type,
  onClick,
  disabled,
}: ButtonProps) {
  const colorContext = useContext(ColorThemeContext);

  const classNames = () => {
    if (type === 'primary') {
      return `hover:scale-105 text-white py-2 px-4 rounded-lg transition-all duration-200`;
    }
    if (type === 'secondary') {
      return `bg-transparent border-2 hover:scale-105 text-white  py-2 px-4 rounded-lg transition-all duration-200`;
    }
    if (type === 'outlined') {
      return `bg-transparent border-[0.5px] hover:scale-105 text-white  py-2 px-4 rounded-lg transition-all duration-200`;
    }
    if (type === 'tertiary') {
      return `bg-transparent border-[0.5px] hover:scale-105 text-white/50  py-2 px-4 rounded-lg transition-all duration-200 !border-white/50 text-sm`;
    }
  };

  return (
    <>
      <button
        style={{
          backgroundColor:
            type === 'primary' ? colorContext.colorThemeColor : 'transparent',
          borderColor:
            type === 'secondary' ? colorContext.colorThemeColor : 'white',
        }}
        disabled={disabled}
        onClick={onClick}
        className={classNames()}
      >
        {children}
      </button>
    </>
  );
}
