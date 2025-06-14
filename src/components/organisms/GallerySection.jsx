import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { galleryImageService } from '@/services';
import Text from '@/components/atoms/Text';
import GalleryImage from '@/components/molecules/GalleryImage';
import ApperIcon from '@/components/ApperIcon';

const GallerySection = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  
  useEffect(() => {
    const loadImages = async () => {
      setLoading(true);
      setError(null);
      try {
        const galleryImages = await galleryImageService.getAll();
        setImages(galleryImages);
      } catch (err) {
        setError(err.message || 'Failed to load gallery images');
      } finally {
        setLoading(false);
      }
    };
    
    loadImages();
  }, []);
  
  const closeLightbox = () => {
    setSelectedImage(null);
  };
  
  const nextImage = () => {
    const currentIndex = images.findIndex(img => img.id === selectedImage.id);
    const nextIndex = (currentIndex + 1) % images.length;
    setSelectedImage(images[nextIndex]);
  };
  
  const prevImage = () => {
    const currentIndex = images.findIndex(img => img.id === selectedImage.id);
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    setSelectedImage(images[prevIndex]);
  };
  
  if (loading) {
    return (
      <section id="gallery" className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <div className="animate-pulse">
              <div className="h-8 bg-surface-200 rounded w-1/3 mx-auto mb-4"></div>
              <div className="h-4 bg-surface-200 rounded w-1/2 mx-auto"></div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-64 bg-surface-200 rounded-lg"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  
  if (error) {
    return (
      <section id="gallery" className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <Text variant="body" color="muted">
            Unable to load gallery. Please try again later.
          </Text>
        </div>
      </section>
    );
  }
  
  if (images.length === 0) {
    return (
      <section id="gallery" className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <Text variant="heading" size="2xl" className="mb-4">
            Gallery Coming Soon
          </Text>
          <Text variant="body" color="muted">
            We're preparing beautiful photos to share with you. Check back soon!
          </Text>
        </div>
      </section>
    );
  }
  
  return (
    <section id="gallery" className="py-20 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Text variant="display" size="3xl" className="mb-4">
            Our Gallery
          </Text>
          <Text variant="body" size="lg" color="muted" className="max-w-2xl mx-auto">
            Take a peek inside our cozy cafe and see what makes us special
          </Text>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <GalleryImage 
                image={image} 
                onClick={setSelectedImage}
              />
            </motion.div>
          ))}
        </div>
        
        {/* Lightbox */}
        <AnimatePresence>
          {selectedImage && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
                onClick={closeLightbox}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="relative max-w-4xl max-h-full"
                  onClick={(e) => e.stopPropagation()}
                >
                  <img 
                    src={selectedImage.url}
                    alt={selectedImage.caption}
                    className="max-w-full max-h-full object-contain rounded-lg"
                  />
                  
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 rounded-b-lg">
                    <Text variant="body" color="white" className="font-medium">
                      {selectedImage.caption}
                    </Text>
                  </div>
                  
                  {/* Navigation Buttons */}
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
                  >
                    <ApperIcon name="ChevronLeft" className="w-6 h-6 text-white" />
                  </button>
                  
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
                  >
                    <ApperIcon name="ChevronRight" className="w-6 h-6 text-white" />
                  </button>
                  
                  <button
                    onClick={closeLightbox}
                    className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
                  >
                    <ApperIcon name="X" className="w-6 h-6 text-white" />
                  </button>
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default GallerySection;