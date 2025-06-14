import React from 'react';
import Navigation from '@/components/organisms/Navigation';
import HeroSection from '@/components/organisms/HeroSection';
import AboutSection from '@/components/organisms/AboutSection';
import MenuSection from '@/components/organisms/MenuSection';
import GallerySection from '@/components/organisms/GallerySection';
import ContactSection from '@/components/organisms/ContactSection';
import Footer from '@/components/organisms/Footer';

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <MenuSection />
      <GallerySection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default HomePage;