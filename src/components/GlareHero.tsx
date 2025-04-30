import React from "react";
import { motion } from "framer-motion";

interface GlareHeroProps {
  logoSrc: string;
  title: string;
  subtitle: string;
  primaryAction: React.ReactNode;
  secondaryAction?: React.ReactNode;
}

export const GlareHero: React.FC<GlareHeroProps> = ({ logoSrc, title, subtitle, primaryAction, secondaryAction }) => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-[60vh] py-20 overflow-hidden bg-gradient-to-br from-blue-900 via-blue-700 to-[#F59E42]">
      {/* Glare Effect */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.3, scale: 1 }}
        transition={{ duration: 1.2 }}
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[#F59E42]/60 via-blue-400/40 to-white/10 blur-3xl pointer-events-none"
      />
      <div className="relative z-10 flex flex-col items-center">
        <img src={logoSrc} alt="Logo" className="w-24 h-24 mb-8 drop-shadow-lg bg-white rounded-full p-2" />
        <motion.h1
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-5xl sm:text-6xl font-bold mb-6 leading-tight text-center text-white drop-shadow-lg"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-xl sm:text-2xl mb-10 text-blue-100 text-center max-w-2xl"
        >
          {subtitle}
        </motion.p>
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          {primaryAction}
          {secondaryAction}
        </motion.div>
      </div>
    </div>
  );
}; 