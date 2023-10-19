import { ColorThemeContext } from '@/context/ColorThemeContextProvider';
import { useContext } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  kind?: 'primary' | 'outlined' | 'secondary' | 'tertiary';
  // You can remove onClick, disabled, className as they are already part of React.ButtonHTMLAttributes<HTMLButtonElement>
}

export default function Button({
  children,
  kind,
  onClick,
  disabled,
  className,
  ...props
}: ButtonProps) {
  const colorContext = useContext(ColorThemeContext);

  const classNames = () => {
    if (kind === 'primary') {
      return `hover:scale-105 text-white py-2 px-4 rounded-lg transition-all duration-200`;
    }
    if (kind === 'secondary') {
      return `bg-transparent border-2 hover:scale-105 text-white  py-2 px-4 rounded-lg transition-all duration-200`;
    }
    if (kind === 'outlined') {
      return `bg-transparent border-[0.5px] hover:scale-105 text-white  py-2 px-4 rounded-lg transition-all duration-200`;
    }
    if (kind === 'tertiary') {
      return `bg-transparent border-[0.5px] hover:scale-105 text-white/50  py-2 px-4 rounded-lg transition-all duration-200 !border-white/50 text-sm`;
    }
  };

  return (
    <>
      <button
        {...props}
        style={{
          backgroundColor:
            kind === 'primary' ? colorContext.colorThemeColor : 'transparent',
          borderColor:
            kind === 'secondary' ? colorContext.colorThemeColor : 'white',
        }}
        disabled={disabled}
        onClick={onClick}
        className={`${classNames()} ${className}`}
      >
        {children}
      </button>
    </>
  );
}
