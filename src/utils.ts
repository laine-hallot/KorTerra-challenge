import { useRef } from 'react';

export const useDebounce = <F extends Function>(
  delay: number,
  targetFunc: F,
): F => {
  const lock = useRef(false);

  const intermediateType = (...props: any[]) => {
    if (lock.current) {
      throw 'Debounce not ready';
    }
    lock.current = true;
    setTimeout(() => {
      lock.current = false;
    }, delay);
    return targetFunc(...props);
  };

  return <any>intermediateType;
};
