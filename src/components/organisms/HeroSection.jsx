import React from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/atoms/Button';
import Text from '@/components/atoms/Text';

const HeroSection = () => {
  const scrollToMenu = () => {
    const element = document.querySelector('#menu');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1920&h=1080&fit=crop')`,
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-hero-pattern" />
      
      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Text 
            variant="display" 
            size="4xl" 
            color="white" 
            className="mb-4 leading-tight"
            as="h1"
          >
            Your Neighborhood Coffee Sanctuary
          </Text>
          
          <Text 
            variant="body" 
            size="xl" 
            color="white" 
            className="mb-8 opacity-90 max-w-2xl mx-auto leading-relaxed"
          >
            Where community meets craftsmanship. Experience expertly roasted coffee, 
            wholesome food, and warm hospitality in the heart of downtown.
          </Text>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="accent" 
              size="lg"
              onClick={scrollToMenu}
              icon="Coffee"
            >
              Explore Our Menu
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="border-white text-white hover:bg-white hover:text-primary"
              icon="MapPin"
            >
              Visit Us Today
            </Button>
          </div>
        </motion.div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;