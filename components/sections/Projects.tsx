import Carousel from '../ui/Carousel';
import ProjectCard from '../ui/ProjectCard';

export default function Projects() {
  const projectsArray = getProjects().map((project) => (
    <ProjectCard
      title={project.title}
      description={project.description}
      role={project.role}
      techstack={project.techstack}
      link={project.link}
      logoSrc={project.logoSrc}
      key={project.title}
    />
  ));

  return (
    <>
      <h2 className="font-bold sm:mb-14 mb-6 text-center text-2xl w-fit-content block relative">
        <span>My Projects</span>{' '}
        <svg
          className="scale-[3] absolute right-24 -top-0 z-[-1]"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#429585"
            d="M39.5,-49.7C52.9,-35.7,66.8,-25,68.1,-12.7C69.4,-0.5,58.1,13.3,48.9,27.5C39.8,41.8,32.9,56.5,21.8,61C10.8,65.4,-4.3,59.5,-16.5,52.1C-28.7,44.8,-37.9,36,-49.3,24.5C-60.6,13,-74.1,-1.2,-73.1,-14C-72.2,-26.8,-56.9,-38.2,-42.3,-52C-27.7,-65.8,-13.9,-82,-0.4,-81.5C13,-80.9,26,-63.7,39.5,-49.7Z"
            transform="translate(100 100)"
          />
        </svg>
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
    description:
      'AvaAssist connects people with disabilities to personal assistants. It also provides a platform for organizations to manage their personal assistants and clients.',
    role: 'Fullstack Developer role in a small development team using different technologies. Conception of new project features, UI/UX design in Figma, design and development of the frontend and backend, writing tests, deployment and writing documentation.',
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
    title: 'Cleanly',
    description:
      'Cleanly is a webapp that allows users to book cleaning services online. It is currently not maintained.',
    role: 'Fullstack Developer project that implements different technologies. Conception of the complete project including user journeys, UI/UX design in Figma, database design, development of the frontend and backend, writing tests and deployment of the project.',
    techstack: [
      'React',
      'NextJS',
      'TailwindCSS',
      'Node',
      'PostgreSQL',
      'Typescript',
      'Git',
      'Github',
    ],
    link: 'https://cleanly.fly.dev/',
    logoSrc: '/cleanly.svg',
  },
  {
    title: 'OrigaME Ecommerce',
    description:
      'A mockup of an ecommerce store. It has a fully functional shopping cart and checkout process, but with no payment.',
    role: 'Fullstack Developer project that implements different technologies. Conception of the complete project including design and development of the frontend and backend, writing tests and deployment of the project.',
    techstack: [
      'React',
      'NextJS',
      'TailwindCSS',
      'Node',
      'PostgreSQL',
      'Git',
      'Github',
    ],
    link: 'https://origame-ecommerce.netlify.app/',
    logoSrc: '/origame.svg',
  },
];

export function getProjects() {
  return projects;
}
