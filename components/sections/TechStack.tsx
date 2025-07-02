import useSvgList from '@/utils/hooks/useSvgList';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';

export default function TechStack() {
  const { t } = useTranslation();

  const techStackSvgs = useSvgList();

  return (
    <div className=" max-w-xl flex flex-col justify-center items-center">
      <p className="pt-1 pb-8 sm:text-2xl text-xl font-medium text-center -mt-16 sm:mt-0">
        <span className="text-effect inline-block pb-[8px] pl-[2px]">
          {t('common:this')}
        </span>{' '}
        {t('common:tech-stack')}
      </p>
      <div className=" rounded-md sm:flex grid grid-cols-3 flex-wrap items-center justify-center flex-col sm:flex-row gap-6">
        {techStackSvgs.map((tech) => (
          <Link
            href={tech.href}
            target="_blank"
            className="flex flex-col items-center justify-center hover:scale-110 transition-all duration-300 max-w-full sm:max-w-lg"
            key={tech.alt}
          >
            <div className="sm:w-12 sm:h-12 h-5 w-5">{tech.svgElement}</div>
            <p className="text-sm mt-2">{tech.alt}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
