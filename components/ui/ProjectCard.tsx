import useSvgList from '@/utils/hooks/useSvgList';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import Link from 'next/link';

import Accordion from './Accordion';

interface ProjectCardProps {
  title: string;
  description: string;
  role: string;
  techstack: string[];
  link: string;
  logoSrc: string;
}

export default function ProjectCard({
  title,
  description,
  role,
  techstack,
  link,
  logoSrc,
}: ProjectCardProps) {
  const techStackImages = useSvgList();
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-2 items-stretch p-4 my-4 w-[320px] sm:w-full rounded-lg  shadow-whiteBox">
      <div className="flex w-full justify-center gap-4 items-center mb-2">
        <h2 className="text-xl font-bold flex justify-center items-center text-center text-white">
          {title}
        </h2>
        <Image src={logoSrc} alt={title} width={40} height={40} />
      </div>

      <Accordion title={t('common:description')}>
        <p className="text-gray-300">{t(`common:${description}`)}</p>
      </Accordion>
      <Accordion title={'Skills/' + t('common:role')}>
        <p className="text-gray-300">{t(`common:${role}`)}</p>
      </Accordion>
      <Accordion title={t('common:technologies')}>
        <div className="flex flex-wrap justify-center w-full gap-6">
          {techstack.map((tech) => {
            // search for the tech in the images array and return the image alt and src
            const img = techStackImages.find(
              (image) => image.alt.toLowerCase() === tech.toLowerCase(),
            );

            if (img) {
              return (
                <div
                  className="flex flex-col items-center justify-center hover:scale-110 transition-all duration-300"
                  key={tech}
                >
                  <div className="flex flex-col justify-center items-center">
                    <div className="h-8 w-8">{img.svgElement}</div>
                    <p className="text-xs mt-2">{img.alt}</p>
                  </div>
                </div>
              );
            }
            return null; // Return null if no image found for the tech
          })}
        </div>
      </Accordion>
      <Link
        target="_blank"
        className="bg-white/10 border-[1px] hover:scale-105 transition-all duration-300 border-white/10 rounded-full my-2 px-4 py-1 text-center"
        href={link}
      >
        {t('common:check-it')}
      </Link>
    </div>
  );
}
