import React from 'react';
import { motion } from 'framer-motion';

const GalleryImage = ({ image, onClick }) => {
  return (
    <motion.div
      className="relative overflow-hidden rounded-lg cursor-pointer group"
      whileHover={{ scale: 1.02 }}
      onClick={() => onClick(image)}
    >
      <img 
        src={image.url} 
        alt={image.caption}
        className="w-full h-64 object-cover transition-all duration-300 group-hover:brightness-110"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute bottom-4 left-4 right-4">
          <p className="text-white text-sm font-medium">
            {image.caption}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default GalleryImage;