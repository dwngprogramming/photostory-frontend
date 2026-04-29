import { useInView } from 'react-intersection-observer';
import { UseScrollAnimationOptions } from '@/types';

export const useScrollAnimation = (options?: UseScrollAnimationOptions) => {
  const { threshold = 0.1, triggerOnce = true, delay = 0, initialInView = false } = options || {};
  
  const { ref, inView } = useInView({
    threshold,
    triggerOnce,
    delay,
    initialInView,
  });
  
  return { ref, inView };
};