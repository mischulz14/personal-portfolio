import Image from 'next/image';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <div className="flex items-start flex-col max-w-xs relative">
      <h2 className="max-w-fit-content self-center mb-6 text-center text-xl font-semibold">
        <span className="text-effect py-2">Contact </span>Information
      </h2>
      {basicInfo.map((info) => (
        <div
          className="flex justify-center items-center gap-2 my-2"
          key={info.name}
        >
          <Image src={info.iconSrc} alt={info.name} width={20} height={20} />
          <h3>{info.name}</h3>
          {info.name === 'Languages' ? (
            <p className="text-gray-600 ml-3 max-w-xs dark:text-gray-400">
              {info.value}
            </p>
          ) : (
            <p className="text-gray-600 ml-3 dark:text-gray-400">
              {info.value}
            </p>
          )}
        </div>
      ))}
      <div className="absolute right-10 -bottom-20 flex gap-2 items-center justify-center">
        <span> Made with </span>
        <Image src="/love.svg" alt="love" width={30} height={30} />
        <span>by Michael Schulz</span>
      </div>
      <div className="absolute right-10 -bottom-32 flex gap-2 items-center justify-center">
        <Image src="/copyright.svg" alt="love" width={20} height={20} />
        <span>Copyright Michael Schulz {year}</span>
      </div>
    </div>
  );
}

const basicInfo = [
  {
    name: 'Phone',
    value: '+4369911388765',
    iconSrc: '/phone.svg',
  },
  {
    name: 'Email',
    value: 'mi.schulz@hotmail.com',
    iconSrc: '/email.svg',
  },
  {
    name: 'Location',
    value: 'Vienna, Austria',
    iconSrc: '/house.svg',
  },
  {
    name: 'Languages',
    value:
      'English (C1), German (Native), Spanish (C1), Catalan (A1), French (A2)',
    iconSrc: '/languages.svg',
  },
];
