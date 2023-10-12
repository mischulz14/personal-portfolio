import {
  animate,
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
} from 'framer-motion';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

import { getIndex, useFlubber } from '../utils/hooks/useFlubber';
import { about, contact, hero, projects, techstack } from '../utils/svg/paths';

const paths = [hero, about, techstack, projects, contact];
const colors = ['#fff', '#fff', '#fff', '#fff', '#fff'];

export default function SVGs(props: { pathIndex: number }) {
  const progress = useMotionValue(props.pathIndex);
  const fill = useTransform(progress, paths.map(getIndex), colors);
  const path = useFlubber(progress, paths);
  const controls = useAnimation();
  const controls2 = useAnimation();
  const [oldPathIndex, setOldPathIndex] = useState(props.pathIndex);

  useEffect(() => {
    // This useEffect gets triggered each time the pathIndex changes (which is each time a new section is scrolled to on the homepage)
    const animation = animate(progress, props.pathIndex, {
      duration: 0.3,
      ease: 'linear',
    });

    controls.start({
      rotate: [0, props.pathIndex > oldPathIndex ? 180 : -180], // the rotation is changed based on the direction of the scroll. If the scroll is down (aka the new pathindex from the props is greater than the old pathIndex), the rotation is 180, if the scroll is up, the rotation is -180
      transition: { duration: 0.3, ease: 'linear' },
    });

    controls2.start({
      // this is needed because I didn't want to animate the svg path itself, but rather the svg container, which is why I had to animate the svg container's children in the opposite direction
      rotate: [0, props.pathIndex > oldPathIndex ? -180 : 180],
      transition: { duration: 0.3, ease: 'linear' },
    });

    setOldPathIndex(props.pathIndex);

    // console.log('animation', animation);

    return () => animation.stop();
  }, [progress, props.pathIndex]);

  return (
    <div className="fixed top-0 pl-0 md:pl-6 left-0 h-screen w-20 flex justify-center md:items-center items-start">
      <motion.div
        className="border-[0.5px] scale-50 sm:scale-75 lg:scale-110 rounded-full flex items-center justify-center "
        // animate={controls}
      >
        <motion.div
          className="border-[0.5px] flex items-center rounded-lg justify-center shadow-white"
          animate={controls}
        >
          {' '}
          <motion.div
            animate={controls2}
            className="!self-center relative w-24 h-24"
          >
            <svg
              width={100}
              height={100}
              className="absolute left-[18px] top-1/2 -translate-y-7"
            >
              <g transform="scale(2.5)">
                <motion.path fill={fill} d={path} />
              </g>
            </svg>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
