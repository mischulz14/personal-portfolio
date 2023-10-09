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
    },
    // { svgElement: '/sass.svg', alt: 'Sass' },
    {
      svgElement: <JavascriptSvg color={colorContext.colorThemeColor} />,
      alt: 'Javascript',
    },
    {
      svgElement: <TypescriptSvg color={colorContext.colorThemeColor} />,
      alt: 'Typescript',
    },
    {
      svgElement: <NodeSvg color={colorContext.colorThemeColor} />,
      alt: 'Node',
    },
    {
      svgElement: <GraphQLSvg color={colorContext.colorThemeColor} />,
      alt: 'GraphQL',
    },
    {
      svgElement: <PrismaSvg color={colorContext.colorThemeColor} />,
      alt: 'Prisma',
    },
    {
      svgElement: <PostgresSvg color={colorContext.colorThemeColor} />,
      alt: 'PostgreSQL',
    },
    {
      svgElement: <ReactSvg color={colorContext.colorThemeColor} />,
      alt: 'React',
    },
    {
      svgElement: <NextSvg color={colorContext.colorThemeColor} />,
      alt: 'NextJS',
    },
    { svgElement: <GitSvg color={colorContext.colorThemeColor} />, alt: 'Git' },
    {
      svgElement: <GitHubSvg color={colorContext.colorThemeColor} />,
      alt: 'Github',
    },
  ];

  return techStackSvgs;
}
