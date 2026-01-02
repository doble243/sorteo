import { useScroll, useTransform, motionValue } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';

interface ParallaxOptions {
  speed?: number;
  disabled?: boolean;
}

export const useParallax = (options: ParallaxOptions = {}) => {
  const { speed = 0.5, disabled = false } = options;
  const { scrollY } = useScroll();
  const isMobile = useMediaQuery({ maxWidth: 768 });
  
  // Disable parallax on mobile for better performance
  const shouldDisable = disabled || isMobile;
  
  const y = shouldDisable 
    ? motionValue(0)
    : useTransform(scrollY, [0, 1000], [0, 1000 * speed]);
    
  const opacity = shouldDisable
    ? motionValue(1)
    : useTransform(scrollY, [0, 300], [1, 0]);
    
  const scale = shouldDisable
    ? motionValue(1)
    : useTransform(scrollY, [0, 500], [1, 1.1]);

  return { y, opacity, scale, isMobile };
};

export const useParallaxOffset = (offset: number = 0, speed: number = 0.5) => {
  const { scrollY } = useScroll();
  const isMobile = useMediaQuery({ maxWidth: 768 });
  
  const shouldDisable = isMobile;
  
  const y = shouldDisable
    ? motionValue(0)
    : useTransform(scrollY, [offset, offset + 1000], [0, 1000 * speed]);
    
  return { y, isMobile };
};
