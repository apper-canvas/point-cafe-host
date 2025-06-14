import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { menuItemService } from '@/services';
import Text from '@/components/atoms/Text';
import MenuCard from '@/components/molecules/MenuCard';
import CategoryPill from '@/components/molecules/CategoryPill';

const MenuSection = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  
  const categories = ['all', 'coffee', 'food', 'pastries'];
  
  useEffect(() => {
    const loadMenuItems = async () => {
      setLoading(true);
      setError(null);
      try {
        const items = await menuItemService.getAll();
        setMenuItems(items);
      } catch (err) {
        setError(err.message || 'Failed to load menu items');
      } finally {
        setLoading(false);
      }
    };
    
    loadMenuItems();
  }, []);
  
  const filteredItems = menuItems.filter(item => 
    activeCategory === 'all' || item.category === activeCategory
  );
  
  const getCategoryCount = (category) => {
    if (category === 'all') return menuItems.length;
    return menuItems.filter(item => item.category === category).length;
  };
  
  if (loading) {
    return (
      <section id="menu" className="py-20 bg-surface-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <div className="animate-pulse">
              <div className="h-8 bg-surface-200 rounded w-1/3 mx-auto mb-4"></div>
              <div className="h-4 bg-surface-200 rounded w-1/2 mx-auto"></div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-white rounded-lg overflow-hidden">
                  <div className="h-48 bg-surface-200"></div>
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-surface-200 rounded w-3/4"></div>
                    <div className="h-3 bg-surface-200 rounded"></div>
                    <div className="h-3 bg-surface-200 rounded w-2/3"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  
  if (error) {
    return (
      <section id="menu" className="py-20 bg-surface-50">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <Text variant="body" color="muted">
            Unable to load menu. Please try again later.
          </Text>
        </div>
      </section>
    );
  }
  
  if (menuItems.length === 0) {
    return (
      <section id="menu" className="py-20 bg-surface-50">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <Text variant="heading" size="2xl" className="mb-4">
            Menu Coming Soon
          </Text>
          <Text variant="body" color="muted">
            We're working on updating our menu. Please check back soon!
          </Text>
        </div>
      </section>
    );
  }
  
  return (
    <section id="menu" className="py-20 bg-surface-50">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Text variant="display" size="3xl" className="mb-4">
            Our Menu
          </Text>
          <Text variant="body" size="lg" color="muted" className="max-w-2xl mx-auto">
            Discover our carefully crafted selection of coffee, fresh food, and artisan pastries
          </Text>
        </motion.div>
        
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <CategoryPill
              key={category}
              category={category}
              isActive={activeCategory === category}
              onClick={setActiveCategory}
              count={getCategoryCount(category)}
            />
          ))}
        </div>
        
        {/* Menu Items Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <MenuCard item={item} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
        
        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <Text variant="body" color="muted">
              No items found in this category.
            </Text>
          </div>
        )}
      </div>
    </section>
  );
};

export default MenuSection;