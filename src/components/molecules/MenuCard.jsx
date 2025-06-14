import React from 'react';
import { motion } from 'framer-motion';
import Card from '@/components/atoms/Card';
import Text from '@/components/atoms/Text';

const MenuCard = ({ item }) => {
  const { name, description, price, image, isAvailable } = item;
  
  return (
    <Card hover={true} padding="none" className="overflow-hidden">
      <div className="relative">
        <img 
          src={image} 
          alt={name}
          className="w-full h-48 object-cover"
          loading="lazy"
        />
        {!isAvailable && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <Text variant="body" color="white" className="font-semibold">
              Currently Unavailable
            </Text>
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <Text variant="subheading" size="lg" className="flex-1">
            {name}
          </Text>
          <Text variant="heading" color="primary" size="lg" className="ml-2">
            ${price.toFixed(2)}
          </Text>
        </div>
        <Text variant="body" color="muted" className="leading-relaxed">
          {description}
        </Text>
      </div>
    </Card>
  );
};

export default MenuCard;