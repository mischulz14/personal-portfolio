import { ColorThemeContext } from '@/context/ColorThemeContextProvider';
import useSvgList from '@/utils/hooks/useSvgList';
import Image from 'next/image';
import { useContext } from 'react';

import CSSSvg from '../svgs/CSSSvg';
import HTMLSvg from '../svgs/HTMLSvg';

export default function TechStack() {
  const colorContext = useContext(ColorThemeContext);

  const techStackSvgs = useSvgList();

  return (
    <div className=" max-w-xl flex flex-col justify-center items-center">
      <p className="pt-10 pb-10 text-2xl font-medium text-center -mt-16 sm:mt-0">
        <span className="text-effect inline-block pb-[8px] pl-[2px]">This</span>{' '}
        is my Tech stack
      </p>
      <div className=" rounded-md sm:flex grid grid-cols-3 flex-wrap items-center justify-center flex-col sm:flex-row gap-8">
        {techStackSvgs.map((image) => (
          <div
            className="flex flex-col items-center justify-center hover:scale-110 transition-all duration-300 max-w-full sm:max-w-lg"
            key={image.alt}
          >
            <div className="w-12 h-12">{image.svgElement}</div>
            <p className="text-sm mt-2">{image.alt}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// export function getImages() {
//   return techStackImages;
// }

export const techStackImages = [
  { src: '/html.svg', alt: 'HTML' },
  { src: '/css.svg', alt: 'CSS' },
  { src: '/tailwind.svg', alt: 'TailwindCSS' },
  { src: '/sass.svg', alt: 'Sass' },
  { src: '/js.svg', alt: 'Javascript' },
  { src: '/typescript.svg', alt: 'Typescript' },
  { src: '/node.svg', alt: 'Node' },
  { src: '/GraphQLLogo.svg', alt: 'GraphQL' },
  { src: '/prisma.svg', alt: 'Prisma' },
  { src: '/postgres.svg', alt: 'PostgreSQL' },
  { src: '/react.svg', alt: 'React' },
  { src: '/next.svg', alt: 'NextJS' },
  { src: '/git.svg', alt: 'Git' },
  { src: '/github.svg', alt: 'Github' },
];
