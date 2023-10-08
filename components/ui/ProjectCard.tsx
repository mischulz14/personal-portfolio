import Image from 'next/image';
import Link from 'next/link';

import { techStackImages } from '../sections/TechStack';
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
  return (
    <div className="flex flex-col gap-2 items-stretch p-4 my-4 w-[320px] sm:w-full rounded-lg  shadow-whiteBox">
      <div className="flex w-full justify-center gap-4 items-center mb-2">
        <h2 className="text-2xl font-bold flex justify-center items-center text-center text-white">
          {title}
        </h2>
        <Image src={logoSrc} alt={title} width={40} height={40} />
      </div>

      <Accordion title="Description">
        <p className="text-gray-600 dark:text-gray-400">{description}</p>
      </Accordion>
      <Accordion title="Skills/Role">
        <p className="text-gray-600 dark:text-gray-400">{role}</p>
      </Accordion>
      <Accordion title="Technologies">
        <div className="flex flex-wrap justify-center w-full">
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
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={60}
                    height={60}
                    className="rounded-md p-4"
                  />
                  <p className="text-sm mt-2">{img.alt}</p>
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
        Check it out
      </Link>
    </div>
  );
}
