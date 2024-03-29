import { projects } from '@/components/sections/Projects';
import Button from '@/components/ui/Button';
import Loader from '@/components/ui/Loader';
import { Link as LinkIcon } from 'heroicons-react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import Home from '../components/Home';

type BrowserName =
  | 'Chrome'
  | 'Firefox'
  | 'Internet Explorer'
  | 'Safari'
  | 'Opera'
  | 'Unknown Browser';

export default function Page() {
  const [areImagesLoaded, setAreImagesLoaded] = useState(false);
  const [browserName, setBrowserName] = useState<BrowserName | null>(null);
  const [isOldDomain, setIsOldDomain] = useState(false);
  const { t } = useTranslation('common');
  const projectImagePaths = projects.map((project) => project.logoSrc);
  const techStackImagePaths = getTechstackImages().map((image) => image.src);

  useEffect(() => {
    // check for old domain
    const currentUrl = window.location.href; // Full URL
    const domain = window.location.hostname; // Just the domain

    // Now you can check if it's a .tech domain
    const isTechDomain = domain.includes('.tech');
    setIsOldDomain(isTechDomain);

    // Here I check if the user is using Safari. If so, I set the browserName state to Safari. This is used to display a warning message to the user that the website is not optimized for Safari.
    const userAgent = navigator.userAgent;
    setBrowserName(getBrowserName(userAgent));
  }, []);

  /**
   * This useEffect is used to preload all the images that are used in the website. This is done so that the images are loaded before the website is rendered. I hate when you can see how an image gets rendered on the page ... it's just ugly.
   */
  useEffect(() => {
    const imagePaths = [
      ...projectImagePaths,
      ...techStackImagePaths,
      '/profilepic.png',
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
            }, 10);
          };
          image.onerror = () => reject();
        });
      }),
    ).then(() => setAreImagesLoaded(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {isOldDomain && (
        <div className="fixed top-0 gap-5 left-0 w-screen h-screen p-10 bg-black/70 flex flex-col justify-center items-center z-[999999999] text-center">
          <h1 className="text-3xl font-bold">{t('portfolio-moved')}</h1>
          <Button
            onClick={() => {
              setBrowserName(null);
            }}
            kind="primary"
          >
            <Link className="flex" href="https://michaelschulz.dev">
              <LinkIcon />
              {t('check-it')}
            </Link>
          </Button>
        </div>
      )}
      {areImagesLoaded && !isOldDomain ? <Home /> : <Loader />}
      {/* {areImagesLoaded && browserName === 'Safari' && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black/70 flex flex-col justify-center items-center z-[999999999]">
          <div className="bg-black p-8 shadow-whiteBox rounded-lg max-w-sm flex flex-col gap-7 justify-center items-center text-center">
            <h1 className="text-3xl font-bold">{t('using-safari')}</h1>
            <p className="text-xl">{t('not-optimized-for-safari')}</p>
            <Button
              onClick={() => {
                setBrowserName(null);
              }}
              kind="primary"
            >
              {t('let-me-in-anyway')}
            </Button>
          </div>
        </div>
      )} */}
    </>
  );
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

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}

function getBrowserName(userAgent: string): BrowserName {
  if (userAgent.includes('Chrome')) return 'Chrome';
  if (userAgent.includes('Firefox')) return 'Firefox';
  if (userAgent.includes('MSIE') || userAgent.includes('Trident'))
    return 'Internet Explorer';
  if (userAgent.includes('Safari') && !userAgent.includes('Chrome'))
    return 'Safari';
  if (userAgent.includes('Opera')) return 'Opera';
  return 'Unknown Browser';
}
