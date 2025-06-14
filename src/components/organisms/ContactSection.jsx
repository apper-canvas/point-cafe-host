import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { businessInfoService } from '@/services';
import Text from '@/components/atoms/Text';
import Card from '@/components/atoms/Card';
import Button from '@/components/atoms/Button';
import HoursDisplay from '@/components/molecules/HoursDisplay';
import ApperIcon from '@/components/ApperIcon';

const ContactSection = () => {
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
        setError(err.message || 'Failed to load contact information');
      } finally {
        setLoading(false);
      }
    };
    
    loadBusinessInfo();
  }, []);
  
  const handleCall = () => {
    if (businessInfo?.phone) {
      window.open(`tel:${businessInfo.phone}`, '_self');
    }
  };
  
  const handleEmail = () => {
    if (businessInfo?.email) {
      window.open(`mailto:${businessInfo.email}`, '_self');
    }
  };
  
  const handleDirections = () => {
    if (businessInfo?.address) {
      const encodedAddress = encodeURIComponent(businessInfo.address);
      window.open(`https://maps.google.com/maps?q=${encodedAddress}`, '_blank');
    }
  };
  
  const handleSocialClick = (url) => {
    window.open(url, '_blank');
  };
  
  if (loading) {
    return (
      <section id="contact" className="py-20 bg-surface-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-surface-200 rounded w-1/3 mx-auto"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="h-4 bg-surface-200 rounded"></div>
                <div className="h-4 bg-surface-200 rounded w-3/4"></div>
                <div className="h-4 bg-surface-200 rounded w-1/2"></div>
              </div>
              <div className="h-64 bg-surface-200 rounded"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  
  if (error) {
    return (
      <section id="contact" className="py-20 bg-surface-50">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <Text variant="body" color="muted">
            Unable to load contact information. Please try again later.
          </Text>
        </div>
      </section>
    );
  }
  
  return (
    <section id="contact" className="py-20 bg-surface-50">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Text variant="display" size="3xl" className="mb-4">
            Visit Us Today
          </Text>
          <Text variant="body" size="lg" color="muted" className="max-w-2xl mx-auto">
            We'd love to serve you! Find us in the heart of downtown or get in touch
          </Text>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <Card padding="lg" shadow="md">
              <div className="space-y-6">
                {/* Address */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <ApperIcon name="MapPin" className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <Text variant="subheading" className="mb-1">
                      Location
                    </Text>
                    <Text variant="body" color="muted">
                      {businessInfo?.address}
                    </Text>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="mt-2 p-0 h-auto"
                      onClick={handleDirections}
                    >
                      Get Directions
                    </Button>
                  </div>
                </div>
                
                {/* Phone */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <ApperIcon name="Phone" className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <Text variant="subheading" className="mb-1">
                      Phone
                    </Text>
                    <Text variant="body" color="muted">
                      {businessInfo?.phone}
                    </Text>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="mt-2 p-0 h-auto"
                      onClick={handleCall}
                    >
                      Call Now
                    </Button>
                  </div>
                </div>
                
                {/* Email */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <ApperIcon name="Mail" className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <Text variant="subheading" className="mb-1">
                      Email
                    </Text>
                    <Text variant="body" color="muted">
                      {businessInfo?.email}
                    </Text>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="mt-2 p-0 h-auto"
                      onClick={handleEmail}
                    >
                      Send Email
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
            
            {/* Hours */}
            <Card padding="lg" shadow="md">
              <Text variant="subheading" size="lg" className="mb-4">
                Hours of Operation
              </Text>
              {businessInfo?.hours && <HoursDisplay hours={businessInfo.hours} />}
            </Card>
            
            {/* Social Media */}
            <Card padding="lg" shadow="md">
              <Text variant="subheading" size="lg" className="mb-4">
                Follow Us
              </Text>
              <div className="flex space-x-4">
                {businessInfo?.socialMedia?.instagram && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSocialClick(businessInfo.socialMedia.instagram)}
                    icon="Instagram"
                  >
                    Instagram
                  </Button>
                )}
                {businessInfo?.socialMedia?.facebook && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSocialClick(businessInfo.socialMedia.facebook)}
                    icon="Facebook"
                  >
                    Facebook
                  </Button>
                )}
                {businessInfo?.socialMedia?.twitter && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSocialClick(businessInfo.socialMedia.twitter)}
                    icon="Twitter"
                  >
                    Twitter
                  </Button>
                )}
              </div>
            </Card>
          </motion.div>
          
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Card padding="none" shadow="md" className="h-full min-h-[500px] overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3048.398167834417!2d-122.41941588459373!3d37.77492927975903!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808c5b63d5cd%3A0x4a4b9b5b5b5b5b5b!2s123%20Main%20St%2C%20San%20Francisco%2C%20CA%2094105!5e0!3m2!1sen!2sus!4v1629825600000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '500px' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Cafe Hub Location"
              ></iframe>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;