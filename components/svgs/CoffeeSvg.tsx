import { ColorThemeContext } from '@/context/ColorThemeContextProvider';
import { useContext } from 'react';

export default function CoffeeSvg() {
  const colorContext = useContext(ColorThemeContext);
  return (
    <svg
      width="500"
      height="800"
      viewBox="0 0 500 800"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Coffee">
        <path
          id="Vector 17"
          d="M409.045 365H54C55.818 536.47 54 666.491 229.052 664.987C323.911 664.172 366.216 627.682 386.479 566.495M409.045 365C409.045 365 485.277 407.103 472.572 482.288C459.866 557.473 386.479 566.495 386.479 566.495M409.045 365C404.986 445.392 403.609 514.769 386.479 566.495"
          stroke={colorContext.colorThemeColor}
          stroke-width="20"
        />
        <path
          id="Vector 18"
          d="M86.1832 300C86.1832 300 178.501 218.591 121.313 190.632C64.1251 162.674 86.1832 101 86.1832 101"
          stroke={colorContext.colorThemeColor}
          stroke-width="20"
        />
        <path
          id="Vector 19"
          d="M196.183 284C196.183 284 288.501 202.591 231.313 174.632C174.125 146.674 196.183 85 196.183 85"
          stroke={colorContext.colorThemeColor}
          stroke-width="20"
        />
        <path
          id="Vector 20"
          d="M306.111 300C306.111 300 396.837 218.591 340.635 190.632C284.433 162.674 306.111 101 306.111 101"
          stroke={colorContext.colorThemeColor}
          stroke-width="20"
        />
      </g>
    </svg>
  );
}
