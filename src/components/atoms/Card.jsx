import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ 
  children, 
  className = '', 
  hover = true,
  padding = 'md',
  shadow = 'sm',
  ...rest 
}) => {
  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };
  
  const shadows = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg'
  };
  
  const baseClasses = `bg-surface-50 rounded-lg border border-surface-200 ${paddings[padding]} ${shadows[shadow]} ${className}`;
  
  if (hover) {
    return (
      <motion.div
        whileHover={{ scale: 1.02, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
        transition={{ duration: 0.2 }}
        className={baseClasses}
        {...rest}
      >
        {children}
      </motion.div>
    );
  }
  
  return (
    <div className={baseClasses} {...rest}>
      {children}
    </div>
  );
};

export default Card;