import { ColorThemeContext } from '@/context/ColorThemeContextProvider';
import { useTranslation } from 'next-i18next';
import { useContext } from 'react';

import Carousel from '../ui/Carousel';
import ProjectCard from '../ui/ProjectCard';

export default function Projects() {
  const projectsArray = getProjects().map((project) => (
    <ProjectCard
      title={project.title}
      role={project.role}
      description={project.description}
      techstack={project.techstack}
      link={project.link}
      logoSrc={project.logoSrc}
      key={project.title}
    />
  ));

  const colorContext = useContext(ColorThemeContext);
  const { t } = useTranslation();

  return (
    <>
      <h2 className="font-bold sm:mb-10 mb-3 text-center sm:text-2xl text-xl w-fit-content block relative  sm:mt-12 -mt-7">
        <span>{t('common:my-projects')}</span>{' '}
        <div className="absolute h-20 w-20 -left-6 -top-5 z-[-1]">
          <svg
            className=""
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill={colorContext.colorThemeColor}
              d="M39.5,-49.7C52.9,-35.7,66.8,-25,68.1,-12.7C69.4,-0.5,58.1,13.3,48.9,27.5C39.8,41.8,32.9,56.5,21.8,61C10.8,65.4,-4.3,59.5,-16.5,52.1C-28.7,44.8,-37.9,36,-49.3,24.5C-60.6,13,-74.1,-1.2,-73.1,-14C-72.2,-26.8,-56.9,-38.2,-42.3,-52C-27.7,-65.8,-13.9,-82,-0.4,-81.5C13,-80.9,26,-63.7,39.5,-49.7Z"
              transform="translate(100 100)"
            />
          </svg>
        </div>
      </h2>
      <div className="flex justify-center gap-4 px-20 max-w-[600px]">
        {projectsArray ? <Carousel components={projectsArray} /> : null}
      </div>
    </>
  );
}

export const projects = [
  {
    title: 'AvaAssist',
    description: 'ava-description',
    role: 'ava-role',
    techstack: [
      'React',
      'NextJS',
      'TailwindCSS',
      'Node',
      'GraphQL',
      'Prisma',
      'PostgreSQL',
      'Typescript',
      'Git',
      'Github',
    ],
    link: 'https://ava.services/',
    logoSrc: '/ava.svg',
  },
  {
    title: 'Ball der Althietzinger',
    description: 'ball-description',
    role: 'ball-role',
    techstack: [
      'React',
      'NextJS',
      'TailwindCSS',
      'Node',
      'Typescript',
      'Git',
      'Github',
    ],
    link: 'http://hietzingerball.at',
    logoSrc: '/TaenzerSvg.svg',
  },
  // {
  //   title: 'Cleanly',
  //   description: 'cleanly-description',
  //   role: 'cleanly-role',
  //   techstack: [
  //     'React',
  //     'NextJS',
  //     'TailwindCSS',
  //     'Node',
  //     'PostgreSQL',
  //     'Typescript',
  //     'Git',
  //     'Github',
  //   ],
  //   link: 'https://cleanly.fly.dev/',
  //   logoSrc: '/cleanly.svg',
  // },
  {
    title: 'OrigaME Ecommerce',
    description: 'origame-description',
    role: 'origame-role',
    techstack: ['React', 'NextJS', 'TailwindCSS', 'Node', 'Git', 'Github'],
    link: 'https://origame-ecommerce.netlify.app/',
    logoSrc: '/origame.svg',
  },
];

export function getProjects() {
  return projects;
}
