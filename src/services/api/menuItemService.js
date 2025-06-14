import menuItems from '../mockData/menuItems.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const menuItemService = {
  async getAll() {
    await delay(300);
    return [...menuItems];
  },

  async getById(id) {
    await delay(200);
    const item = menuItems.find(item => item.id === id);
    if (!item) throw new Error('Menu item not found');
    return { ...item };
  },

  async getByCategory(category) {
    await delay(250);
    const filtered = menuItems.filter(item => 
      category === 'all' || item.category.toLowerCase() === category.toLowerCase()
    );
    return [...filtered];
  },

  async create(item) {
    await delay(300);
    const newItem = {
      ...item,
      id: Date.now().toString(),
      isAvailable: true
    };
    menuItems.push(newItem);
    return { ...newItem };
  },

  async update(id, data) {
    await delay(300);
    const index = menuItems.findIndex(item => item.id === id);
    if (index === -1) throw new Error('Menu item not found');
    
    menuItems[index] = { ...menuItems[index], ...data };
    return { ...menuItems[index] };
  },

  async delete(id) {
    await delay(200);
    const index = menuItems.findIndex(item => item.id === id);
    if (index === -1) throw new Error('Menu item not found');
    
    const deleted = menuItems.splice(index, 1)[0];
    return { ...deleted };
  }
};

export default menuItemService;