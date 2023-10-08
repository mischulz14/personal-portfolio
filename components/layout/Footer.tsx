import Image from 'next/image';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <div className="flex items-center flex-col max-w-xs relative">
      <h2 className="max-w-fit-content self-center mb-6 text-center text-xl font-semibold">
        <span className="text-effect py-2">Contact </span>Information
      </h2>
      {basicInfo.map((info) => (
        <div
          className="flex flex-col justify-center items-center gap-2 my-2"
          key={info.name}
        >
          <div className="flex gap-1 items-center justify-center">
            <Image src={info.iconSrc} alt={info.name} width={20} height={20} />
            <h3>{info.name}</h3>
          </div>
          {info.name === 'Languages' ? (
            <p className=" max-w-xs text-gray-400 ml-auto text-center">
              {info.value}
            </p>
          ) : (
            <p className=" text-gray-400 ml-auto">{info.value}</p>
          )}
        </div>
      ))}
      <div className="mt-16 text-gray-500 flex gap-2 items-center justify-center">
        <span> Made with </span>
        <Image src="/love.svg" alt="love" width={30} height={30} />
        <span>by Michael Schulz</span>
      </div>
      <div className="mt-4 flex text-gray-500 gap-2 items-center justify-center">
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
      'English (C1), German (Native), Spanish (C1), Catalan (A2), French (A2)',
    iconSrc: '/languages.svg',
  },
];
