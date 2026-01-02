import React from 'react';
import { motion } from 'framer-motion';

interface Phone3DProps {
  imageUrl: string;
  color?: string;
  delay?: number;
  rotate?: number;
}

const Phone3D: React.FC<Phone3DProps> = ({ imageUrl, color = '#000', delay = 0, rotate = 12 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      className="relative w-[280px] h-[580px] perspective-1000 group"
      style={{ perspective: '1000px' }}
    >
      <motion.div
        animate={{ 
          rotateY: [rotate - 5, rotate + 5, rotate - 5],
          rotateX: [5, -5, 5],
          y: [0, -20, 0]
        }}
        transition={{ 
          duration: 6, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="relative w-full h-full preserve-3d transition-all duration-500 group-hover:scale-105"
        style={{ 
          transformStyle: 'preserve-3d',
          transform: `rotateY(${rotate}deg) rotateX(10deg)` 
        }}
      >
        {/* Case Body */}
        <div 
          className="absolute inset-0 rounded-[3rem] border-4 border-gray-800 shadow-2xl overflow-hidden"
          style={{ 
            backgroundColor: color,
            boxShadow: '20px 20px 60px rgba(0,0,0,0.5), -5px -5px 20px rgba(255,255,255,0.05) inset' 
          }}
        >
          {/* Camera Bump */}
          <div className="absolute top-8 left-8 w-24 h-24 bg-black/20 backdrop-blur-md rounded-3xl z-20 border border-white/10 flex flex-wrap p-2 gap-1 content-center justify-center">
            <div className="w-8 h-8 rounded-full bg-black/80 ring-1 ring-gray-600"></div>
            <div className="w-8 h-8 rounded-full bg-black/80 ring-1 ring-gray-600"></div>
            <div className="w-8 h-8 rounded-full bg-black/80 ring-1 ring-gray-600"></div>
          </div>

          {/* Design Image */}
          <div className="absolute inset-0 opacity-90 mix-blend-overlay z-10">
             <img src={imageUrl} alt="Case Design" className="w-full h-full object-cover" />
          </div>
          
          {/* Lighting Reflection */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent z-30 pointer-events-none"></div>
        </div>

        {/* Side Buttons (Pseudo-elements simulated) */}
        <div className="absolute top-32 -right-1 w-1 h-12 bg-gray-700 rounded-r-md"></div>
        <div className="absolute top-48 -right-1 w-1 h-20 bg-gray-700 rounded-r-md"></div>
      </motion.div>
    </motion.div>
  );
};

export default Phone3D;