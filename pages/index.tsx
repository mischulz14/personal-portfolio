import { projects } from '@/components/sections/Projects';
import Loader from '@/components/ui/Loader';
import { useEffect, useState } from 'react';

import Home from '../components/Home';

export default function Page() {
  const [areImagesLoaded, setAreImagesLoaded] = useState(false);

  const projectImagePaths = projects.map((project) => project.logoSrc);
  const techStackImagePaths = getTechstackImages().map((image) => image.src);

  /**
   * This useEffect is used to preload all the images that are used in the website. This is done so that the images are loaded before the website is rendered. I hate when you can see how an image gets rendered on the page ... it's just ugly.
   */
  useEffect(() => {
    const imagePaths = [
      ...projectImagePaths,
      ...techStackImagePaths,
      '/profilepic.png',
      '/Logo.png',
    ];
    const images = imagePaths.map((path) => {
      const img = new Image();
      img.src = path;
      return img;
    });
    Promise.all(
      images.map((image) => {
        return new Promise((resolve, reject) => {
          image.onload = () => {
            setTimeout(() => {
              resolve(image);
            }, 1000);
          };
          image.onerror = () => reject();
        });
      }),
    ).then(() => setAreImagesLoaded(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{areImagesLoaded ? <Home /> : <Loader />}</>;
}

const techStackImages = [
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

function getTechstackImages() {
  return techStackImages;
}
