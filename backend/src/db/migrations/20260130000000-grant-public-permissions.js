
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const createdAt = new Date();
    const updatedAt = new Date();

    // Get Public role ID
    const [publicRole] = await queryInterface.sequelize.query(
      `SELECT id FROM roles WHERE name = 'Public' LIMIT 1;`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    if (!publicRole) return;

    const publicRoleId = publicRole.id;

    // Permissions to grant to Public role
    const permissionsToGrant = [
      'READ_MENU_ITEMS',
      'READ_CATEGORIES',
      'READ_PROMOTIONS',
      'READ_LOCATIONS',
      'CREATE_PITCHES',
      'CREATE_RESERVATIONS'
    ];

    // Find permission IDs
    const permissions = await queryInterface.sequelize.query(
      `SELECT id FROM permissions WHERE name IN (:permissionsToGrant);`,
      {
        replacements: { permissionsToGrant },
        type: queryInterface.sequelize.QueryTypes.SELECT
      }
    );

    const rolesPermissionsPermissions = permissions.map(p => ({
      createdAt,
      updatedAt,
      roles_permissionsId: publicRoleId,
      permissionId: p.id
    }));

    await queryInterface.bulkInsert('rolesPermissionsPermissions', rolesPermissionsPermissions);
  },

  down: async (queryInterface, Sequelize) => {
    const [publicRole] = await queryInterface.sequelize.query(
      `SELECT id FROM roles WHERE name = 'Public' LIMIT 1;`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    if (!publicRole) return;

    await queryInterface.sequelize.query(
      `DELETE FROM "rolesPermissionsPermissions" WHERE "roles_permissionsId" = :publicRoleId;`,
      { replacements: { publicRoleId: publicRole.id } }
    );
  }
};
