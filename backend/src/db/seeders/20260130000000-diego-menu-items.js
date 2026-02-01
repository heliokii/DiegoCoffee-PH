const { v4: uuid } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const createdAt = new Date();
    const updatedAt = new Date();

    // Clear existing items to avoid duplicates and ensure clean state
    await queryInterface.bulkDelete('menu_items', null, {});
    await queryInterface.bulkDelete('categories', null, {});

    const categories = [
      {
        id: uuid(),
        name: 'Coffee',
        description: 'Specialty coffee and lattes.',
        createdAt,
        updatedAt
      },
      {
        id: uuid(),
        name: 'Cocktail',
        description: 'Creative cocktails and "Drink the feelings".',
        createdAt,
        updatedAt
      },
      {
        id: uuid(),
        name: 'Food',
        description: 'Cozy and chaotic food pairings.',
        createdAt,
        updatedAt
      }
    ];

    await queryInterface.bulkInsert('categories', categories);

    const getCatId = (name) => categories.find(c => c.name === name).id;

    const menuItems = [
      {
        id: uuid(),
        title: 'Orange Coffee',
        description: 'Bright orange, smooth coffee, sneaky dark chocolate finish.',
        price: 150.00,
        item_type: 'Coffee',
        categoryId: getCatId('Coffee'),
        ingredients: 'Espresso, Fresh Orange Juice, Dark Chocolate Syrup',
        is_featured: true,
        is_available: true,
        createdAt,
        updatedAt
      },
      {
        id: uuid(),
        title: 'Spanish Latté',
        description: 'Creamy and sweet, a classic favorite. Available iced or hot.',
        price: 180.00,
        item_type: 'Coffee',
        categoryId: getCatId('Coffee'),
        ingredients: 'Espresso, Condensed Milk, Fresh Milk',
        is_featured: true,
        is_available: true,
        createdAt,
        updatedAt
      },
      {
        id: uuid(),
        title: 'CEO Latté',
        description: 'A strong, bold latte for the boss in you. Served hot.',
        price: 170.00,
        item_type: 'Coffee',
        categoryId: getCatId('Coffee'),
        ingredients: 'Extra Shot Espresso, Steamed Milk, Secret Sweetener',
        is_featured: true,
        is_available: true,
        createdAt,
        updatedAt
      },
      {
        id: uuid(),
        title: 'Spice & Star',
        description: 'Buttery, cinnamon-spiced, sparkling with warm star anise.',
        price: 250.00,
        item_type: 'Cocktail',
        categoryId: getCatId('Cocktail'),
        ingredients: 'Spiced Rum, Cinnamon Syrup, Star Anise, Butter-washed Bourbon',
        is_featured: true,
        is_available: true,
        createdAt,
        updatedAt
      },
      {
        id: uuid(),
        title: 'Spania Salada',
        description: 'A salty-sweet twist on the classic Spanish Latté.',
        price: 220.00,
        item_type: 'Cocktail',
        categoryId: getCatId('Cocktail'),
        ingredients: 'Espresso, Salted Caramel, Condensed Milk, Sea Salt',
        is_featured: true,
        is_available: true,
        createdAt,
        updatedAt
      },
      {
        id: uuid(),
        title: 'Honey Chai Matcha Latté',
        description: 'One-in-a-million matcha. A soothing blend of matcha, honey, and chai spices.',
        price: 190.00,
        item_type: 'Coffee',
        categoryId: getCatId('Coffee'),
        ingredients: 'Ceremonial Grade Matcha, Honey, Chai Spice Blend, Oat Milk',
        is_featured: true,
        is_available: true,
        createdAt,
        updatedAt
      },
      {
        id: uuid(),
        title: 'Cinnamon Oat',
        description: 'Cozy oat-based coffee with a hint of cinnamon.',
        price: 180.00,
        item_type: 'Coffee',
        categoryId: getCatId('Coffee'),
        ingredients: 'Espresso, Oat Milk, Cinnamon, Maple Syrup',
        is_featured: true,
        is_available: true,
        createdAt,
        updatedAt
      },
      {
        id: uuid(),
        title: 'Diego Burger',
        description: 'Our signature chaotic burger. Collab with ohso.socialph.',
        price: 220.00,
        item_type: 'Food',
        categoryId: getCatId('Food'),
        ingredients: 'Beef Patty, Secret Chaos Sauce, Brioche Bun, Caramelized Onions',
        is_featured: true,
        is_available: true,
        createdAt,
        updatedAt
      }
    ];

    return queryInterface.bulkInsert('menu_items', menuItems);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('menu_items', null, {});
    await queryInterface.bulkDelete('categories', null, {});
  }
};