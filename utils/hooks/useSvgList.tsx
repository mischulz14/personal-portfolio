import CSSSvg from '@/components/svgs/CSSSvg';
import GitHubSvg from '@/components/svgs/GithubSvg';
import GitSvg from '@/components/svgs/GitSvg';
import GraphQLSvg from '@/components/svgs/GraphQLSvg';
import HTMLSvg from '@/components/svgs/HTMLSvg';
import JavascriptSvg from '@/components/svgs/JavascriptSvg';
import NextSvg from '@/components/svgs/NextSvg';
import NodeSvg from '@/components/svgs/NodeSvg';
import PostgresSvg from '@/components/svgs/PostgresSvg';
import PrismaSvg from '@/components/svgs/PrismaSvg';
import ReactSvg from '@/components/svgs/ReactSvg';
import TailwindSvg from '@/components/svgs/TailwindSvg';
import ThreeJSSvg from '@/components/svgs/ThreeJSSvg';
import TypescriptSvg from '@/components/svgs/TypescriptSvg';
import { ColorThemeContext } from '@/context/ColorThemeContextProvider';
import { useContext } from 'react';

export default function useSvgList() {
  const colorContext = useContext(ColorThemeContext);
  const techStackSvgs = [
    {
      svgElement: <HTMLSvg color={colorContext.colorThemeColor} />,
      alt: 'HTML',
      href: 'https://developer.mozilla.org/en-US/docs/Web/HTML',
    },
    {
      svgElement: <CSSSvg color={colorContext.colorThemeColor} />,
      alt: 'CSS',
      href: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
    },
    {
      svgElement: <TailwindSvg color={colorContext.colorThemeColor} />,
      alt: 'TailwindCSS',
      href: 'https://tailwindcss.com/',
    },
    // { svgElement: '/sass.svg', alt: 'Sass' },
    {
      svgElement: <JavascriptSvg color={colorContext.colorThemeColor} />,
      alt: 'Javascript',
      href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
    },
    {
      svgElement: <TypescriptSvg color={colorContext.colorThemeColor} />,
      alt: 'Typescript',
      href: 'https://www.typescriptlang.org/',
    },
    {
      svgElement: <NodeSvg color={colorContext.colorThemeColor} />,
      alt: 'Node',
      href: 'https://nodejs.org/en/',
    },
    {
      svgElement: <GraphQLSvg color={colorContext.colorThemeColor} />,
      alt: 'GraphQL',
      href: 'https://graphql.org/',
    },
    {
      svgElement: <PrismaSvg color={colorContext.colorThemeColor} />,
      alt: 'Prisma',
      href: 'https://www.prisma.io/',
    },
    {
      svgElement: <PostgresSvg color={colorContext.colorThemeColor} />,
      alt: 'PostgreSQL',
      href: 'https://www.postgresql.org/',
    },
    {
      svgElement: <ReactSvg color={colorContext.colorThemeColor} />,
      alt: 'React',
      href: 'https://react.dev/',
    },
    {
      svgElement: <NextSvg color={colorContext.colorThemeColor} />,
      alt: 'NextJS',
      href: 'https://nextjs.org/',
    },
    {
      svgElement: <GitSvg color={colorContext.colorThemeColor} />,
      alt: 'Git',
      href: 'https://git-scm.com/',
    },
    {
      svgElement: <GitHubSvg color={colorContext.colorThemeColor} />,
      alt: 'Github',
      href: 'https://github.com/mischulz14',
    },
    {
      svgElement: <ThreeJSSvg color={colorContext.colorThemeColor} />,
      alt: 'ThreeJS',
      href: 'https://threejs.org/',
    },
  ];

  return techStackSvgs;
}
