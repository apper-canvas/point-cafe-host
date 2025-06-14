import React from 'react';
import { motion } from 'framer-motion';

const CategoryPill = ({ category, isActive, onClick, count }) => {
  return (
    <motion.button
      onClick={() => onClick(category)}
      className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
        isActive 
          ? 'bg-primary text-white shadow-md' 
          : 'bg-white text-gray-600 border border-gray-200 hover:border-primary hover:text-primary'
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {category === 'all' ? 'All Items' : category.charAt(0).toUpperCase() + category.slice(1)}
      {count !== undefined && (
        <span className={`ml-1 text-sm ${isActive ? 'text-white/80' : 'text-gray-400'}`}>
          ({count})
        </span>
      )}
    </motion.button>
  );
};

export default CategoryPill;