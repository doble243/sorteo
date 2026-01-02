import React from 'react';
import { motion } from 'framer-motion';
import { useParallaxOffset } from '../hooks/useParallax';

const BackgroundElements: React.FC = () => {
  const { y: cubeY } = useParallaxOffset(0, 0.15);
  const { y: pyramidY } = useParallaxOffset(200, 0.25);
  const { y: circleY } = useParallaxOffset(100, 0.1);
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Floating Wireframe Cube 1 */}
      <motion.div
        style={{ y: cubeY }}
        animate={{
          rotateX: [0, 360],
          rotateY: [0, 360],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-1/4 left-10 w-64 h-64 opacity-10 mix-blend-screen"
      >
        <div className="w-full h-full relative transform-style-preserve-3d">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute inset-0 border border-brand-acid bg-brand-acid/5"
              style={{
                transform: `rotateY(${i * 90}deg) translateZ(128px) ${i >= 4 ? `rotateX(${i === 4 ? 90 : -90}deg)` : ''}`
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Floating Pyramid */}
      <motion.div
        style={{ y: pyramidY }}
        animate={{
          rotateX: [360, 0],
          rotateY: [360, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute bottom-1/3 right-10 w-48 h-48 opacity-5 mix-blend-screen"
      >
         <div className="relative w-full h-full" style={{ transformStyle: 'preserve-3d' }}>
            {/* Base */}
            <div className="absolute inset-0 border border-white bg-white/5" style={{ transform: 'translateZ(0px)' }}></div>
            {/* Sides */}
             <div className="absolute bottom-0 left-0 w-full h-[200px] border-l border-r border-white origin-bottom" style={{ transform: 'rotateX(30deg)' }}></div>
             <div className="absolute bottom-0 left-0 w-full h-[200px] border-l border-r border-white origin-bottom" style={{ transform: 'rotateY(90deg) rotateX(30deg)' }}></div>
             <div className="absolute bottom-0 left-0 w-full h-[200px] border-l border-r border-white origin-bottom" style={{ transform: 'rotateY(180deg) rotateX(30deg)' }}></div>
             <div className="absolute bottom-0 left-0 w-full h-[200px] border-l border-r border-white origin-bottom" style={{ transform: 'rotateY(270deg) rotateX(30deg)' }}></div>
         </div>
      </motion.div>

      {/* Floating Sphere/Circle Grid */}
      <motion.div 
        style={{ y: circleY }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-white/5"
        animate={{ scale: [1, 1.1, 1], opacity: [0.05, 0.1, 0.05] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
       <motion.div 
        style={{ y: circleY }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-brand-acid/5"
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.05, 0.1, 0.05] }}
        transition={{ duration: 15, repeat: Infinity }}
      />

    </div>
  );
};

export default BackgroundElements;