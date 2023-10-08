import Image from 'next/image';

export default function TechStack() {
  const images = getImages();

  return (
    <div className=" max-w-xl flex flex-col justify-center items-center">
      <p className="pt-10 pb-10 text-2xl font-medium text-center -mt-16">
        <span className="text-effect inline-block pb-[8px] pl-[2px]">This</span>{' '}
        is my Tech stack
      </p>
      <div className=" rounded-md sm:flex grid grid-cols-3 flex-wrap items-center justify-center flex-col sm:flex-row gap-5">
        {images.map((image) => (
          <div
            className="flex flex-col items-center justify-center hover:scale-110 transition-all duration-300"
            key={image.alt}
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={80}
              height={80}
              className="rounded-md p-4"
            />
            <p className="text-sm mt-2">{image.alt}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export const images = [
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

export function getImages() {
  return images;
}
