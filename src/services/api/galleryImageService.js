import galleryImages from '../mockData/galleryImages.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const galleryImageService = {
  async getAll() {
    await delay(300);
    return [...galleryImages];
  },

  async getById(id) {
    await delay(200);
    const image = galleryImages.find(img => img.id === id);
    if (!image) throw new Error('Gallery image not found');
    return { ...image };
  },

  async getByCategory(category) {
    await delay(250);
    const filtered = galleryImages.filter(img => 
      category === 'all' || img.category.toLowerCase() === category.toLowerCase()
    );
    return [...filtered];
  },

  async create(item) {
    await delay(300);
    const newItem = {
      ...item,
      id: Date.now().toString()
    };
    galleryImages.push(newItem);
    return { ...newItem };
  },

  async update(id, data) {
    await delay(300);
    const index = galleryImages.findIndex(img => img.id === id);
    if (index === -1) throw new Error('Gallery image not found');
    
    galleryImages[index] = { ...galleryImages[index], ...data };
    return { ...galleryImages[index] };
  },

  async delete(id) {
    await delay(200);
    const index = galleryImages.findIndex(img => img.id === id);
    if (index === -1) throw new Error('Gallery image not found');
    
    const deleted = galleryImages.splice(index, 1)[0];
    return { ...deleted };
  }
};

export default galleryImageService;