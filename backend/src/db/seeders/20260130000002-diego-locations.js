const { v4: uuid } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const createdAt = new Date();
    const updatedAt = new Date();

    // Clear reservations first to avoid foreign key constraints
    await queryInterface.bulkDelete('reservations', null, {});
    await queryInterface.bulkDelete('locations', null, {});

    const locations = [
      {
        id: uuid(),
        name: 'Lucena (Main Playground)',
        address: 'Bonifacio Dr., Pleasantville, Lucena',
        hours: '3PM - 11PM',
        city: 'Lucena',
        is_open: true,
        createdAt,
        updatedAt
      },
      {
        id: uuid(),
        name: 'Lucban',
        address: 'Town Center, Lucban, Quezon',
        hours: 'Closing Soon',
        city: 'Lucban',
        is_open: true,
        createdAt,
        updatedAt
      },
      {
        id: uuid(),
        name: 'Sariaya',
        address: 'Quiminiano St., Brgy 3, Arellano Subd., Sariaya',
        hours: '3PM - 11PM',
        city: 'Sariaya',
        is_open: true,
        createdAt,
        updatedAt
      }
    ];

    return queryInterface.bulkInsert('locations', locations);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('reservations', null, {});
    await queryInterface.bulkDelete('locations', null, {});
  }
};
