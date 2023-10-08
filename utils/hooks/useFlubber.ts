//@ts-ignore
import { interpolate } from 'flubber';
import { MotionValue, useTransform } from 'framer-motion';

export const getIndex = (_: any, index: number) => index;

/**
 * This function takes a progress value and an array of paths.
 * The max segment length determines how many points are used to interpolate
 * between the paths.
 * The smaller the number, the more accurate the interpolation will be, but the
 * more expensive it will be to calculate, meaning the animation will take much longer to fire.
 * @param progress
 * @param paths
 * @returns the motion value that can be used to animate between the paths
 */

export function useFlubber(progress: MotionValue<number>, paths: string[]) {
  return useTransform(progress, paths.map(getIndex), paths, {
    mixer: (a, b) => interpolate(a, b, { maxSegmentLength: 3 }),
  });
}
