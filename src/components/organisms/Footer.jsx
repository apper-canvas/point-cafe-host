import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { businessInfoService } from '@/services';
import Text from '@/components/atoms/Text';
import ApperIcon from '@/components/ApperIcon';

const Footer = () => {
  const [businessInfo, setBusinessInfo] = useState(null);
  
  useEffect(() => {
    const loadBusinessInfo = async () => {
      try {
        const info = await businessInfoService.getAll();
        setBusinessInfo(info);
      } catch (err) {
        console.error('Failed to load business info for footer:', err);
      }
    };
    
    loadBusinessInfo();
  }, []);
  
  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleSocialClick = (url) => {
    window.open(url, '_blank');
  };
  
  return (
    <footer className="bg-primary text-white py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <motion.div 
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
            >
              <ApperIcon name="Coffee" className="w-8 h-8 text-secondary" />
              <Text variant="heading" size="xl" color="white">
                {businessInfo?.name || 'Cafe Hub'}
              </Text>
            </motion.div>
            
            <Text variant="body" color="white" className="opacity-80">
              {businessInfo?.tagline || 'Your Neighborhood Coffee Sanctuary'}
            </Text>
            
            <Text variant="body" size="sm" color="white" className="opacity-70">
              {businessInfo?.address}
            </Text>
          </div>
          
          {/* Quick Links */}
          <div className="space-y-4">
            <Text variant="subheading" color="white">
              Quick Links
            </Text>
            
            <div className="space-y-2">
              {[
                { label: 'Home', href: '#home' },
                { label: 'About', href: '#about' },
                { label: 'Menu', href: '#menu' },
                { label: 'Gallery', href: '#gallery' },
                { label: 'Contact', href: '#contact' }
              ].map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollToSection(link.href)}
                  className="block text-white/80 hover:text-secondary transition-colors duration-200"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
          
          {/* Contact & Social */}
          <div className="space-y-4">
            <Text variant="subheading" color="white">
              Connect With Us
            </Text>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <ApperIcon name="Phone" className="w-4 h-4 text-secondary" />
                <Text variant="body" size="sm" color="white" className="opacity-80">
                  {businessInfo?.phone}
                </Text>
              </div>
              
              <div className="flex items-center space-x-2">
                <ApperIcon name="Mail" className="w-4 h-4 text-secondary" />
                <Text variant="body" size="sm" color="white" className="opacity-80">
                  {businessInfo?.email}
                </Text>
              </div>
            </div>
            
            {/* Social Media Icons */}
            <div className="flex space-x-4 pt-2">
              {businessInfo?.socialMedia?.instagram && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleSocialClick(businessInfo.socialMedia.instagram)}
                  className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-secondary transition-colors"
                >
                  <ApperIcon name="Instagram" className="w-4 h-4" />
                </motion.button>
              )}
              
              {businessInfo?.socialMedia?.facebook && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleSocialClick(businessInfo.socialMedia.facebook)}
                  className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-secondary transition-colors"
                >
                  <ApperIcon name="Facebook" className="w-4 h-4" />
                </motion.button>
              )}
              
              {businessInfo?.socialMedia?.twitter && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleSocialClick(businessInfo.socialMedia.twitter)}
                  className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-secondary transition-colors"
                >
                  <ApperIcon name="Twitter" className="w-4 h-4" />
                </motion.button>
              )}
            </div>
          </div>
        </div>
        
        <hr className="border-white/20 my-8" />
        
        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <Text variant="body" size="sm" color="white" className="opacity-70">
            © {new Date().getFullYear()} {businessInfo?.name || 'Cafe Hub'}. All rights reserved.
          </Text>
          
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 text-white/80 hover:text-secondary transition-colors"
          >
            <ApperIcon name="ArrowUp" className="w-4 h-4" />
            <span className="text-sm">Back to Top</span>
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;