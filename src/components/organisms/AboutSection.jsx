import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { businessInfoService } from '@/services';
import Text from '@/components/atoms/Text';
import Card from '@/components/atoms/Card';

const AboutSection = () => {
  const [businessInfo, setBusinessInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const loadBusinessInfo = async () => {
      setLoading(true);
      setError(null);
      try {
        const info = await businessInfoService.getAll();
        setBusinessInfo(info);
      } catch (err) {
        setError(err.message || 'Failed to load business information');
      } finally {
        setLoading(false);
      }
    };
    
    loadBusinessInfo();
  }, []);
  
  if (loading) {
    return (
      <section id="about" className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-surface-200 rounded w-1/3 mx-auto"></div>
            <div className="space-y-4 max-w-3xl mx-auto">
              <div className="h-4 bg-surface-200 rounded"></div>
              <div className="h-4 bg-surface-200 rounded w-5/6"></div>
              <div className="h-4 bg-surface-200 rounded w-4/6"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  
  if (error) {
    return (
      <section id="about" className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <Text variant="body" color="muted">
            Unable to load about information. Please try again later.
          </Text>
        </div>
      </section>
    );
  }
  
  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Text variant="display" size="3xl" className="mb-4">
            Welcome to {businessInfo?.name}
          </Text>
          <Text variant="body" size="lg" color="muted" className="max-w-2xl mx-auto">
            {businessInfo?.tagline}
          </Text>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card padding="lg" shadow="md">
              <Text variant="body" size="lg" className="leading-relaxed mb-6">
                {businessInfo?.description}
              </Text>
              
              <Text variant="subheading" size="lg" className="mb-4" color="primary">
                Our Mission
              </Text>
              
              <Text variant="body" className="leading-relaxed text-gray-600">
                {businessInfo?.mission}
              </Text>
            </Card>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="relative"
          >
            <img 
              src="https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=600&h=400&fit=crop"
              alt="Cafe interior"
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
            
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-lg shadow-lg max-w-xs">
              <Text variant="subheading" color="primary" className="mb-2">
                Since 2018
              </Text>
              <Text variant="body" size="sm" color="muted">
                Serving the community with passion and quality
              </Text>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;