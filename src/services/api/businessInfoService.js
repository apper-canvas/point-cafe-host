import businessInfo from '../mockData/businessInfo.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const businessInfoService = {
  async getAll() {
    await delay(200);
    return { ...businessInfo };
  },

  async getById(id) {
    await delay(200);
    if (id !== 'main') throw new Error('Business info not found');
    return { ...businessInfo };
  },

  async create(item) {
    await delay(300);
    const newItem = {
      ...item,
      id: 'main'
    };
    Object.assign(businessInfo, newItem);
    return { ...businessInfo };
  },

  async update(id, data) {
    await delay(300);
    if (id !== 'main') throw new Error('Business info not found');
    
    Object.assign(businessInfo, data);
    return { ...businessInfo };
  },

  async delete(id) {
    await delay(200);
    throw new Error('Cannot delete business info');
  }
};

export default businessInfoService;